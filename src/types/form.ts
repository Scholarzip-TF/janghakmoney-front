export interface SurveyForm {
    region: {
      sido: string;
      sigungu: string;
    };
    incomeLevel: number | null;
    university: string;
    otherUniversity?: string;
    scholarships: {
      tuitionFull: boolean;
      livingExpenses: boolean;
    };
    phoneNumber: string;
    agreement: boolean;
  }
  
  export type Step = 1 | 2 | 3 | 4 | 5;