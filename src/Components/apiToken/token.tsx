export const API_BASE_URL = "http://localhost:3636"; 

export const registerUser = async (username: string, phone: string, password: string, confirmpassword : string) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, username, password,confirmpassword  }),
  });

  return response.json();
};

export const loginUser = async (phone: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, password }),
    credentials: "include", // برای ارسال کوکی شامل Refresh Token
  });

  return response.json();
};

export const refreshToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return response.json();
};
