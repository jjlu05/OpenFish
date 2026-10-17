"""Extract MassWildlife-survey species lists from curated official pond pages.

Run from the project root:
    python scripts/import_fisheries.py

Requires: pip install -r scripts/requirements.txt
"""
from __future__ import annotations

import json
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib import response

import requests
from bs4 import BeautifulSoup, Tag

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "data" / "pond_sources.json"
OUTPUT = ROOT / "data" / "fish_surveys.json"
HEADERS = {"User-Agent": "OpenFishPersonalResearch/0.1 (educational project; respectful low-rate requests)"}


def extract_species(html: str) -> list[str]:
    """Return unique species from the Fish populations list, or raise on unexpected markup."""
    soup = BeautifulSoup(html, "html.parser")
    heading = next(
        (tag for tag in soup.find_all(re.compile(r"^h[1-6]$"))
         if tag.get_text(" ", strip=True).casefold() == "fish populations"),
        None,
    )
    if heading is None:
        raise ValueError("Could not find 'Fish populations' heading; inspect page structure")

    # Search following document elements; stop when reaching the next section heading.
    section_level = int(heading.name[1])
    fish_list = None
    for tag in heading.next_elements:
        if not isinstance(tag, Tag):
            continue
        if re.fullmatch(r"h[1-6]", tag.name or "") and int(tag.name[1]) <= section_level:
            break
        if tag.name in {"ul", "ol"}:
            fish_list = tag
            break

    if fish_list is None:
        raise ValueError("No species list found under 'Fish populations'")

    names = []
    seen = set()
    for li in fish_list.find_all("li", recursive=False):
        name = " ".join(li.get_text(" ", strip=True).split()).lower()
        if not name or name in seen:
            continue
        seen.add(name)
        names.append(name.title())
    if not names:
        raise ValueError("Species list was empty")
    return names



def generate_url(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.casefold()).strip("-")
    return f"https://www.mass.gov/info-details/{slug}"


def main() -> None:
    ponds = json.loads(
        (ROOT / "data" / "pond_sources.json").read_text(
            encoding="utf-8"
        )
    )

    records = []
    failed = []
    skipped = []

    session = requests.Session()
    session.headers.update({
        "User-Agent": "OpenFish/0.1 (educational fisheries research)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9"
    })

    for i, pond in enumerate(ponds):
        if i:
            time.sleep(2)
        name = pond["name"]
        url = pond["sourceUrl"]

        try:
            response = session.get(url, timeout=30)

            if response.status_code == 404:
                skipped.append(name)
                print(f"NOT FOUND: {name}")
                continue

            response.raise_for_status()
            species = extract_species(response.text)

        except ValueError as err:
            # Page exists, but we couldn't find a valid fish list.
            skipped.append(name)
            print(f"NO SPECIES DATA: {name}: {err}")
            continue

        except requests.RequestException as err:
            failed.append(name)
            print(f"FAILED: {name}: {err}")
            continue

        records.append({
            "id": pond["id"],
            "name": name,
            "town": pond["town"],
            "district": pond["district"],
            "species": species,
            "sourceUrl": response.url,
            "sourceType": "MassWildlife survey list",
            "retrievedAt": datetime.now(timezone.utc).isoformat()
        })

        print(f"OK {name}: {len(species)} species")

    OUTPUT.write_text(
        json.dumps(records, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8"
    )

    print("\n--- Import summary ---")
    print(f"Total official pond sources: {len(ponds)}")
    print(f"Successfully extracted: {len(records)}")
    print(f"Not found / no fish data: {len(skipped)}")
    print(f"Request failures: {len(failed)}")
    print(
        "Pond-species records:",
        sum(len(p["species"]) for p in records)
    )


if __name__ == "__main__":
    main()
