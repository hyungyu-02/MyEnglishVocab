import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../App';
import { Word } from '../../types/Word';

const MainPage: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setWords(data as Word[]))
      .catch(err => console.error(err));
  }, []);
  return (
    <div style={{ padding: '20px' }}>
      <h1>My English Vocabulary</h1>
      <p>단어 개수 : <strong>{words.length}</strong></p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/words">
          <button style={{ marginRight: '15px' }}>나의 단어장</button>
        </Link>
        <Link to="/quiz">
          <button>단어 테스트</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;