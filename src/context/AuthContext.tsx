"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserResponse, AuthResponse } from "@/types/auth";
 
// Actual context object, start with undefined to prevent calling useAuth() outside of AuthProvider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Holds the auth state
 * Provides login/logout functions
 * Restores auth state from localStorage on mount
 */
export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // True while restoring auth state 

  // Runs once to restore auth state 
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  /**
   * Called after /login responds successfully
   * Saves token and user into state and persists them into localStorage
   */
  const login = (authResponse: AuthResponse) => {
    const { accessToken, user } = authResponse;
    setToken(accessToken);
    setUser(user);
    localStorage.setItem("token", authResponse.accessToken);
    localStorage.setItem("user", JSON.stringify(authResponse.user));
  };

  /**
   * Called when user logs out or token is invalid/expired
   * Clears auth state and removes everything from localStorage
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook so components can destructure useAuth() instead of using useContext(AuthContext) directly
export const useAuth = () => useContext(AuthContext)!;
