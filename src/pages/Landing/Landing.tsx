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
            <p className="hero-description">무료로 장학금 정보를 받아보세요</p>
            <Button 
              size="large" 
              onClick={handleStartSurvey}
            >
              장학금 찾아보기
            </Button>
          </div>
        </div>

        <div className="info-section">
          <div className="info-container">
            <div className="info-card">
              <h2>맞춤형 장학금 정보</h2>
              <p>전화번호/이메일 등 수집하여 마케팅 수단 확보</p>
            </div>

            <div className="info-card">
              <h2>합리적인 비용</h2>
              <p>월 30,000원 이내 비용으로 장학금 정보를 받아보세요</p>
            </div>

            <div className="info-card">
              <h2>빠른 정보 업데이트</h2>
              <p>새로운 장학금 정보를 실시간으로 받아보세요</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};