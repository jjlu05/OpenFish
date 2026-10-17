import { useState } from "react";
import "./App.css";
import FishingMap from "./components/FishingMap";
import PondDetails from "./components/PondDetails";
import { ponds } from "../data/ponds";
import type { Pond } from "./types/fishing";

function matchesFilters(pond: Pond, species: string, query: string): boolean {
  return (
    (species === "All Species" || pond.species.includes(species)) &&
    pond.name.toLowerCase().includes(query.trim().toLowerCase())
  );
}

function App() {
  const [selectedPond, setSelectedPond] = useState<Pond | null>(null);
  const [speciesFilter, setSpeciesFilter] = useState("All Species");
  const [searchQuery, setSearchQuery] = useState("");

  const allSpecies = [...new Set(ponds.flatMap((pond) => pond.species))].sort();
  const filteredPonds = ponds.filter((pond) => matchesFilters(pond, speciesFilter, searchQuery));

  function updateFilters(species: string, query: string) {
    setSpeciesFilter(species);
    setSearchQuery(query);
    if (selectedPond && !matchesFilters(selectedPond, species, query)) {
      setSelectedPond(null);
    }
  }

  function resetFilters() {
    updateFilters("All Species", "");
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand"><span className="brand-mark" aria-hidden="true">◈</span><span>OpenFish</span></div>
        <p>Find local waters. Choose your fish. Bring the right bait.</p>
        <span className="free-pill">Free fishing guide</span>
      </header>

      <section className="toolbar" aria-label="Filter fishing locations">
        <label className="filter-field">
          <span>Search locations</span>
          <input
            type="search"
            placeholder="e.g. Indian Lake"
            value={searchQuery}
            onChange={(event) => updateFilters(speciesFilter, event.target.value)}
          />
        </label>
        <label className="filter-field">
          <span>Target species</span>
          <select value={speciesFilter} onChange={(event) => updateFilters(event.target.value, searchQuery)}>
            <option value="All Species">All Species</option>
            {allSpecies.map((species) => <option key={species} value={species}>{species}</option>)}
          </select>
        </label>
        <div className="filter-status" role="status">
          <strong>{filteredPonds.length}</strong> {filteredPonds.length === 1 ? "location" : "locations"} found
        </div>
        <button className="ghost-button" type="button" onClick={resetFilters} disabled={speciesFilter === "All Species" && searchQuery === ""}>Clear filters</button>
      </section>

      <main className="main-layout">
        <section className="map-panel" aria-label="Fishing locations map">
          <FishingMap ponds={filteredPonds} onSelectPond={setSelectedPond} selectedPondId={selectedPond?.id ?? null} />
          {filteredPonds.length === 0 && (
            <div className="map-empty" role="status">
              <h2>No matching ponds</h2>
              <p>Try another species or a different search.</p>
              <button className="primary-button" type="button" onClick={resetFilters}>Show all locations</button>
            </div>
          )}
          <div className="map-caption">Showing sample Massachusetts pond data · Fisheries records to be verified in Phase 2</div>
        </section>
        <aside className="sidebar" aria-label="Fishing location details">
          <PondDetails key={selectedPond?.id ?? "none"} pond={selectedPond} />
        </aside>
      </main>
      <footer className="site-footer">OpenFish · Species lists are provisional until sourced and verified.</footer>
    </div>
  );
}

export default App;
