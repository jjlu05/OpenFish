export interface Card {
  baitName: string;
  suitabilityRating: "High" | "Medium" | "Low";
  technique: string;
}

function BaitCard({ baitName, suitabilityRating, technique }: Card) {
  const ratingClass = suitabilityRating.toLowerCase();
  return (
    <article className="bait-card">
      <div className="card-header">
        <h4>{baitName}</h4>
        <span className={`rating-pill rating-${ratingClass}`}>{suitabilityRating}</span>
      </div>
      <p>{technique}</p>
    </article>
  );
}

export default BaitCard;
