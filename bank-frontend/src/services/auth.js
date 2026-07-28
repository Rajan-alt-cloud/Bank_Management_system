import API_BASE_URL from "./api";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!response.ok) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      return null;
    }

    const data = await response.json();

    localStorage.setItem("access", data.access);

    return data.access;
  } catch (error) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    return null;
  }
};
