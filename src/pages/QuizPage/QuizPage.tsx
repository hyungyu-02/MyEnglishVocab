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
    setShowDefinition(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleMarkAsLearned = async () => {
    if (currentIndex >= words.length) return;
    const word = words[currentIndex];

    try {
      const updatedWord = { ...word, level: word.level + 1 };

      const response = await fetch(`http://localhost:3001/words/${word.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWord),
      });

      if (!response.ok) throw new Error('Level 업데이트 실패');

      // 단어 목록 업데이트
      setWords((prev) =>
        prev.map((w) => (w.id === word.id ? updatedWord : w))
      );

      alert(`"${word.term}"의 레벨이 ${word.level + 1}로 증가했습니다.`);
    } catch (error) {
      console.error(error);
      alert('단어 레벨 업데이트 중 오류가 발생했습니다.');
    }

    handleNext();
  };

  if (words.length === 0) {
    return (
      <div className={styles.container}>
        <h2>단어를 불러오는 중...</h2>
        <HomeButton />
      </div>
    );
  }

  if(currentIndex >= words.length){
    return (
      <div className={styles.container}>
        <h2>테스트가 끝났습니다!</h2>
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
          <>
            <p><strong>뜻:</strong> {currentWord.definition}</p>
            <button
              onClick={handleMarkAsLearned}
              className={styles.learnedButton}
              aria-label="외웠습니다"
            >
              <img src='./correct.svg' alt='외웠습니다' className={styles.correctSVG} />
            </button>
          </>
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