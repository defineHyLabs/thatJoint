#!/usr/bin/env python3
"""Automated Code Review & Static Quality Audit for THΛTJOINT.

Performs multi-layered verification:
1. Syntax & Compilation (JS, Python)
2. Security & Secret Leak Detection (API keys, tokens, dangerous calls)
3. HTML5 Semantic & Accessibility Standards (DOCTYPE, lang, viewport, alt text)
4. Design System Token Consistency (Barlow Condensed, DM Sans, brand colors)
5. Asset & Link Integrity (check_site.py validation)
6. GitHub Pages & Jekyll Compatibility (.nojekyll, _config.yml)
7. Production Packaging Simulation (_site artifact verification)
"""

import os
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

# GitHub Actions annotation helpers
def gh_error(file, line, msg):
    print(f"::error file={file},line={line}::{msg}")

def gh_warning(file, line, msg):
    print(f"::warning file={file},line={line}::{msg}")

def gh_notice(file, line, msg):
    print(f"::notice file={file},line={line}::{msg}")


class AuditReport:
    def __init__(self):
        self.categories = {}
        self.total_errors = 0
        self.total_warnings = 0

    def add_category(self, name):
        self.categories[name] = {"passed": True, "items": []}

    def record_pass(self, category, msg):
        self.categories[category]["items"].append(("PASS", msg))

    def record_warning(self, category, msg, file=None, line=1):
        self.categories[category]["items"].append(("WARN", msg))
        self.total_warnings += 1
        if file:
            gh_warning(file, line, msg)

    def record_error(self, category, msg, file=None, line=1):
        self.categories[category]["items"].append(("FAIL", msg))
        self.categories[category]["passed"] = False
        self.total_errors += 1
        if file:
            gh_error(file, line, msg)


