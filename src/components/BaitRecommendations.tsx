import "../App.css";

import { recommendations } from "../data/baitRecommendations";
import BaitCard  from "../components/BaitCard";

interface BaitRecommendation {
  species: string;
}

function BaitRec({species}: BaitRecommendation) {
const baits = recommendations[species] ?? [];
  if(baits.length === 0) {
    return <p>No recommendations available for {species}.</p>;
  }
  return (
    baits.map((bait) => (
      <BaitCard
        key={bait.baitName}
        baitName={bait.baitName}
        suitabilityRating={bait.suitabilityRating}
        technique={bait.technique}
      />
    ))
  );
}

export default BaitRec;
