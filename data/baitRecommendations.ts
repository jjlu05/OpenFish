import type { Card } from "../src/components/BaitCard";

// General-purpose starting suggestions, not measured catch-success probabilities.
// Follow local regulations for bait, harvest, and protected species.
const bySpecies: Record<string, Card[]> = {
  "Alewife": [
    { baitName: "Tiny Sabiki-Style Fly", suitabilityRating: "Medium", technique: "Where legal, use very small flies around visible schools; these fish mainly feed on plankton." },
    { baitName: "Micro Plankton Fly", suitabilityRating: "Low", technique: "Present a tiny imitation gently; conventional sport fishing for alewife is uncommon." },
  ],
  "American Eel": [
    { baitName: "Nightcrawler", suitabilityRating: "High", technique: "Fish near the bottom at dusk or after dark with a simple bottom rig." },
    { baitName: "Small Cut Fish", suitabilityRating: "Medium", technique: "Use where legal near cover on the bottom; check eel-specific regulations." },
  ],
  "Banded Killifish": [
    { baitName: "Micro Fly", suitabilityRating: "Low", technique: "Present an extremely small insect imitation in shallow water; this is primarily a forage fish." },
    { baitName: "Tiny Worm Fragment", suitabilityRating: "Low", technique: "If lawful to target, use a very small hook and minimal bait near vegetation." },
  ],
  "Banded Sunfish": [
    { baitName: "Tiny Insect Fly", suitabilityRating: "Low", technique: "Use a micro-sized fly around shallow vegetation; verify local protections before targeting." },
    { baitName: "Tiny Worm Fragment", suitabilityRating: "Low", technique: "Fish gently with a very small hook; this is not a typical sport-fishing target." },
  ],
  "Black Crappie": [
    { baitName: "Small Minnow", suitabilityRating: "High", technique: "Suspend near brush piles and drop-offs beneath a float where bait use is legal." },
    { baitName: "Small Soft-Plastic Jig", suitabilityRating: "High", technique: "Swim or vertically jig slowly around suspended schools." },
  ],
  "Blueback Herring": [
    { baitName: "Micro Fly", suitabilityRating: "Low", technique: "Conventional angling is uncommon; consult river-herring regulations before targeting." },
    { baitName: "Tiny Plankton Imitation", suitabilityRating: "Low", technique: "If fishing is permitted, present gently near visible schools." },
  ],
  "Bluegill": [
    { baitName: "Live Worm", suitabilityRating: "High", technique: "Suspend a small piece beneath a float near weeds or docks." },
    { baitName: "Small Jig", suitabilityRating: "High", technique: "Retrieve slowly or let it fall near cover." },
  ],
  "Bowfin": [
    { baitName: "Cut Fish", suitabilityRating: "High", technique: "Fish near weed beds and deeper holes on a sturdy bottom rig where legal." },
    { baitName: "Soft-Plastic Swimbait", suitabilityRating: "Medium", technique: "Work slowly around heavy vegetation and submerged cover." },
  ],
  "Bridle Shiner": [
    { baitName: "Micro Fly", suitabilityRating: "Low", technique: "Small forage species; avoid targeting where protected and confirm regulations." },
    { baitName: "Tiny Worm Fragment", suitabilityRating: "Low", technique: "If lawful, present on an extremely small hook in shallow water." },
  ],
  "Brook Trout": [
    { baitName: "Small Inline Spinner", suitabilityRating: "High", technique: "Retrieve steadily through cool pools and current seams." },
    { baitName: "Dry Fly or Nymph", suitabilityRating: "High", technique: "Match insects near riffles, shaded banks, and feeding lanes." },
  ],
  "Brown Bullhead": [
    { baitName: "Nightcrawler", suitabilityRating: "High", technique: "Fish on or near the bottom in muddy coves, especially toward dusk." },
    { baitName: "Chicken Liver", suitabilityRating: "Medium", technique: "Use a small bottom rig in calm water where bait restrictions permit." },
  ],
  "Bullhead": [
    { baitName: "Nightcrawler", suitabilityRating: "High", technique: "Fish a simple bottom rig along soft-bottom edges." },
    { baitName: "Cut Bait", suitabilityRating: "Medium", technique: "Keep a small piece near the bottom in low light." },
  ],
  "Common Carp": [
    { baitName: "Sweet Corn", suitabilityRating: "High", technique: "Use a small bottom presentation near feeding flats where corn is permitted." },
    { baitName: "Boilie", suitabilityRating: "High", technique: "Present on a hair rig and wait near known carp feeding areas." },
  ],
  "Chain Pickerel": [
    { baitName: "Spinnerbait", suitabilityRating: "High", technique: "Retrieve along weed edges and through gaps in vegetation." },
    { baitName: "Jerkbait", suitabilityRating: "High", technique: "Use short twitches and pauses near submerged cover." },
  ],
  "Channel Catfish": [
    { baitName: "Cut Bait", suitabilityRating: "High", technique: "Fish on the bottom near channels or deeper flats at dusk." },
    { baitName: "Nightcrawler", suitabilityRating: "High", technique: "Present on a bottom rig near current breaks or drop-offs." },
  ],
  "Common Shiner": [
    { baitName: "Small Worm Fragment", suitabilityRating: "Medium", technique: "Use a tiny hook in slow pools; these are primarily forage fish." },
    { baitName: "Micro Nymph", suitabilityRating: "Low", technique: "Drift a very small nymph through clear water." },
  ],
  "Creek Chubsucker": [
    { baitName: "Tiny Worm Fragment", suitabilityRating: "Low", technique: "This small bottom-feeding fish is not a conventional angling target." },
    { baitName: "Micro Nymph", suitabilityRating: "Low", technique: "If lawful, drift close to the bottom in gentle current." },
  ],
  "Fallfish": [
    { baitName: "Small Inline Spinner", suitabilityRating: "High", technique: "Retrieve through current seams and deeper pools." },
    { baitName: "Small Streamer Fly", suitabilityRating: "Medium", technique: "Swing or strip through flowing sections." },
  ],
  "Gizzard Shad": [
    { baitName: "Micro Plankton Fly", suitabilityRating: "Low", technique: "Filter-feeding forage fish; standard lures are generally ineffective." },
    { baitName: "Tiny Sabiki-Style Fly", suitabilityRating: "Low", technique: "If permitted, try micro-sized presentations around visible schools." },
  ],
  "Golden Shiner": [
    { baitName: "Tiny Worm Fragment", suitabilityRating: "Medium", technique: "Present beneath a small float near shallow vegetation." },
    { baitName: "Micro Fly", suitabilityRating: "Low", technique: "Use a tiny insect imitation; more often considered a forage species." },
  ],
  "Killifish": [
    { baitName: "Micro Fly", suitabilityRating: "Low", technique: "Tiny forage fish; conventional lure fishing is uncommon." },
    { baitName: "Tiny Worm Fragment", suitabilityRating: "Low", technique: "If lawful, use an extremely small hook in shallow water." },
  ],
  "Lake Chub": [
    { baitName: "Small Worm Fragment", suitabilityRating: "Medium", technique: "Fish a tiny hook in cool clear water around rocky areas." },
    { baitName: "Micro Nymph", suitabilityRating: "Low", technique: "Drift gently through feeding lanes." },
  ],
  "Lake Trout": [
    { baitName: "Jigging Spoon", suitabilityRating: "High", technique: "Work vertically near cold deep-water structure." },
    { baitName: "Deep-Diving Minnow Plug", suitabilityRating: "Medium", technique: "Troll where permitted at depths holding cold-water fish." },
  ],
  "Landlocked Alewife": [
    { baitName: "Micro Fly", suitabilityRating: "Low", technique: "Plankton-feeding forage fish; conventional angling is uncommon." },
    { baitName: "Tiny Sabiki-Style Fly", suitabilityRating: "Low", technique: "If permitted, present tiny imitations near schools." },
  ],
  "Landlocked Salmon": [
    { baitName: "Spoon", suitabilityRating: "High", technique: "Cast or troll through open water where salmon are feeding." },
    { baitName: "Streamlined Streamer Fly", suitabilityRating: "Medium", technique: "Retrieve around baitfish schools in cool water." },
  ],
  "Largemouth Bass": [
    { baitName: "Soft Plastic Worm", suitabilityRating: "High", technique: "Work slowly around weed edges, docks, and submerged cover." },
    { baitName: "Spinnerbait", suitabilityRating: "High", technique: "Retrieve along vegetation and structure, particularly in stained water." },
  ],
  "Northern Pike": [
    { baitName: "Large Spoon", suitabilityRating: "High", technique: "Retrieve across weed lines and open pockets." },
    { baitName: "Large Swimbait", suitabilityRating: "High", technique: "Use steady retrieves near drop-offs and submerged vegetation." },
  ],
  "Pumpkinseed": [
    { baitName: "Live Worm", suitabilityRating: "High", technique: "Fish small pieces beneath a float near vegetation and rocky margins." },
    { baitName: "Small Jig", suitabilityRating: "High", technique: "Slowly swim a lightweight jig past shallow cover." },
  ],
  "Rainbow Smelt": [
    { baitName: "Tiny Jig", suitabilityRating: "High", technique: "Use a small jig near schools where seasonal and local regulations allow." },
    { baitName: "Small Minnow", suitabilityRating: "Medium", technique: "Present near schooling fish at the appropriate depth where legal." },
  ],
  "Rainbow Trout": [
    { baitName: "Small Inline Spinner", suitabilityRating: "High", technique: "Retrieve steadily along drop-offs or current seams." },
    { baitName: "Small Spoon", suitabilityRating: "High", technique: "Cast and retrieve with occasional pauses in cool water." },
  ],
  "Redbreast Sunfish": [
    { baitName: "Live Worm", suitabilityRating: "High", technique: "Use a small hook near rocky banks and gentle currents." },
    { baitName: "Small Insect Fly", suitabilityRating: "High", technique: "Present dry flies or small nymphs near cover." },
  ],
  "Redfin Pickerel": [
    { baitName: "Small Spinner", suitabilityRating: "Medium", technique: "Work slowly around shallow vegetation and woody cover." },
    { baitName: "Small Minnow Imitation", suitabilityRating: "Medium", technique: "Use gentle twitching retrieves in narrow channels and weedy edges." },
  ],
  "River Herring": [
    { baitName: "Micro Fly", suitabilityRating: "Low", technique: "Conventional angling is uncommon; river-herring harvest is heavily restricted in Massachusetts." },
    { baitName: "Tiny Plankton Imitation", suitabilityRating: "Low", technique: "Informational only: confirm current targeting rules before attempting to fish." },
  ],
  "Rock Bass": [
    { baitName: "Small Jig", suitabilityRating: "High", technique: "Bounce or swim along rocky banks and submerged structure." },
    { baitName: "Live Worm", suitabilityRating: "High", technique: "Fish near rocks and docks using a small hook." },
  ],
  "Smallmouth Bass": [
    { baitName: "Tube Jig", suitabilityRating: "High", technique: "Drag or hop around rocky points and gravel bottoms." },
    { baitName: "Jerkbait", suitabilityRating: "High", technique: "Use twitch-and-pause retrieves near drop-offs." },
  ],
  "Tessellated Darter": [
    { baitName: "Micro Nymph", suitabilityRating: "Low", technique: "Small bottom-dwelling forage species; conventional angling is uncommon." },
    { baitName: "Tiny Worm Fragment", suitabilityRating: "Low", technique: "If permitted, present close to the streambed with a very small hook." },
  ],
  "Walleye": [
    { baitName: "Jig and Soft Plastic", suitabilityRating: "High", technique: "Work slowly around drop-offs, points, and rocky structure." },
    { baitName: "Minnow-Style Crankbait", suitabilityRating: "High", technique: "Retrieve or troll near structure in low light where permitted." },
  ],
  "White Catfish": [
    { baitName: "Nightcrawler", suitabilityRating: "High", technique: "Fish near the bottom in coves and deeper channels." },
    { baitName: "Cut Bait", suitabilityRating: "High", technique: "Use a simple bottom rig near structure at dusk." },
  ],
  "White Perch": [
    { baitName: "Small Minnow", suitabilityRating: "High", technique: "Fish around schooling perch near drop-offs." },
    { baitName: "Small Jig", suitabilityRating: "High", technique: "Retrieve steadily or jig vertically near structure." },
  ],
  "White Sucker": [
    { baitName: "Nightcrawler", suitabilityRating: "High", technique: "Fish a small bottom rig in slow pools or along gravel edges." },
    { baitName: "Small Dough Bait", suitabilityRating: "Medium", technique: "Present near the bottom where legal." },
  ],
  "Yellow Bullhead": [
    { baitName: "Nightcrawler", suitabilityRating: "High", technique: "Fish on the bottom near weedy or muddy banks after dusk." },
    { baitName: "Cut Bait", suitabilityRating: "Medium", technique: "Use a small bottom rig near cover." },
  ],
  "Yellow Perch": [
    { baitName: "Small Minnow", suitabilityRating: "High", technique: "Fish near schools along weed edges or drop-offs." },
    { baitName: "Small Jig", suitabilityRating: "High", technique: "Jig close to bottom or slowly retrieve through schools." },
  ],
};

// Names as they appeared in the Mass.gov source data.
// Keep aliases until the upstream Python normalization is implemented.
const aliases: Record<string, string> = {
  "Alewife (Sea-Run)": "Alewife",
  "Sea Run Alewife": "Alewife",
  "Sea-Run Alewife": "Alewife",
  "American Eel.": "American Eel",
  "Carp": "Common Carp",
  "Golden Shiner.": "Golden Shiner",
  "Pumpkin Seed": "Pumpkinseed",
  "Red Breasted Sunfish": "Redbreast Sunfish",
  "Red-Breasted Sunfish": "Redbreast Sunfish",
  "Redbreasted Sunfish": "Redbreast Sunfish",
  "Tesselated Darter": "Tessellated Darter",
};

export const recommendations: Record<string, Card[]> = { ...bySpecies };
for (const [alias, canonical] of Object.entries(aliases)) {
  recommendations[alias] = bySpecies[canonical];
}
