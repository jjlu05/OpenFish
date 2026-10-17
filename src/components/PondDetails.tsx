import { useState } from "react";
import type { Pond } from "../types/fishing";
import SpeciesList from "./SpeciesList";
import BaitRecommendations from "./BaitRecommendations";

interface PondDetailsProps { pond: Pond | null; }

function PondDetails({ pond }: PondDetailsProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

  if (!pond) {
    return (
      <div className="empty-details">
        <div className="empty-icon" aria-hidden="true">⌖</div>
        <h2>Choose a fishing spot</h2>
        <p>Click a map marker to see the fish documented at that location and explore suggested baits.</p>
      </div>
    );
  }

  return (
    <div className="pond-details">
      <div className="eyebrow">Selected fishing location</div>
      <h2>{pond.name}</h2>
      <p className="muted">Select a species to see recommended bait and fishing techniques.</p>
      <SpeciesList species={pond.species} selectedSpecies={selectedSpecies} onSelectSpecies={setSelectedSpecies} />
      {selectedSpecies !== null ? (
        <section className="recommendations-section" aria-label="Bait recommendations">
          <div className="section-divider" />
          <div className="eyebrow">Your target fish</div>
          <h3>{selectedSpecies}</h3>
          <BaitRecommendations species={selectedSpecies} />
        </section>
      ) : (
        <p className="helper-text">Choose any species above to reveal its bait cards.</p>
      )}
    </div>
  );
}

export default PondDetails;
