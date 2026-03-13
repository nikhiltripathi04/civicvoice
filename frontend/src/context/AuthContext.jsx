import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
 clearAuthStorage,
 getStoredToken,
 getStoredUser,
 setStoredToken,
 setStoredUser
} from "../utils/authStorage";

const AuthContext = createContext(null);

const isTokenExpired = (token) => {
 try {
  const payloadBase64 = token.split(".")[1];

  if (!payloadBase64) {
   return true;
  }

  const payload = JSON.parse(atob(payloadBase64));

  if (!payload.exp) {
   return false;
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowInSeconds;
 } catch (error) {
  return true;
 }
};

export const AuthProvider = ({ children }) => {
 const [token, setToken] = useState(() => getStoredToken());
 const [user, setUser] = useState(() => getStoredUser());

 const logout = () => {
  setToken(null);
  setUser(null);
  clearAuthStorage();
 };

 const login = ({ token: nextToken, user: nextUser }) => {
  setToken(nextToken);
  setUser(nextUser || null);
  setStoredToken(nextToken);

  if (nextUser) {
   setStoredUser(nextUser);
  }
 };

 useEffect(() => {
  if (!token) {
   return;
  }

  if (isTokenExpired(token)) {
   logout();
  }
 }, [token]);

 const value = useMemo(
  () => ({
   token,
   user,
   isAuthenticated: Boolean(token),
   login,
   logout
  }),
  [token, user]
 );

 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
 const context = useContext(AuthContext);

 if (!context) {
  throw new Error("useAuth must be used inside AuthProvider");
 }

 return context;
};
