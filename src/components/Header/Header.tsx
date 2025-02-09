import logo from '../../assets/icons/logo.png';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <a href="/" className="logo-link">
        <div className="header-content">
          <img src={logo} alt="로고" className="logo" />
          <h1>내 장학금 알아보기</h1>
        </div>
      </a>
    </header>
  );
};