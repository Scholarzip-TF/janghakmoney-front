const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // 환경변수 적용

// 장학금 목록 조회
export const getScholarships = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scholarships`);

    if (!response.ok) {
      throw new Error(`Failed to fetch scholarships. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 호출 오류 (getScholarships):", error);
    throw error;
  }
};

// 특정 장학금 상세 정보 조회
export const getScholarshipDetail = async (scholarshipId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scholarships/${scholarshipId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch scholarship detail. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API 호출 오류 (getScholarshipDetail, ID: ${scholarshipId}):`, error);
    throw error;
  }
};

// 가능한 장학금 조회 (POST 요청)
export const getPossibleScholarships = async (requestData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scholarships/possible`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch possible scholarships. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 호출 오류 (getPossibleScholarships):", error);
    throw error;
  }
};
