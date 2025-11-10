import React, { useState, createContext, useContext, useEffect } from 'react';

// --- 1. AUTHENTICATION CONTEXT ---
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Use localStorage/sessionStorage in a real app to persist state, but here we use useState
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 
  
  // Simulated initial check (e.g., checking for a token in storage)
  useEffect(() => {
  const storedAuth = localStorage.getItem('wellnest_auth');
  if (storedAuth) {
    const parsed = JSON.parse(storedAuth);
    setIsAuthenticated(parsed.isAuthenticated);
    setUser(parsed.user);
  }
}, []);


  // Simulates a successful login/signup event
  const login = (userData) => {
  // Extract what you need from backend response
  const newAuthData = {
    isAuthenticated: true,
    user: {
      id: userData.id || Date.now(),
      fullName: userData.fullName || userData.name || 'User',
      email: userData.email,
      storagePreference: userData.storagePreference || 'CLOUD_SYNC',
    },
    token: userData.token || null, // if your backend returns a JWT or session token
  };

  setIsAuthenticated(true);
  setUser(newAuthData.user);
  localStorage.setItem('wellnest_auth', JSON.stringify(newAuthData));

  console.log("User logged in:", newAuthData);
};


  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('wellnest_auth');
    console.log("User logged out.");
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};