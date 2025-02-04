import React from 'react';
import { Word } from '../../../types/Word';
import styles from './ExampleModal.module.css';

interface ExampleModalProps {
  word: Word;
  onClose: () => void;
}

const ExampleModal: React.FC<ExampleModalProps> = ({ word, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{word.term}</h2>
        <p>
          <strong>의미:</strong> {word.definition}
        </p>
        <p>
          <strong>예문:</strong> {word.exampleSentence}
        </p>
        <p>
          <strong>예문 뜻:</strong> {word.meaningOfExampleSentence}
        </p>
        <button onClick={onClose} className={styles.closeButton}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ExampleModal;