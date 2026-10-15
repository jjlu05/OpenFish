import type { Card } from "../components/BaitCard";

export const recommendations: Record<string, Card[]> = {
  "Largemouth Bass": [
    {
      baitName: "Soft Plastic Worm",
      suitabilityRating: "High",
      technique: "Slowly retrieve near vegetation."
    },
    {
      baitName: "Spinnerbait",
      suitabilityRating: "Medium",
      technique: "Retrieve around submerged structures."
    }
  ]
};