import { recommendations } from "../../data/baitRecommendations";
import BaitCard from "./BaitCard";

interface BaitRecommendationsProps { species: string; }

function BaitRecommendations({ species }: BaitRecommendationsProps) {
  const baits = recommendations[species] ?? [];
  if (baits.length === 0) {
    return <p className="no-recommendations">No bait recommendations available for this species yet.</p>;
  }
  return (
    <div className="bait-list">
      {baits.map((bait) => (
        <BaitCard key={bait.baitName} baitName={bait.baitName} suitabilityRating={bait.suitabilityRating} technique={bait.technique} />
      ))}
      <p className="recommendation-disclaimer">General suggestions, not guarantees of a catch.</p>
    </div>
  );
}

export default BaitRecommendations;
