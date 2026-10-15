
import "../App.css";
export interface Card {
  baitName: string;
  suitabilityRating: "High" | "Medium" | "Low";
  technique: string;
}

function BaitCard({ baitName, suitabilityRating, technique }: Card) {
  let color = "";
  if(suitabilityRating==="High")
  {
      color = "green";
  }
  else if(suitabilityRating==="Medium")
  {
      color = "yellow";
  }
  else if(suitabilityRating==="Low")
  {
      color = "gray";
  }
  return (
    <div className = "bait-card"> 
        <div className = "card-header">
            <h3> {baitName}</h3>
            <span style = {{color}}> {suitabilityRating} </span>
        </div>
        <p>
            {technique}
        </p>
    </div>
  );
}

export default BaitCard;
