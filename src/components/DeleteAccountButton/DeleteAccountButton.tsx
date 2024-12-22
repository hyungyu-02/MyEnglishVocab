import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import styles from './DeleteAccountButton.module.css';

const DeleteAccountButton: React.FC = () => {
  const { selectedProfile, deleteProfile } = useProfile();

  const handleDelete = () => {
    if (!selectedProfile) return;

    if (window.confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteProfile(selectedProfile.id);
    }
  };

  return (
    <button onClick={handleDelete} className={styles.deleteAccountButton} aria-label="계정 삭제">
      계정 삭제
    </button>
  );
};

export default DeleteAccountButton;