import React, { useEffect, useState } from 'react';
import { Word } from '../../types/Word';
import { useProfile } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import styles from './QuizPage.module.css';
import HomeButton from '../../components/HomeButton/HomeButton';

const QuizPage: React.FC = () => {
  const { selectedProfile } = useProfile();
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProfile) {
      navigate('/');
      return;
    }

    fetch(`http://localhost:3001/words?profileId=${selectedProfile.id}`)
      .then(res => res.json())
      .then((data: Word[]) => {
        const shuffled = shuffleArray(data);
        setWords(shuffled);
      })
      .catch(err => console.error(err));
  }, [selectedProfile, navigate]);

  const handleDelete = async (id: string) => {
    try{
      const response = await fetch(`http://localhost:3001/words/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('단어 삭제 실패');
      setWords(prev => prev.filter(word => word.id !== id));
    } catch (error){
      console.error(error);
      alert('단어 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleShowDefinition = () => {
    setShowDefinition(true);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < words.length) {
      setCurrentIndex(nextIndex);
      setShowDefinition(false);
    } else {
      alert("테스트가 끝났습니다.");
      navigate('/main'); // 모든 단어를 다 봤으니 메인 페이지로 이동
    }
  };

  if (words.length === 0) {
    return (
      <div className={styles.container}>
        <h2>단어를 불러오는 중...</h2>
        <HomeButton />
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className={styles.container}>
      <h2>단어 퀴즈</h2>
      <HomeButton />
      <h4>{currentIndex + 1} / {words.length}</h4>
      <div className={styles.quizArea}>
        <p><strong>단어:</strong> {currentWord.term}</p>
        {showDefinition && (
          <p><strong>뜻:</strong> {currentWord.definition}</p>
        )}
      </div>

      <div className={styles.buttons}>
        {showDefinition ? (
          <button className={styles.nextButton} onClick={handleNext}>다음</button>
        ) : (
          <button className={styles.showDefButton} onClick={handleShowDefinition}>뜻 보기</button>
        )}
        <button className={styles.skipButton} onClick={handleNext}>넘기기</button>
      </div>
      
      <button
        onClick={() => {
          if (window.confirm('정말로 이 단어를 삭제하시겠습니까?')){
            handleDelete(currentWord.id);
          }
        }}
        className={styles.deleteButton}
        type="button"
        aria-label="Delete word"
      >
        <img src='./delete.svg' alt='Delete' className={styles.deleteSVG} />
      </button>
    </div>
  );
};

// Fisher-Yates Shuffle 알고리즘
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default QuizPage;