import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import styles from './CreateProfilePage.module.css';

const CreateProfilePage: React.FC = () => {
  const [profileName, setProfileName] = useState('');
  const navigate = useNavigate();
  const { addProfile } = useProfile();

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profileName.trim() === '') {
      alert('프로필 이름을 입력해주세요.');
      return;
    }

    const newProfile = {
      name: profileName.trim(),
    };

    try {
      const response = await fetch('http://localhost:3001/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile),
      });

      if (!response.ok) throw new Error('프로필 생성 실패');

      const createdProfile = await response.json();
      addProfile(createdProfile);
      navigate('/main');
    } catch (error) {
      console.error(error);
      alert('프로필 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>새 프로필 만들기</h2>
      <form onSubmit={handleCreateProfile} className={styles.form}>
        <label htmlFor="profileName">프로필 이름:</label>
        <input
          type="text"
          id="profileName"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          className={styles.input}
          required
          placeholder="이름을 입력해주세요"
          aria-label="프로필 이름 입력"
        />
        <button type="submit" className={styles.submitButton}>
          만들기
        </button>
      </form>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        돌아가기
      </button>
    </div>
  );
};

export default CreateProfilePage;