class HTMLAccessibilityAuditor(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.has_doctype = False
        self.has_lang = False
        self.has_viewport = False
        self.has_title = False
        self.images_missing_alt = []
        self.in_title = False
        self.title_text = ""

    def handle_decl(self, decl):
        if "html" in decl.lower():
            self.has_doctype = True

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == "html" and "lang" in attr_dict:
            self.has_lang = True
        elif tag == "meta" and attr_dict.get("name") == "viewport":
            self.has_viewport = True
        elif tag == "title":
            self.has_title = True
            self.in_title = True
        elif tag == "img":
            if "alt" not in attr_dict or not attr_dict.get("alt", "").strip():
                src = attr_dict.get("src", "unknown")
                self.images_missing_alt.append(src)

    def handle_data(self, data):
        if self.in_title:
            self.title_text += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False


def check_syntax(report):
    cat = "Syntax & Compilation"
    report.add_category(cat)

    # 1. JavaScript check using node --check
    js_files = sorted(ROOT.glob("*.js"))
    for js in js_files:
        try:
            res = subprocess.run(
                ["node", "--check", str(js)],
                capture_output=True,
                text=True,
                check=False,
            )
            if res.returncode == 0:
                report.record_pass(cat, f"JavaScript syntax valid: {js.name}")
            else:
                report.record_error(cat, f"JavaScript syntax error in {js.name}: {res.stderr.strip()}", js.name)
        except FileNotFoundError:
            report.record_warning(cat, "Node.js not found in runtime path; skipping node --check")
            break

    # 2. Python py_compile check
    py_files = sorted((ROOT / "scripts").glob("*.py"))
    for py in py_files:
        try:
            res = subprocess.run(
                [sys.executable, "-m", "py_compile", str(py)],
                capture_output=True,
                text=True,
                check=False,
            )
            if res.returncode == 0:
                report.record_pass(cat, f"Python syntax valid: {py.name}")
            else:
                report.record_error(cat, f"Python syntax error in {py.name}: {res.stderr.strip()}", py.name)
        except Exception as e:
            report.record_error(cat, f"Python compilation failed for {py.name}: {e}", py.name)


def check_security(report):
    cat = "Security & Secrets Audit"
    report.add_category(cat)

    secret_patterns = [
        (r"sk-[a-zA-Z0-9]{20,}", "OpenAI API Key"),
        (r"AIza[0-9A-Za-z-_]{35}", "Google API Key"),
        (r"ghp_[0-9a-zA-Z]{36}", "GitHub Personal Access Token"),
        (r"gho_[0-9a-zA-Z]{36}", "GitHub OAuth Token"),
        (r"AKIA[0-9A-Z]{16}", "AWS Access Key"),
    ]

    dangerous_patterns = [
        (r"\beval\s*\(", "Dangerous eval() execution"),
        (r"new\s+Function\s*\(", "Dangerous new Function() constructor"),
        (r"document\.write\s*\(", "Disallowed document.write() call"),
    ]

    tracked_text_files = list(ROOT.glob("*.js")) + list(ROOT.glob("*.html")) + list(ROOT.glob("*.css"))

    for file_path in tracked_text_files:
        try:
            lines = file_path.read_text(encoding="utf-8").splitlines()
        except Exception:
            continue

        for i, line in enumerate(lines, 1):
            # Check secret leaks
            for pattern, desc in secret_patterns:
                if re.search(pattern, line):
                    report.record_error(cat, f"Suspected {desc} leak in {file_path.name}:{i}", file_path.name, i)

            # Check dangerous code patterns in JS
            if file_path.suffix == ".js":
                for pattern, desc in dangerous_patterns:
                    # Ignore commented lines
                    clean_line = line.strip()
                    if clean_line.startswith("//") or clean_line.startswith("/*"):
                        continue
                    if re.search(pattern, line):
                        report.record_error(cat, f"{desc} in {file_path.name}:{i}", file_path.name, i)

    if report.categories[cat]["passed"]:
        report.record_pass(cat, "Zero leaked secrets, credentials, or dangerous eval/write patterns detected.")


def check_html_standards(report):
    cat = "HTML5 & Accessibility Standards"
    report.add_category(cat)

    html_files = sorted(ROOT.glob("*.html"))
    for html_file in html_files:
        auditor = HTMLAccessibilityAuditor(html_file.name)
        try:
            content = html_file.read_text(encoding="utf-8")
            auditor.feed(content)
        except Exception as e:
            report.record_error(cat, f"Failed to parse {html_file.name}: {e}", html_file.name)
            continue

        if not auditor.has_doctype:
            report.record_error(cat, f"Missing <!DOCTYPE html> in {html_file.name}", html_file.name)
        else:
            report.record_pass(cat, f"Valid HTML5 DOCTYPE: {html_file.name}")

        if not auditor.has_lang:
            report.record_warning(cat, f"Missing 'lang' attribute on <html> in {html_file.name}", html_file.name)
        else:
            report.record_pass(cat, f"Valid lang attribute: {html_file.name}")

        if not auditor.has_viewport:
            report.record_error(cat, f"Missing viewport <meta> in {html_file.name}", html_file.name)
        else:
            report.record_pass(cat, f"Responsive viewport configured: {html_file.name}")

        if not auditor.has_title:
            report.record_warning(cat, f"Missing <title> tag in {html_file.name}", html_file.name)
        else:
            report.record_pass(cat, f"Page title present: {html_file.name} ('{auditor.title_text.strip()}')")

        if auditor.images_missing_alt:
            for missing_src in auditor.images_missing_alt:
                report.record_warning(cat, f"Image missing descriptive alt text in {html_file.name}: {missing_src}", html_file.name)
        else:
            report.record_pass(cat, f"All images contain alt attributes in {html_file.name}")


def check_design_tokens(report):
    cat = "Design System Token Consistency"
    report.add_category(cat)

    css_files = sorted(ROOT.glob("*.css"))
    expected_tokens = ["#2B2B2B", "#A459FF", "#F1F3F6", "#7A7A7A"]

    for css_file in css_files:
        try:
            content = css_file.read_text(encoding="utf-8")
        except Exception:
            continue

        found_tokens = [tok for tok in expected_tokens if tok.lower() in content.lower()]
        if len(found_tokens) >= 2:
            report.record_pass(cat, f"Design palette matched in {css_file.name} ({', '.join(found_tokens)})")
        else:
            report.record_warning(cat, f"Low design palette coverage in {css_file.name}", css_file.name)

        if "http://" in content:
            report.record_warning(cat, f"Insecure http:// reference in {css_file.name}", css_file.name)


def check_jekyll_pages_readiness(report):
    cat = "GitHub Pages & Jekyll Configuration"
    report.add_category(cat)

    # 1. Verify .nojekyll exists
    nojekyll = ROOT / ".nojekyll"
    if nojekyll.exists():
        report.record_pass(cat, "'.nojekyll' present (prevents Jekyll from corrupting custom static assets)")
    else:
        report.record_error(cat, "Missing '.nojekyll' in repository root (GitHub Pages may invoke Jekyll)")

    # 2. Verify _config.yml exists with theme disabled
    config_file = ROOT / "_config.yml"
    if config_file.exists():
        content = config_file.read_text(encoding="utf-8")
        if 'theme: ""' in content or "theme: ''" in content or "theme: none" in content:
            report.record_pass(cat, "'_config.yml' present with theme explicitly disabled")
        else:
            report.record_warning(cat, "'_config.yml' exists but theme is not explicitly disabled")
    else:
        report.record_warning(cat, "Missing '_config.yml' with explicit theme override")


def check_packaging_and_links(report):
    cat = "Package Integrity & Deployment Simulation"
    report.add_category(cat)

    # 1. Run check_site.py on repository root
    try:
        from scripts.check_site import check_site
        root_problems = check_site(ROOT)
        if root_problems:
            for p in root_problems:
                report.record_error(cat, f"Root link error: {p}")
        else:
            report.record_pass(cat, "All local references and CSS assets resolve in repository root")
    except Exception as e:
        report.record_error(cat, f"Error validating root references: {e}")

    # 2. Simulate packaging into _site and validate
    test_site = ROOT / "_site"
    try:
        import shutil
        if test_site.exists():
            shutil.rmtree(test_site)
        test_site.mkdir(parents=True, exist_ok=True)

        # Copy static assets and pages
        if (ROOT / "assets").exists():
            shutil.copytree(ROOT / "assets", test_site / "assets")

        for f in ROOT.glob("*.html"):
            shutil.copy2(f, test_site / f.name)
        for f in ROOT.glob("*.css"):
            shutil.copy2(f, test_site / f.name)
        for f in ROOT.glob("*.js"):
            shutil.copy2(f, test_site / f.name)
        if (ROOT / ".nojekyll").exists():
            shutil.copy2(ROOT / ".nojekyll", test_site / ".nojekyll")

        site_problems = check_site(test_site)
        if site_problems:
            for p in site_problems:
                report.record_error(cat, f"Packaged _site reference error: {p}")
        else:
            report.record_pass(cat, "Deployment artifact '_site' packaged and verified successfully")

        # Cleanup test directory
        shutil.rmtree(test_site)
    except Exception as e:
        report.record_error(cat, f"Packaging simulation failed: {e}")


def write_github_step_summary(report):
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if not summary_path:
        return

    status_icon = "✅" if report.total_errors == 0 else "❌"
    lines = [
        f"## {status_icon} THΛTJOINT Code Review & Quality Audit Summary",
        "",
        f"**Audit Status:** {'PASSED' if report.total_errors == 0 else 'FAILED'} | "
        f"**Errors:** {report.total_errors} | **Warnings:** {report.total_warnings}",
        "",
        "| Category | Status | Details |",
        "| :--- | :---: | :--- |",
    ]

    for cat_name, data in report.categories.items():
        cat_badge = "✅ PASS" if data["passed"] else "❌ FAIL"
        items_summary = "<br>".join(
            f"• <code>{status}</code> {msg}" for status, msg in data["items"][:5]
        )
        if len(data["items"]) > 5:
            items_summary += f"<br>• ...and {len(data['items']) - 5} more items"
        lines.append(f"| **{cat_name}** | {cat_badge} | {items_summary} |")

    lines.extend([
        "",
        "---",
        "> *Automated Code Review generated by THΛTJOINT CI/CD Quality Engine.*",
    ])

    try:
        with open(summary_path, "a", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
    except Exception as e:
        print(f"Warning: Could not write to GITHUB_STEP_SUMMARY: {e}", file=sys.stderr)


def main():
    print("=" * 70)
    print(" THΛTJOINT / AUTOMATED CODE REVIEW & STATIC AUDIT ENGINE")
    print("=" * 70)

    report = AuditReport()

    check_syntax(report)
    check_security(report)
    check_html_standards(report)
    check_design_tokens(report)
    check_jekyll_pages_readiness(report)
    check_packaging_and_links(report)

    # Output detailed CLI results
    for cat_name, data in report.categories.items():
        status = "PASSED" if data["passed"] else "FAILED"
        marker = "✓" if data["passed"] else "✗"
        print(f"\n[{marker}] {cat_name.upper()} — {status}")
        for status_code, msg in data["items"]:
            print(f"    [{status_code}] {msg}")

    print("\n" + "=" * 70)
    print(f"FINAL AUDIT SUMMARY: {report.total_errors} error(s), {report.total_warnings} warning(s)")
    print("=" * 70)

    write_github_step_summary(report)

    if report.total_errors > 0:
        print("\n❌ Code Review Audit failed. Resolve errors before merging.")
        sys.exit(1)
    else:
        print("\n✅ Code Review Audit passed cleanly. Ready for deployment.")
        sys.exit(0)


if __name__ == "__main__":
    main()
