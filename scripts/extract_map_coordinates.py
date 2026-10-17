
import json
import re
import time
from pathlib import Path
from urllib.parse import unquote

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "data" / "pond_sources.json"
OUTPUT = ROOT / "data" / "map_coordinates.json"

HEADERS = {
    "User-Agent": "OpenFish/0.1 (educational fisheries research)",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9"
}


def extract_coordinates(url):
    url = unquote(url).replace("+", " ")

    patterns = [
        r"!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)",
        r"/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)",
        r"/maps/search/(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)",
    ]

    for pattern in patterns:
        match = re.search(pattern, url)

        if match:
            lat, lon = map(float, match.groups())

            if 41 <= lat <= 43 and -74 <= lon <= -69:
                return round(lat, 6), round(lon, 6)

    return None



def main():
    ponds = json.loads(SOURCES.read_text(encoding="utf-8"))
    results = []
    unresolved = []

    with requests.Session() as session:
        session.headers.update(HEADERS)

        for i, pond in enumerate(ponds):
            if i:
                time.sleep(2)

            try:
                response = session.get(pond["sourceUrl"], timeout=30)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, "html.parser")

                candidates = []

                
                for a in soup.find_all("a", href=True):
                    url = a["href"]
                    label = a.get_text(" ", strip=True).casefold()

                    # Only use pond-specific "Get directions" links.
                    # Ignore district office links labeled "Directions".
                    if label != "get directions":
                        continue

                    if not (
                        "google.com/maps" in url
                        or "maps.google.com" in url
                        or "maps.app.goo.gl" in url
                    ):
                        continue

                    try:
                        if "maps.app.goo.gl" in url:
                            expanded = session.get(
                                url,
                                timeout=30,
                                allow_redirects=True
                            )
                            expanded.raise_for_status()
                            url = expanded.url

                        coords = extract_coordinates(url)

                        if coords:
                            candidates.append((coords, url))

                    except requests.RequestException as err:
                        print(f"MAP LINK FAILED: {pond['name']}: {err}")


                unique = {}

                for coords, url in candidates:
                    unique.setdefault(coords, url)

                if unique:
                    coords, url = next(iter(unique.items()))
                    coords, url = next(iter(unique.items()))

                    results.append({
                        "id": pond["id"],
                        "name": pond["name"],
                        "town": pond["town"],
                        "latitude": coords[0],
                        "longitude": coords[1],
                        "coordinateSource": "Mass.gov map link",
                        "coordinateSourceUrl": url
                    })

                    print(f"OK {pond['name']} ({pond['town']}): {coords}")

                else:
                    reason = (
                        "no_coordinates" if not unique
                        else "multiple_locations"
                    )
                    unresolved.append({
                        "id": pond["id"],
                        "name": pond["name"],
                        "town": pond["town"],
                        "reason": reason,
                        "candidateCount": len(unique)
                    })
                    print(f"REVIEW {pond['name']}: {reason}")

            except requests.RequestException as err:
                unresolved.append({
                    "id": pond["id"],
                    "name": pond["name"],
                    "reason": "request_failed"
                })
                print(f"FAILED {pond['name']}: {err}")

    OUTPUT.write_text(
        json.dumps(results, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8"
    )

    (ROOT / "data" / "map_unresolved.json").write_text(
        json.dumps(unresolved, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8"
    )

    print(f"\nResolved: {len(results)} / {len(ponds)}")


if __name__ == "__main__":
    main()
