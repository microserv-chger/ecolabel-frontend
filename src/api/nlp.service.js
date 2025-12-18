// src/api/nlp.service.js
import http from "./http";

export const analyzeIngredients = (payload) =>
  http.post("http://localhost:8083/nlp/analyze", payload);
