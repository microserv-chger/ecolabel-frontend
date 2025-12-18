const USERS_KEY = "eco_mock_users";
const TOKEN_KEY = "eco_mock_token";
const CURRENT_USER_KEY = "eco_mock_current_user";

// Utils
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// =======================
// SIGNUP
// =======================
export function mockSignup({ username, email, password }) {
  const users = getUsers();

  const exists = users.find(u => u.username === username);
  if (exists) {
    throw new Error("User already exists");
  }

  const newUser = { username, email, password, role: "USER" };
  users.push(newUser);
  saveUsers(users);

  localStorage.setItem(TOKEN_KEY, "mock-token");
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return { token: "mock-token", user: newUser };
}

// =======================
// LOGIN
// =======================
export function mockLogin({ username, password }) {
  const users = getUsers();

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  localStorage.setItem(TOKEN_KEY, "mock-token");
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  return { token: "mock-token", user };
}

// =======================
// GET CURRENT USER
// =======================
export function mockGetMe() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

// =======================
// LOGOUT
// =======================
export function mockLogout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
}
