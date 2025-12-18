// SERVICES MOCKÉS — MODE DÉMO FRONTEND

// ---------- PARSER ----------
export const ParserService = {
  parseProduct: async (product) => {
    return Promise.resolve({
      success: true,
      product: {
        name: product.name || "Produit démo",
        gtin: product.gtin || "0000000000000",
        ingredients: ["Sucre", "Huile de palme"],
      },
    });
  },
};

// ---------- LCA / ACV ----------
export const LCAService = {
  calculate: async () => {
    return Promise.resolve([
      { name: "CO2", value: 180 },
      { name: "Eau", value: 320 },
      { name: "Énergie", value: 210 },
      { name: "Autres", value: 150 },
    ]);
  },
};

// ---------- NLP INGREDIENTS ----------
export const NLPService = {
  analyze: async () => {
    return Promise.resolve([
      {
        ingredient: "Sucre",
        status: "OK",
        percentage: 20,
      },
      {
        ingredient: "Huile de palme",
        status: "Attention",
        percentage: 15,
      },
    ]);
  },
};

// ---------- SCORING ----------
export const ScoringService = {
  score: async () => {
    return Promise.resolve({
      letter: "B",
      value: 75,
    });
  },
};
