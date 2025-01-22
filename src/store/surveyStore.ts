import { create } from 'zustand';


interface SurveyState {
  // 설문 응답 데이터
  responses: {
    region?: string;
    schoolLevel?: string;
    targetScholarship?: string[];
    phoneNumber?: string;
    marketingConsent?: boolean;
  };
  // 액션
  setResponse: (field: string, value: any) => void;
  resetResponses: () => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  responses: {},
  setResponse: (field, value) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [field]: value,
      },
    })),
  resetResponses: () => set({ responses: {} }),
}));