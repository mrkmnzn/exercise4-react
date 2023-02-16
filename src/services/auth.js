import http from "./http";

export function register(name, username, password) {
  return http.post("/users", { name, username, password });
}

export function login(username, password) {
  return http.post("/auth", { username, password });
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function logout() {
  localStorage.removeItem("accessToken");
}
