export const API_BASE_URL = "http://localhost:5000"; 

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
  const response = await fetch(`/api/users?phone=${phone}&password=${password}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
  });

  const data = await response.json();


  if (data.length > 0) {
    return {
      accessToken: "fake-jwt-token", 
      user: {
        id: data[0].id,
        name: data[0].name,
        role: data[0].role,
      }
    };
  } else {
    return { error: "Invalid phone number or password." };
  }
};


export const refreshToken = async () => {
  const response = await fetch(`/api/users`, {
    method: "POST",
    credentials: "include",
  });

  return response.json();
};
export const checkUserExists = async (phone: string) => {
  try {
    const response = await fetch(`http://localhost:5000/users?phone=${phone}`);
    const data = await response.json();

    if (data.length > 0) {
      console.log("✅ یوزر در دیتابیس پیدا شد:", data[0]);
      return true;
    } else {
      console.log("❌ یوزر در دیتابیس پیدا نشد!");
      return false;
    }
  } catch (error) {
    console.error("🚨 خطا در بررسی یوزر:", error);
    return false;
  }
};
