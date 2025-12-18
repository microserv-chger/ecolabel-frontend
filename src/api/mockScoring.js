export function mockComputeScore(productId) {
  // simulation réaliste d’un scoring environnemental
  const scoreMap = [
    { letter: "A", value: 85 },
    { letter: "B", value: 70 },
    { letter: "C", value: 55 },
    { letter: "D", value: 35 },
    { letter: "E", value: 20 },
  ];

  const picked = scoreMap[Math.floor(Math.random() * scoreMap.length)];

  return {
    scoreLetter: picked.letter,
    scoreValue: picked.value,
    breakdown: [
      { name: "CO₂", value: Math.round(Math.random() * 40) },
      { name: "Eau", value: Math.round(Math.random() * 35) },
      { name: "Énergie", value: Math.round(Math.random() * 25) },
    ],
  };
}
