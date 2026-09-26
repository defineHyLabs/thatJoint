"""Validate the static files published to GitHub Pages."""

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class LocalReferences(HTMLParser):
    """Collect URL-bearing attributes from an HTML document."""

    def __init__(self):
        super().__init__()
        self.references = []

    def handle_starttag(self, _tag, attrs):
        for key, value in attrs:
            if not value:
                continue
            if key in ("src", "href"):
                self.references.append(value)
            elif key == "srcset":
                self.references.extend(
                    part.strip().split()[0] for part in value.split(",")
                )


def validate_reference(root, base, reference):
    """Return an error when a local reference does not resolve to a file."""
    if reference.startswith(("#", "//", "data:", "mailto:")):
        return None

    parsed = urlsplit(reference)
    if parsed.scheme or not parsed.path:
        return None

    path = (base / unquote(parsed.path).lstrip("/")).resolve()
    try:
        path.relative_to(root)
    except ValueError:
        return f"Reference escapes the site directory: {reference}"

    if not path.is_file():
        return f"Missing local reference: {reference}"
    return None


def check_site(root):
    root = root.resolve()
    required = ("index.html", "styles.css", "app.js")
    errors = [
        f"Missing required file: {name}"
        for name in required
        if not (root / name).is_file()
    ]
    if errors:
        return errors

    parser = LocalReferences()
    parser.feed((root / "index.html").read_text(encoding="utf-8"))

    references = [(root, reference) for reference in parser.references]
    for css_file in root.rglob("*.css"):
        css = css_file.read_text(encoding="utf-8")
        css_urls = re.findall(r"url\(\s*(['\"]?)(.*?)\1\s*\)", css)
        references.extend((css_file.parent, match[1]) for match in css_urls)

    for base, reference in references:
        error = validate_reference(root, base, reference)
        if error:
            errors.append(error)
    return errors


if __name__ == "__main__":
    site = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    problems = check_site(site)
    if problems:
        print("\n".join(problems), file=sys.stderr)
        sys.exit(1)
    print(f"Site validated: {site.resolve()}")