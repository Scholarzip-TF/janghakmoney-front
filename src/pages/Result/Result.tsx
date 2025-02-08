// src/pages/Result/Result.tsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import './Result.css';
import { IScholarship } from '../../data/scholarships';
import { getScholarshipDetail, getPossibleScholarships } from '../../api/scholarships';
import { ScholarshipDetail, PossibleScholarshipResponse } from '../../types/api';

export const Result = () => {
  const location = useLocation();
  const [selectedScholarship, setSelectedScholarship] = useState<IScholarship | null>(null);
  const [scholarshipDetail, setScholarshipDetail] = useState<ScholarshipDetail | null>(null);
  const [possibleScholarships, setPossibleScholarships] = useState<PossibleScholarshipResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Fetch possible scholarships based on user data from location state
  useEffect(() => {
    const fetchPossibleScholarships = async () => {
      setIsLoading(true);
      try {
        console.log('Location object:', location); // Debugging log
        if (!location.state) {
          setError('사용자 정보를 찾을 수 없습니다. 설문을 다시 진행해주세요.');
          setIsLoading(false);
          return;
        }

        const userData = location.state;
        console.log('User Data from location:', userData); // Debugging log

        const requestData = {
          regionId: userData.regionId,
          universityId: userData.universityId,
          incomeLevel: userData.incomeLevel,
          hasFullTuition: userData.hasFullTuitionScholarship,
          hasScholarship: userData.hasLivingExpenseScholarship,
          phoneNumber: userData.phone,
        };

        console.log('Request Data:', requestData);
        const scholarships = await getPossibleScholarships(requestData);
        setPossibleScholarships(scholarships);
      } catch (err) {
        console.error('Error details:', err);
        setError('지원 가능한 장학금 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPossibleScholarships();
  }, [location]);

  // Open modal when a scholarship is selected
  useEffect(() => {
    if (selectedScholarship) {
      handleOpenModal();
    }
  }, [selectedScholarship]);

  // Handle scholarship card click
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

  // Open modal and save scroll position
  const handleOpenModal = () => {
    setScrollPosition(window.scrollY);
  };

  // Close modal and restore scroll position
  const handleCloseModal = () => {
    window.scrollTo(0, scrollPosition);
    setSelectedScholarship(null);
    setScholarshipDetail(null);
    setError(null);
  };

  return (
    <>
      <Header />
      <div className="result-page">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="scholarship-list">
            {possibleScholarships.map((scholarship) => (
              <div 
                key={scholarship.id} 
                className="scholarship-card"
                onClick={() => handleScholarshipClick({
                  id: scholarship.id,
                  title: scholarship.name,
                  organization: scholarship.organization,
                  status: "모집 중",
                  amount: "", // API 응답에 없는 필드
                  deadline: scholarship.applicationEndDate,
                  link: "" // API 응답에 없는 필드
                })}
              >
                <h3>{scholarship.name}</h3>
                <div className="scholarship-info">
                  <div className="info-row">
                    <span className="label">운영기관명</span>
                    <span>{scholarship.organization}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">신청기간</span>
                    <span>{scholarship.applicationStartDate} ~ {scholarship.applicationEndDate}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">유형</span>
                    <span>{scholarship.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
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
      </div>
    </>
  );
};