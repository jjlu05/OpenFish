
import { useState } from "react";
import "./App.css";

import FishingMap from "./components/FishingMap";
import PondDetails from "./components/PondDetails";
import { ponds } from "./data/ponds";
import type { Pond } from "./types/fishing";

function App() {
  const [selectedPond, setSelectedPond] =
    useState<Pond | null>(null);

  const [speciesFilter, setSpeciesFilter] =
    useState("All Species");

  const [searchQuery, setSearchQuery] = useState("");

  // Collect unique species from all ponds
  const allSpecies = [...new Set(ponds.flatMap(pond => pond.species))].sort();

  // Apply both filters to the pond dataset
  const filteredPonds = ponds.filter(pond => {
    const matchesSpecies =
      speciesFilter === "All Species" ||
      pond.species.includes(speciesFilter);

    const matchesSearch = pond.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    return matchesSpecies && matchesSearch;
  });

  // Clear a selected pond if filters hide it
  function updateFilters(newSpecies: string, newSearch: string) {
  setSpeciesFilter(newSpecies);
  setSearchQuery(newSearch);

  if (selectedPond) {
    const matchesSpecies =
      newSpecies === "All Species" ||
      selectedPond.species.includes(newSpecies);

    const matchesSearch = selectedPond.name
      .toLowerCase()
      .includes(newSearch.trim().toLowerCase());

    if (!matchesSpecies || !matchesSearch) {
      setSelectedPond(null);
    }
  }
}

  return (
    <div className="app">
      <header className="app-header">
        <h1>OpenFish</h1>
        <p>Discover fishing spots and find the right bait.</p>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search ponds..."
          value={searchQuery}
          onChange={e =>
            updateFilters(speciesFilter, e.target.value)
          }
        />

        <select
          value={speciesFilter}
          onChange={e =>
            updateFilters(e.target.value, searchQuery)
          }
        >
          <option value="All Species">All Species</option>

          {allSpecies.map(species => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>

        <span>
          {filteredPonds.length} fishing locations found
        </span>
      </div>

      <main className="app-content">
        <div className="map-section">
          <FishingMap
            ponds={filteredPonds}
            onSelectPond={setSelectedPond}
          />
        </div>

        <aside className="details-section">
          <PondDetails
            key={selectedPond?.id ?? "none"}
            pond={selectedPond}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
