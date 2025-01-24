export interface Location {
    sido: string;
    sigungu: string[];
  }
  
  export const locations: Location[] = [
    {
      sido: "강원도",
      sigungu: ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", /* ... */]
    },
    {
      sido: "경기도",
      sigungu: ["고양시", "과천시", "광명시", "광주시", "구리시", /* ... */]
    },
  ];