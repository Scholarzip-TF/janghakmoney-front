import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout/Layout';
import { Header } from '../../components/Header/Header';
import './Landing.css';

export const Landing = () => {
  const navigate = useNavigate();

  const handleStartSurvey = () => {
    navigate('/survey');
  };

  return (
    <Layout>
      <Header />
      <div className="landing">
        <div className="hero-section">
          <div className="hero-content">
            <p className="hero-description">내게 맞는 장학금을 찾아보세요!</p>
            <Button 
              size="large" 
              onClick={handleStartSurvey}
            >
              10초만에 확인하기
            </Button>
          </div>
        </div>

        <div className="info-section">
          <div className="info-container">
            <div className="info-card">
              <h2>맞춤형 장학금</h2>
              <p>소득, 대학 등의 정보를 토대로 필터링된 정보를 제공합니다.</p>
            </div>

            <div className="info-card">
              <h2>최신 장학정보</h2>
              <p>4개월 이전 마감된 장학금까지 보여드려요!</p>
            </div>

            <div className="info-card">
              <h2>무료 정보 제공</h2>
              <p>장학금 세부 정보까지, 언제든지 무료로 찾아보세요</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};