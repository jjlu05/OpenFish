
import { useState } from "react";
import type { Pond } from "../types/fishing";
import SpeciesList from "./SpeciesList";
import BaitRecommendations from "./BaitRecommendations";

interface PondDetailsProps {
  pond: Pond | null;
}

function PondDetails({ pond }: PondDetailsProps) {
  const [selectedSpecies, setSelectedSpecies] =
    useState<string | null>(null);

  if (pond === null) {
    return <p>Select a pond on the map to see its details.</p>;
  }

  return (
    <div>
      <h2>{pond.name}</h2>

      <SpeciesList
        species={pond.species}
        onSelectSpecies={setSelectedSpecies}
      />

      {selectedSpecies !== null && (
        <div>
          <h3>Selected Fish</h3>
          <p>{selectedSpecies}</p>
          <BaitRecommendations species={selectedSpecies} />
        </div>
      )}
    </div>
  );
}

export default PondDetails;
