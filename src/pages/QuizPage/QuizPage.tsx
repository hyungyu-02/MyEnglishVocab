import React, { useEffect, useState } from 'react';
import { Word } from '../../types/Word';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../App';
import styles from './QuizPage.module.css';
import HomeButton from '../../components/HomeButton/HomeButton';


const QuizPage: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then((data: Word[]) => {
        const shuffled = shuffleArray(data);
        setWords(shuffled);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id: number) => {
    try{
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete word');
        setWords(prev => prev.filter(word => word.id !== id));
    } catch (error){
        console.error(error);
    }
  };

  const handleShowDefinition = () => {
    setShowDefinition(true);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < words.length) {
      setCurrentIndex(nextIndex);
      setShowDefinition(false); // 다음 단어로 넘어갈 때 정의 숨기기
    } else {
      alert("테스트가 끝났습니다.");
      // deleteIdList.forEach(id => handleDelete(id));
      navigate('/');// 모든 단어를 다 봤으니 메인 페이지로 이동
    }
  };

  if (words.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>단어를 불러오는 중...</h2>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className={styles.container}>
      <h2>단어 퀴즈</h2>
      <HomeButton />
      <h4>{currentIndex+1} / {words.length}</h4>
      <div className={styles.quizArea}>
        <p><strong>단어:</strong> {currentWord.term}</p>
        {showDefinition && (
          <p><strong>뜻:</strong> {currentWord.definition}</p>
        )}
      </div>

      <div>
        {showDefinition ? (
          <button className={styles.nextButton} onClick={handleNext}>다음</button>
        ) : (
          <button className={styles.showDefButton} onClick={handleShowDefinition}>뜻 보기</button>
        )}
        <button className={styles.swipeButton} onClick={handleNext}>넘기기</button>
      </div>
      
      <button
          onClick={() => {
            if (window.confirm('정말로 이 단어를 삭제하시겠습니까?')){
              handleDelete(currentWord.id);
            }
          }}
          className={styles.deleteButton}
          type="button"
      >
          <img src='./delete.svg' alt='Delete' className={styles.deleteSVG} />
      </button>
    </div>
  );
};

export default QuizPage;

// Fisher-Yates Shuffle 알고리즘
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}