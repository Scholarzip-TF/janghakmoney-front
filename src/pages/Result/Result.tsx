import { useState, useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import './Result.css';
import { IScholarship, scholarships } from '../../data/scholarships';
import { getScholarshipDetail } from '../../api/scholarships';
import { ScholarshipDetail } from '../../types/api';

export const Result = () => {
  const [selectedScholarship, setSelectedScholarship] = useState<IScholarship | null>(null);
  const [scholarshipDetail, setScholarshipDetail] = useState<ScholarshipDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleScholarshipClick = async (scholarship: IScholarship) => {
    setSelectedScholarship(scholarship);
    setIsLoading(true);
    setError(null);
    
    try {
      const detail = await getScholarshipDetail(scholarship.id);
      setScholarshipDetail(detail);
    } catch (err) {
      setError('장학금 상세 정보를 불러오는데 실패했습니다.');
      console.error('Failed to fetch scholarship detail:', err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleCloseModal = () => {
    setSelectedScholarship(null);
    setScholarshipDetail(null);
    setError(null);
  };

  return (
    <>
      <Header />
      <div className="result-page">
        <div className="scholarship-list">
          {scholarships.map((scholarship) => (
            <div 
              key={scholarship.id} 
              className="scholarship-card"
              onClick={() => handleScholarshipClick(scholarship)}
            >
              <h3>{scholarship.title}</h3>
              <div className="scholarship-info">
                <div className="info-row">
                  <span className="label">운영기관명</span>
                  <span>{scholarship.organization}</span>
                </div>
                <div className="info-row">
                  <span className="label">모집 상태</span>
                  <span className="status">{scholarship.status}</span>
                </div>
                <div className="info-row">
                  <span className="label">지원내용</span>
                  <span>{scholarship.amount}</span>
                </div>
                <div className="info-row">
                  <span className="label">모집종료일</span>
                  <span>{scholarship.deadline}</span>
                </div>
                {scholarship.note && (
                  <div className="info-row">
                    <span className="label">비고</span>
                    <span>{scholarship.note}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedScholarship && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <button className="close-button" onClick={handleCloseModal}>×</button>
              </div>
              <div className="modal-content">
                {isLoading && <div>로딩 중...</div>}
                {error && <div className="error-message">{error}</div>}
                {scholarshipDetail && (
                  <div className="scholarship-detail">
                    <h2>{scholarshipDetail.name}</h2>
                    <div className="detail-row">
                      <span className="label">운영기관</span>
                      <span>{scholarshipDetail.organization}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">설명</span>
                      <span>{scholarshipDetail.description}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">신청 기간</span>
                      <span>
                        {scholarshipDetail.applicationStartDate} ~ {scholarshipDetail.applicationEndDate}
                      </span>
                    </div>
                    {scholarshipDetail.note && (
                      <div className="detail-row">
                        <span className="label">비고</span>
                        <span>{scholarshipDetail.note}</span>
                      </div>
                    )}
                    <div className="detail-row">
                      <span className="label">장학금 유형</span>
                      <span>{scholarshipDetail.type === 'TUITION' ? '등록금' : scholarshipDetail.type}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};