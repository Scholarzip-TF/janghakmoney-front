// src/components/Modal/ModalPortal.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalPortal: React.FC<ModalProps> = ({ children, onClose }) => {
  // 오버레이 클릭 시 모달을 닫기 위한 핸들러
  const handleOverlayClick = () => {
    onClose();
  };

  // 모달 내부 클릭 시 이벤트 전파를 막아 오버레이 클릭이벤트가 발생하지 않도록 함
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return ReactDOM.createPortal(
    <CSSTransition
      in={true}            // 모달이 열릴 때 true (조건부 렌더링을 사용 중이므로)
      appear={true}        // 최초 등장 시 애니메이션 적용
      timeout={300}        // 애니메이션 지속시간 (밀리초)
      classNames="modal"   // CSS 클래스 접두사 (아래 CSS 예제 참고)
    >
      {/* 오버레이에 onClick 핸들러를 추가하여 배경 클릭 시 모달이 닫히도록 함 */}
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-header">
            {/*
              닫기 버튼에 aria-label 속성을 추가하여 접근성을 개선합니다.
              (스크린 리더 사용자가 버튼의 기능을 명확히 인지할 수 있음)
            */}
            <button className="close-button" onClick={onClose} aria-label="Close modal">×</button>
          </div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body // 프로덕션에서는 별도의 modal-root 요소를 사용하는 것도 고려할 수 있음.
  );
};

export default ModalPortal;