interface SpeciesListProps {
  species: string[];
  selectedSpecies: string | null;
  onSelectSpecies: (species: string) => void;
}

function SpeciesList({ species, selectedSpecies, onSelectSpecies }: SpeciesListProps) {
  return (
    <section aria-label="Fish species">
      <h3 className="section-heading">Fish species <span className="count-pill">{species.length}</span></h3>
      {species.length === 0 ? <p className="muted">No species records available yet.</p> : (
        <div className="species-list">
          {species.map((fish) => (
            <button
              key={fish}
              type="button"
              className={`species-button ${selectedSpecies === fish ? "is-active" : ""}`}
              aria-pressed={selectedSpecies === fish}
              onClick={() => onSelectSpecies(fish)}
            >
              <span>{fish}</span><span aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default SpeciesList;
