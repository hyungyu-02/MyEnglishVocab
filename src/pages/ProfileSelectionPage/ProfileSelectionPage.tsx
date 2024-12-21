import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import styles from './ProfileSelectionPage.module.css';

const ProfileSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { profiles, setSelectedProfile } = useProfile();

  const handleProfileSelect = (profileId: number) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setSelectedProfile(profile);
      navigate('/main');
    }
  };

  return (
    <div className={styles.container}>
      <h2>프로필 선택</h2>
      <div className={styles.profileList}>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <button
              key={profile.id}
              className={styles.profileButton}
              onClick={() => handleProfileSelect(profile.id)}
            >
              {profile.name}
            </button>
          ))
        ) : (
          <p>프로필이 없습니다. 새 프로필을 생성해주세요.</p>
        )}
      </div>
      <button
        className={styles.createButton}
        onClick={() => navigate('/create-profile')}
      >
        새 프로필 만들기
      </button>
    </div>
  );
};

export default ProfileSelectionPage;