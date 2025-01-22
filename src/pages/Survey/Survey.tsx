import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header/Header';
import './Survey.css';

export const Survey = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/result');
    }
  };

  return (
    <>
      <Header />
      <div className="survey-page">
        <div className="survey-container">
          <div className="progress-bar">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step} 
                className={`progress-dot ${step <= currentStep ? 'active' : ''}`} 
              />
            ))}
          </div>

          <div className="survey-content">
            {currentStep === 1 && (
              <>
                <h2>거주하시는 지역을 선택해주세요</h2>
                <div className="options-container">
                  <button className="option-button">서울특별시</button>
                  <button className="option-button">경기도</button>
                  <button className="option-button">인천광역시</button>
                  <button className="option-button">부산광역시</button>
                  <button className="option-button">기타 지역</button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2>소득분위를 선택해주세요</h2>
                <div className="options-container">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <button key={level} className="option-button">
                      {level}분위
                    </button>
                  ))}
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2>소속 대학을 선택해주세요</h2>
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="대학명을 입력하세요"
                  />
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2>현재 받고 계신 장학금을 선택해주세요</h2>
                <div className="options-container vertical">
                  <label className="checkbox-option">
                    <input type="checkbox" />
                    <span>등록금 장학금 전액 수혜 중</span>
                  </label>
                  <label className="checkbox-option">
                    <input type="checkbox" />
                    <span>생활비 장학금 수혜 중</span>
                  </label>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <h2>전화번호를 입력해주세요</h2>
                <div className="input-container">
                  <input
                    type="tel"
                    className="phone-input"
                    placeholder="'-' 없이 입력해주세요"
                  />
                  <label className="checkbox-option">
                    <input type="checkbox" />
                    <span>개인정보 수집 및 이용에 동의합니다</span>
                  </label>
                </div>
              </>
            )}
          </div>

          <div className="button-container">
            <Button 
              size="large" 
              onClick={handleNext}
              fullWidth
            >
              {currentStep === 5 ? '완료' : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};