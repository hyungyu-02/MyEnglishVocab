import React, { useRef, useState } from 'react';
import styles from './AddWordForm.module.css';

interface AddWordFormProps {
  onAddWord: (
    term: string,
    definition: string,
    exampleSentence: string,
    meaningOfExampleSentence: string
  ) => Promise<void>;
}

const AddWordForm: React.FC<AddWordFormProps> = ({ onAddWord }) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [meaningOfExampleSentence, setMeaningOfExampleSentence] = useState('');
  const termInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 모든 입력 필드가 비어있지 않은지 확인
    if (
      !term.trim() ||
      !definition.trim() ||
      !exampleSentence.trim() ||
      !meaningOfExampleSentence.trim()
    )
      return;
    try {
      await onAddWord(term, definition, exampleSentence, meaningOfExampleSentence);
      // 추가 후 필드 초기화
      setTerm('');
      setDefinition('');
      setExampleSentence('');
      setMeaningOfExampleSentence('');
      // 단어 입력 필드에 포커스
      termInputRef.current?.focus();
    } catch (error) {
      console.error(error);
      alert('단어 추가 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '140px' }}>단어</th>
            <th style={{ width: '140px' }}>의미</th>
            <th style={{ width: '140px' }}>예문</th>
            <th style={{ width: '140px' }}>예문 뜻</th>
            <th style={{ width: '80px' }}>추가</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                ref={termInputRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className={styles.termInput}
                placeholder="단어 입력"
                aria-label="단어 입력"
              />
            </td>
            <td>
              <input
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                className={styles.defInput}
                placeholder="의미 입력"
                aria-label="의미 입력"
              />
            </td>
            <td>
              <input
                value={exampleSentence}
                onChange={(e) => setExampleSentence(e.target.value)}
                className={styles.defInput}
                placeholder="예문 입력"
                aria-label="예문 입력"
              />
            </td>
            <td>
              <input
                value={meaningOfExampleSentence}
                onChange={(e) => setMeaningOfExampleSentence(e.target.value)}
                className={styles.defInput}
                placeholder="예문 뜻 입력"
                aria-label="예문 뜻 입력"
              />
            </td>
            <td>
              <button type="submit" className={styles.button} aria-label="Add word">
                <img src="./add.svg" alt="Add" className={styles.addSVG} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default AddWordForm;