export interface CreateUserRequest {
    phone: string;
    universityName: string;
    majorRegionName: string;
    minorRegionName: string;
    incomeLevel: number;
    hasLivingExpenseScholarship: boolean;
    hasFullTuitionScholarship: boolean;
  }
  
  export interface CreateUserResponse {
    id: string;
    universityId: number;
    regionId: number;
    incomeLevel: number;
    hasFullTuitionScholarship: boolean;
    hasLivingExpenseScholarship: boolean;
    phone: string;
    createdAt: string;
    universityName: string;
    regionName: string;
  }

  export interface ScholarshipDetail {
    id: number;
    name: string;
    organization: string;
    description: string;
    applicationStartDate: string;
    applicationEndDate: string;
    note: string;
    type: 'TUITION' | string;
  }