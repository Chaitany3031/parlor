import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/apiClient";

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  role: "CUSTOMER",
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  demoLogin: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("parlor_auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("parlor_auth_token") || null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(user && token);
  const role = user?.role || "CUSTOMER";

  useEffect(() => {
    if (user) {
      localStorage.setItem("parlor_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("parlor_auth_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("parlor_auth_token", token);
    } else {
      localStorage.removeItem("parlor_auth_token");
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    if (res?.jwt) {
      setToken(res.jwt);
      const currentUser = res.user || {
        id: 1,
        fullName: email.split("@")[0],
        email,
        role: res.role || "CUSTOMER",
      };
      setUser(currentUser);
      return { success: true, message: res.message || "Logged in successfully" };
    }
    return { success: false, message: res?.message || "Invalid credentials" };
  };

  const signup = async (data) => {
    const res = await authApi.signup(data);
    if (res?.jwt) {
      setToken(res.jwt);
      const currentUser = res.user || {
        id: Date.now(),
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        role: data.role || "CUSTOMER",
      };
      setUser(currentUser);
      return { success: true, message: res.message || "Account created successfully" };
    }
    return { success: false, message: res?.message || "Signup failed" };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const demoLogin = (roleType = "CUSTOMER") => {
    const isOwner = roleType === "SALON_OWNER";
    const demoUser = {
      id: isOwner ? 2 : 1,
      fullName: isOwner ? "Angel Salon Manager" : "Kaveri Sharma",
      username: isOwner ? "angel_owner" : "kaveri",
      email: isOwner ? "owner@angelsparlor.com" : "kaveri@gmail.com",
      phone: "+91 98201 23456",
      role: roleType,
    };
    const demoJwt = "demo_jwt_token_" + Date.now();
    setUser(demoUser);
    setToken(demoJwt);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        role,
        login,
        signup,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
