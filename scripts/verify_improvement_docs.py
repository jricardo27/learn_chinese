#!/usr/bin/env python3
"""Verify the generated improvement-program documents."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs" / "improvements"
TASK_RE = re.compile(r"^### [A-Z0-9]{2,4}-\d{3}\. ", re.MULTILINE)
REQUIRED_SECTIONS = [
    "## Purpose",
    "## Current proof-of-concept signals",
    "## Operating constraints",
    "## Tasks",
    "## Conflicts and feature-flag strategies",
    "## Third-party service cost policy",
    "## Suggested sequencing",
]
REQUIRED_COST_TERMS = [
    "renewable free tier",
    "cost-benefit analysis",
]
FORBIDDEN = ["TODO", "TBD", "lorem ipsum"]


def fail(errors, path, message):
    errors.append(f"{path.relative_to(ROOT)}: {message}")


def main():
    errors = []
    if not DOCS.is_dir():
        print(f"missing {DOCS}")
        return 1

    area_files = sorted(p for p in DOCS.glob("*.md") if p.name != "README.md")
    if len(area_files) != 20:
        errors.append(f"expected 20 area documents, found {len(area_files)}")

    total_tasks = 0
    for path in area_files:
        text = path.read_text(encoding="utf-8")
        tasks = TASK_RE.findall(text)
        total_tasks += len(tasks)
        if len(tasks) != 100:
            fail(errors, path, f"expected 100 tasks, found {len(tasks)}")
        for section in REQUIRED_SECTIONS:
            if section not in text:
                fail(errors, path, f"missing section {section}")
        lower = text.lower()
        for term in REQUIRED_COST_TERMS:
            if term not in lower:
                fail(errors, path, f"missing cost term {term!r}")
        for word in FORBIDDEN:
            if word.lower() in lower:
                fail(errors, path, f"contains placeholder {word}")
        if "\u2014" in text or "\u2013" in text:
            fail(errors, path, "contains a long dash")
        if text.count("## Epic ") != 10:
            fail(errors, path, f"expected 10 epics, found {text.count('## Epic ')}")

    index = DOCS / "README.md"
    if not index.exists():
        errors.append("missing docs/improvements/README.md")
    else:
        text = index.read_text(encoding="utf-8")
        rows = [line for line in text.splitlines() if line.startswith("| ") and "100 |" in line]
        if len(rows) != 20:
            errors.append(f"index should list 20 areas, found {len(rows)}")
        if "scripts/generate_improvement_docs.py" not in text:
            errors.append("index does not document regeneration")
        if "scripts/verify_improvement_docs.py" not in text:
            errors.append("index does not document verification")

    if total_tasks != 2000:
        errors.append(f"expected 2000 total tasks, found {total_tasks}")

    if errors:
        print("improvement docs verification failed")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"verified 20 area documents, 2000 tasks, required sections, and cost policy coverage in {DOCS}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
