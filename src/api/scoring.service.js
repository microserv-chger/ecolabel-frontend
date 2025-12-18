// src/api/scoring.service.js
import http from "./http";

export const computeScore = (productId) =>
  http.post(`http://localhost:8085/score/${productId}`);
