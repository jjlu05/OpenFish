
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "data" / "Pond map table_6_0.csv"
OUTPUT = ROOT / "data" / "pond_sources.json"

ponds = []

with INPUT.open(encoding="utf-8-sig", newline="") as file:
    reader = csv.DictReader(file)

    for row in reader:
        ponds.append({
            "id": row["weblink"].rstrip("/").split("/")[-1],
            "name": row["Waterbody"].strip(),
            "town": row["Town"].strip(),
            "district": row["District"].strip(),
            "sourceUrl": row["weblink"].strip()
        })

OUTPUT.write_text(
    json.dumps(ponds, indent=2, ensure_ascii=False) + "\n",
    encoding="utf-8"
)

print(f"Imported {len(ponds)} official pond URLs")
print(f"Saved to {OUTPUT}")
