// SERVICES RÉELS — CONNEXION BACKEND MICROSERVICES
import http from "./http";

const URLS = {
  AUTH: import.meta.env.VITE_AUTH_URL,
  PARSER: import.meta.env.VITE_PARSER_URL,
  LCA: import.meta.env.VITE_LCA_URL,
  NLP: import.meta.env.VITE_NLP_URL,
  SCORING: import.meta.env.VITE_SCORING_URL,
  WIDGET: import.meta.env.VITE_WIDGET_URL,
};

// ---------- AUTH SERVICE ----------
export const AuthService = {
  /**
   * @param {Object} credentials - { username, password }
   */
  login: async (credentials) => {
    // POST http://localhost:8080/auth/login
    const response = await http.post(`${URLS.AUTH}/auth/login`, credentials);
    return response.data; // Returns AuthResponse { token, user }
  },

  /**
   * @param {Object} registerData - { username, email, password }
   */
  register: async (registerData) => {
    // POST http://localhost:8080/auth/register
    const response = await http.post(`${URLS.AUTH}/auth/register`, registerData);
    return response.data; // Returns AuthResponse
  },

  getMe: async () => {
    // GET http://localhost:8080/auth/me
    const response = await http.get(`${URLS.AUTH}/auth/me`);
    return response.data; // Returns UserAccount
  }
};

// ---------- PARSER ----------
export const ParserService = {
  /**
   * @param {Object} productData - { gtin, name, brand, originCountry, packaging, rawText, imageBase64, pdfBase64 }
   */
  parseProduct: async (productData) => {
    // Backend expects ProductParseRequest
    // POST http://localhost:8081/product/parse
    const response = await http.post(`${URLS.PARSER}/product/parse`, productData);
    return response.data; // Returns ProductParseResponse { id, status }
  },

  getParsedProduct: async (id) => {
    // GET http://localhost:8081/product/{id}
    const response = await http.get(`${URLS.PARSER}/product/${id}`);
    return response.data; // Returns ProductMetadata
  },
};

// ---------- LCA / ACV ----------
export const LCAService = {
  /**
   * @param {Object} lcaRequest - { productId, ingredients: [{name, category, impactHint}], transportKm, transportMode }
   */
  calculate: async (lcaRequest) => {
    // POST http://localhost:8083/lca/calc
    const response = await http.post(`${URLS.LCA}/lca/calc`, lcaRequest);
    return response.data; // Returns LcaResultDto
  },

  getByProduct: async (productId) => {
    // GET http://localhost:8083/lca/product/{productId}
    const response = await http.get(`${URLS.LCA}/lca/product/${productId}`);
    return response.data;
  },
};

// ---------- NLP INGREDIENTS ----------
export const NLPService = {
  /**
   * @param {Object} nlpRequest - { productId, text }
   */
  analyze: async (nlpRequest) => {
    // POST http://localhost:8082/nlp/extract
    const response = await http.post(`${URLS.NLP}/nlp/extract`, nlpRequest);
    return response.data; // Returns List<NormalizedIngredient>
  },

  getByProduct: async (productId) => {
    // GET http://localhost:8082/nlp/product/{productId}
    const response = await http.get(`${URLS.NLP}/nlp/product/${productId}`);
    return response.data;
  },

  /**
   * Get all processed products with their extracted ingredients
   */
  getAllProducts: async () => {
    // GET http://localhost:8082/nlp/products
    const response = await http.get(`${URLS.NLP}/nlp/products`);
    return response.data; // Returns List<ProductWithIngredients>
  },
};

// ---------- SCORING ----------
export const ScoringService = {
  /**
   * @param {Object} scoreRequest - { productId, co2Kg, waterLiters, energyMj }
   */
  score: async (scoreRequest) => {
    // POST http://localhost:8084/score/compute
    const response = await http.post(`${URLS.SCORING}/score/compute`, scoreRequest);
    return response.data; // Returns ScoreResponse
  },

  getByProduct: async (productId) => {
    // GET http://localhost:8084/score/product/{productId}
    const response = await http.get(`${URLS.SCORING}/score/product/${productId}`);
    return response.data;
  },

  getProvenance: async (productId) => {
    // GET http://localhost:8084/score/provenance/{productId}
    const response = await http.get(`${URLS.SCORING}/score/provenance/${productId}`);
    return response.data; // Returns List<ProvenanceEntry>
  },
};

// ---------- WIDGET (PUBLIC) ----------
export const WidgetService = {
  getPublicScore: async (productId) => {
    // GET http://localhost:8085/public/product/{productId}
    const response = await http.get(`${URLS.WIDGET}/public/product/${productId}`);
    return response.data; // Returns PublicScoreResponse
  },
};
