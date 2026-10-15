
interface SpeciesListProps {
  species: string[];
  onSelectSpecies: (species: string) => void;
}

function SpeciesList({species, onSelectSpecies}: SpeciesListProps) 
{
  return (
    <div>
      <h3>Fish Species</h3>

      {species.map((fish) => (
        <button
          key={fish}
          onClick={() => onSelectSpecies(fish)}
        >
          {fish}
        </button>
      ))}
    </div>
  );
}
//how was this implemented before without react
export default SpeciesList;
