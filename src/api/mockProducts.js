// src/api/mockProducts.js
export const mockAddProduct = (form) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: Math.floor(Math.random() * 100000),
          ...form,
          status: "UP",
          score: "B",
        },
      });
    }, 800);
  });
