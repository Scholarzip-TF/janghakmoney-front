export interface IScholarship {
    id: number;
    title: string;
    organization: string;
    status: string;
    amount: string;
    deadline: string;
    note?: string;
    link: string;
  }
  
  export const scholarships: IScholarship[] = [
    {
      id: 1,
      title: "두산연강재단 대학 장학생",
      organization: "두산연강재단",
      status: "모집 중",
      amount: "4,000,000원",
      deadline: "2023.11.15",
      link: "https://www.yonka..."
    }
  ];