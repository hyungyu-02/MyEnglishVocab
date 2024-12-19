import React from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>My English Vacabulary</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/words">
          <button style={{ marginRight: '15px' }}>단어 리스트</button>
        </Link>
        <Link to="/quiz">
          <button>단어 테스트</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;