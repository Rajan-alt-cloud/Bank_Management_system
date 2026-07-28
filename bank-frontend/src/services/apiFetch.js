import API_BASE_URL from "./api";
import { refreshAccessToken } from "./auth";

const apiFetch = async (endpoint, options = {}) => {
  let accessToken = localStorage.getItem("access");

  const makeRequest = async (token) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  };

  let response = await makeRequest(accessToken);

  // Access token expired
  if (response.status === 401) {
    accessToken = await refreshAccessToken();

    // Refresh token invalid/expired
    if (!accessToken) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      window.location.href = "/login";

      return null;
    }

    // New access token ke saath request dobara
    response = await makeRequest(accessToken);
  }

  return response;
};

export default apiFetch;
