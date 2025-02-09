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
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={300}
        classNames="modal"
      >
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-header">
            <button className="close-button" onClick={onClose} aria-label="Close modal">
              ×
            </button>
          </div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </CSSTransition>
    </div>,
    document.body
  );
};

export default ModalPortal;