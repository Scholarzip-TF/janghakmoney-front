const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // 환경변수 사용

export const getScholarshipDetail = async (scholarshipId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scholarships/${scholarshipId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch scholarship detail");
    }

    return await response.json();
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
};
