// src/pages/Result/Result.tsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import './Result.css';
import { IScholarship } from '../../data/scholarships';
import { getScholarshipDetail, getPossibleScholarships } from '../../api/scholarships';
import { ScholarshipDetail, PossibleScholarshipResponse } from '../../types/api';
import ModalPortal from '../../components/Modal/ModalPortal'; // Portal 컴포넌트 import

export const Result = () => {
  const location = useLocation();

  // ----- 목록(지원 가능한 장학금) 관련 상태 분리 -----
  const [possibleScholarships, setPossibleScholarships] = useState<PossibleScholarshipResponse[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  // ----- 모달(장학금 상세 정보) 관련 상태 분리 -----
  const [selectedScholarship, setSelectedScholarship] = useState<IScholarship | null>(null);
  const [scholarshipDetail, setScholarshipDetail] = useState<ScholarshipDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // 사용자 데이터를 기반으로 지원 가능한 장학금 목록을 fetch하는 useEffect
  useEffect(() => {
    const fetchPossibleScholarships = async () => {
      setListLoading(true);
      setListError(null);
      try {
        console.log('Location object:', location); // 디버그 로그
        if (!location.state) {
          setListError('사용자 정보를 찾을 수 없습니다. 설문을 다시 진행해주세요.');
          setListLoading(false);
          return;
        }

        const userData = location.state;
        console.log('User Data from location:', userData); // 디버그 로그

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
        setListError('지원 가능한 장학금 목록을 불러오는데 실패했습니다.');
      } finally {
        setListLoading(false);
      }
    };

    fetchPossibleScholarships();
  }, [location]);

  // 장학금 카드를 클릭하면 해당 상세 정보를 fetch하는 함수
  const handleScholarshipClick = async (scholarship: IScholarship) => {
    setSelectedScholarship(scholarship);
    setDetailLoading(true);
    setDetailError(null);
    try {
      const detail = await getScholarshipDetail(scholarship.id);
      setScholarshipDetail(detail);
    } catch (err) {
      console.error('Failed to fetch scholarship detail:', err);
      setDetailError('장학금 상세 정보를 불러오는데 실패했습니다.');
    } finally {
      setDetailLoading(false);
    }
  };

  // 모달 닫기 시 관련 상태를 초기화
  const handleCloseModal = () => {
    setSelectedScholarship(null);
    setScholarshipDetail(null);
    setDetailError(null);
  };

  return (
    <>
      <Header />
      <div className="result-page">
        {/* 목록 영역: 로딩, 에러, 혹은 목록 출력 */}
        {listLoading ? (
          <div>로딩 중...</div>
        ) : listError ? (
          <div className="error-message">{listError}</div>
        ) : (
          <div className="scholarship-list">
            {possibleScholarships.map((scholarship) => (
              <div 
                key={scholarship.id} 
                className="scholarship-card"
                // 장학금 클릭 시 상세 정보 fetch 호출
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
                    <span className="label">지원 유형</span>
                    <span>{scholarship.type === 'TUITION' ? '등록금' : '생활비'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 모달 영역: 선택된 장학금이 있을 때 상세 정보 표시 */}
        {selectedScholarship && (
          <ModalPortal onClose={handleCloseModal}>
            {detailLoading ? (
                null
            ) : detailError ? (
              <div className="error-message">{detailError}</div>
            ) : scholarshipDetail ? (
              <div className="scholarship-detail">
                <h2>{scholarshipDetail.name}</h2>
                <div className="detail-row">
                  <span className="label">운영기관</span>
                  <span>{scholarshipDetail.organization}</span>
                </div>
                <div className="detail-row">
                  <span className="label">지원 내용</span>
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
                  <span className="label">지원 유형</span>
                  <span>{scholarshipDetail.type === 'TUITION' ? '등록금' : '생활비'}</span>
                </div>
              </div>
            ) : null}
          </ModalPortal>
        )}
      </div>
    </>
  );
};