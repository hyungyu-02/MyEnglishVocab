import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Profile } from '../types/Profile';

interface ProfileContextProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  setSelectedProfile: (profile: Profile) => void;
  addProfile: (profile: Profile) => void;
  logout: () => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // 백엔드에서 프로필 목록을 가져오기
    fetch('http://localhost:3001/profiles')
      .then((response) => response.json())
      .then((data: Profile[]) => setProfiles(data))
      .catch((error) => console.error(error));
  }, []);

  const addProfile = (profile: Profile) => {
    setProfiles((prev) => [...prev, profile]);
  };

  const logout = () => {
    setSelectedProfile(null);
  };

  return (
    <ProfileContext.Provider value={{ profiles, selectedProfile, setSelectedProfile, addProfile, logout }}>
      {children}
    </ProfileContext.Provider>
  );
};

// 커스텀 훅 생성
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};