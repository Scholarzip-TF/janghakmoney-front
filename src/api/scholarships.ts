// src/api/scholarships.ts
import { ScholarshipDetail, PossibleScholarshipRequest, PossibleScholarshipResponse } from '../types/api';

export const getScholarshipDetail = async (scholarshipId: number): Promise<ScholarshipDetail> => {
  try {
    const response = await fetch(`/api/scholarships/${scholarshipId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('Failed to fetch scholarship detail');
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch scholarship:', error);
    throw error;
  }
};

export const getPossibleScholarships = async (data: PossibleScholarshipRequest): Promise<PossibleScholarshipResponse[]> => {
  try {
    const response = await fetch('/api/scholarships/possible', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('Failed to fetch possible scholarships');
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch possible scholarships:', error);
    throw error;
  }
};