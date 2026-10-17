
import json
import math
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SURVEYS = ROOT / "data" / "fish_surveys.json"
COORDINATES = ROOT / "data" / "map_coordinates.json"
SPECIES_ALIASES = {
    "American Eel.": "American Eel",
    "Golden Shiner.": "Golden Shiner",
    "Pumpkin Seed": "Pumpkinseed",
    "Red Breasted Sunfish": "Redbreast Sunfish",
    "Red-Breasted Sunfish": "Redbreast Sunfish",
    "Redbreasted Sunfish": "Redbreast Sunfish",
    "Tesselated Darter": "Tessellated Darter",
    "Carp": "Common Carp",
    "Alewife (Sea-Run)": "Alewife",
    "Sea Run Alewife": "Alewife",
    "Sea-Run Alewife": "Alewife",
}
OUTPUT = ROOT / "data" / "ponds.json"
STATS = ROOT / "data" / "pipeline_stats.json"
UNRESOLVED = ROOT / "data" / "ponds_unresolved.json"


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def valid_coordinates(lat, lon):
    return (
        isinstance(lat, (int, float))
        and not isinstance(lat, bool)
        and isinstance(lon, (int, float))
        and not isinstance(lon, bool)
        and math.isfinite(lat)
        and math.isfinite(lon)
        and 41 <= lat <= 43
        and -74 <= lon <= -69
    )


def main():
    surveys = load_json(SURVEYS)
    coordinates = load_json(COORDINATES)

    # Ensure we never silently join duplicate IDs.
    for label, records in [
        ("surveys", surveys),
        ("coordinates", coordinates),
    ]:
        ids = [p["id"] for p in records]
        duplicates = [
            key for key, count in Counter(ids).items()
            if count > 1
        ]
        if duplicates:
            raise ValueError(
                f"Duplicate IDs in {label}: {duplicates[:10]}"
            )

    coordinates_by_id = {
        pond["id"]: pond for pond in coordinates
    }

    merged = []
    unresolved = []
    all_species = set()
    rejected = Counter()

    for survey in surveys:
        pond_id = survey["id"]
        location = coordinates_by_id.get(pond_id)

        if location is None:
            rejected["missing_coordinates"] += 1
            unresolved.append({
                "id": pond_id,
                "name": survey["name"],
                "town": survey.get("town"),
                "reason": "missing_coordinates",
            })
            continue

        # Guard against accidentally matching different ponds.
        if (
            survey["name"].casefold().strip()
            != location["name"].casefold().strip()
            or survey.get("town", "").casefold().strip()
            != location.get("town", "").casefold().strip()
        ):
            rejected["identity_mismatch"] += 1
            unresolved.append({
                "id": pond_id,
                "name": survey["name"],
                "town": survey.get("town"),
                "reason": "identity_mismatch",
            })
            continue

        lat = location.get("latitude")
        lon = location.get("longitude")

        if not valid_coordinates(lat, lon):
            rejected["invalid_coordinates"] += 1
            continue

        # Normalize and deduplicate species.
        # Normalize and deduplicate species.
        species_by_key = {}

        for value in survey.get("species", []):
            if isinstance(value, str) and value.strip():
                original = value.strip()

                # Convert alternate names into a standardized species name.
                canonical = SPECIES_ALIASES.get(original, original)

                # Use the standardized name for deduplication.
                species_by_key.setdefault(
                    canonical.casefold(),
                    canonical
                )

        species = sorted(
            species_by_key.values(),
            key=str.casefold
        )

        if not species:
            rejected["empty_species"] += 1
            continue

        all_species.update(species_by_key)

        merged.append({
            "id": pond_id,
            "name": survey["name"],
            "town": survey["town"],
            "latitude": lat,
            "longitude": lon,
            "species": species,
            "sourceUrl": survey["sourceUrl"],
            "coordinateSource": location["coordinateSource"],
            "coordinateSourceUrl": location["coordinateSourceUrl"],
        })

    if not merged:
        raise RuntimeError(
            "No ponds were merged. Existing output not overwritten."
        )

    merged.sort(key=lambda p: (
        p["name"].casefold(),
        p["town"].casefold()
    ))

    stats = {
        "surveyPonds": len(surveys),
        "coordinateRecords": len(coordinates),
        "exportedPonds": len(merged),
        "uniqueSpecies": len(all_species),
        "pondSpeciesRelationships": sum(
            len(p["species"]) for p in merged
        ),
        "rejectedRecords": dict(rejected),
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    OUTPUT.write_text(
        json.dumps(merged, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8"
    )

    STATS.write_text(
        json.dumps(stats, indent=2) + "\n",
        encoding="utf-8"
    )

    UNRESOLVED.write_text(
        json.dumps(unresolved, indent=2) + "\n",
        encoding="utf-8"
    )

    print("\n--- OpenFish dataset statistics ---")

    for key, value in stats.items():
        print(f"{key}: {value}")

    print(f"\nFrontend dataset: {OUTPUT}")
    print(f"Unresolved ponds: {UNRESOLVED}")


if __name__ == "__main__":
    main()
