const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // 환경변수 사용

export const createUser = async (userData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  } catch (error) {
    console.error("사용자 생성 API 호출 오류:", error);
    throw error;
  }
};
