
import json
import requests

from pathlib import Path
from shapely.geometry import shape

BASE_URL = (
    "https://services1.arcgis.com/hGdibHYSPO59RG1h/"
    "ArcGIS/rest/services/Massachusetts_Water_Features/"
    "FeatureServer/2/query"
)

OUTPUT = Path("data/importedPonds.json")

BATCH_SIZE = 100
MAX_PONDS = 1000

def fetch_ponds():
    ponds = []
    offset = 0

    with requests.Session() as session:
        while len(ponds) < MAX_PONDS:
            params = {
                "where": "TYPE = 'P' AND NAME IS NOT NULL",
                "outFields": "OBJECTID,NAME,SQ_METERS",
                "returnGeometry": "true",
                "outSR": 4326,
                "orderByFields": "OBJECTID ASC",
                "resultOffset": offset,
                "resultRecordCount": min(
                    BATCH_SIZE, MAX_PONDS - len(ponds)
                ),
                "f": "geojson",
            }

            response = session.get(
                BASE_URL, params=params, timeout=30
            )
            response.raise_for_status()
            data = response.json()

            if "error" in data:
                raise RuntimeError(data["error"])

            features = data.get("features", [])

            if not features:
                break

            for feature in features:
                properties = feature["properties"]
                geometry = feature.get("geometry")

                if not geometry:
                    continue

                name = properties.get("NAME")
                if not name or not name.strip():
                    continue

                # Find a point inside the water body's polygon.
                point = shape(geometry).representative_point()

                ponds.append({
                    "id": f"massgis-{properties['OBJECTID']}",
                    "name": name.strip(),
                    "latitude": round(point.y, 6),
                    "longitude": round(point.x, 6),
                    "species": [],
                    "areaSqMeters": properties.get("SQ_METERS"),
                    "source": "MassGIS"
                })

            offset += len(features)

            print(f"Processed {offset} geographic records")

            if len(features) < params["resultRecordCount"]:
                break

    return ponds


def main():
    ponds = fetch_ponds()

    if not ponds:
        raise RuntimeError("No ponds returned. Output not written.")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    OUTPUT.write_text(
        json.dumps(ponds, indent=2),
        encoding="utf-8"
    )

    print(f"Imported {len(ponds)} ponds")
    print(f"Saved to {OUTPUT}")


if __name__ == "__main__":
    main()
