import jwtDecode from "jwt-decode";
import { TOKEN } from "./constats";

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const isTokenExpired = (token) => {
  const decoToken = jwtDecode(token);
  const expireData = decoToken.exp * 1000;
  const currentDate = new Date().getTime();
  if (currentDate > expireData) return true;
  return false;
};
