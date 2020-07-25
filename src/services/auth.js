export const TOKEN_KEY = "@chatapp-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const signin = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const signout = (token) => {
  localStorage.removeItem(TOKEN_KEY);
};
