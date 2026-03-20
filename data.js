const baseData = [
  {
    situation: "price too high",
    keywords: ["price", "high"],
    responses: {
      soft: "We understand your concern regarding pricing.",
      firm: "At this level, maintaining quality would not be possible.",
      strategic: "We focus on long-term value rather than short-term pricing."
    }
  },
  {
    situation: "freight increase",
    keywords: ["freight", "shipping"],
    responses: {
      soft: "Freight rates have increased globally.",
      firm: "This is beyond our control.",
      strategic: "We recommend confirming soon to secure current rates."
    }
  },
  {
    situation: "customer complains quality",
    keywords: ["quality", "problem"],
    responses: {
      soft: "Thank you for your feedback, we are checking.",
      firm: "We need to verify before confirming responsibility.",
      strategic: "We will propose a solution to maintain cooperation."
    }
  }
];

// generate 500
const variations = [
  "urgent order",
  "big order",
  "long term",
  "market down",
  "competition strong"
];

let fullData = [];

baseData.forEach(item => {
  variations.forEach(v => {
    fullData.push({
      situation: item.situation + " " + v,
      keywords: item.keywords,
      responses: item.responses
    });
  });
});

while (fullData.length < 500) {
  fullData = fullData.concat(fullData);
}

fullData = fullData.slice(0, 500);
