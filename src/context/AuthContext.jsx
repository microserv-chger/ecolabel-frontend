import { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../api/services";
import http from "../api/http"; // might be needed to set default header if not already there

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Init auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Option 1: Just set dummy user from storage if available
      // Option 2: Verify token with backend
      AuthService.getMe()
        .then(userData => setUser(userData))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    // credentials: { username, password }
    try {
      const data = await AuthService.login(credentials);
      // data should be { token, ... } or AuthResponse
      // Based on AuthController, it returns AuthResponse which has token?
      // Let's assume standard JWT flow
      if (data.token) {
        localStorage.setItem("token", data.token);
        // Fetch user details or use what's returned
        // If backend doesn't return user obj, we might need to fetch it
        const userData = await AuthService.getMe();
        setUser(userData);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const signup = async (registerData) => {
    // registerData: { username, email, password }
    try {
      const data = await AuthService.register(registerData);
      // Auto login after signup?
      if (data.token) {
        localStorage.setItem("token", data.token);
        const userData = await AuthService.getMe();
        setUser(userData);
      }
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: loading,
        login,
        signup,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
