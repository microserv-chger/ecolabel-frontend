// src/api/lca.service.js
import http from "./http";

export const computeLCA = (productId) =>
  http.get(`http://localhost:8084/lca/${productId}`);
