import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css';

const LogoutButton: React.FC = () => {
  const { logout } = useProfile();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    navigate('/'); // 프로필 선택 화면으로 이동
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton} aria-label="로그아웃">
      로그아웃
    </button>
  );
};

export default LogoutButton;