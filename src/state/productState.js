const KEY = "currentProductId";

export function setCurrentProductId(id) {
  if (id === null || id === undefined || id === "") return;
  localStorage.setItem(KEY, String(id));
}

export function getCurrentProductId() {
  return localStorage.getItem(KEY) || "";
}

export function clearCurrentProductId() {
  localStorage.removeItem(KEY);
}
