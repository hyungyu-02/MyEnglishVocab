import React from 'react';
import { Word } from '../../types/Word';
import styles from './ShowWords.module.css';
import ActionEditButton from '../ActionButtons/ActionEditButton';
import ActionDelButton from '../ActionButtons/ActionDelButton';

interface ShowWordsProps {
  words: Word[];
  editingId: string | null;
  editingTerm: string;
  editingDefinition: string;
  onDelete: (id: string) => void;
  onDeleteStart: (id: string) => void;
  deletingId: string | null;
  onEditStart: (word: Word) => void;
  onEditTermChange: (value: string) => void;
  onEditDefinitionChange: (value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onDeleteCancel: () => void;
}

const ShowWords: React.FC<ShowWordsProps> = ({
  words,
  editingId,
  editingTerm,
  editingDefinition,
  onDelete,
  onDeleteStart,
  deletingId,
  onEditStart,
  onEditTermChange,
  onEditDefinitionChange,
  onEditSave,
  onEditCancel,
  onDeleteCancel
}) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEditSave();
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.termCol}>단어</th>
          <th className={styles.definitionCol}>의미</th>
          <th className={styles.levelCol}>레벨</th>
          <th className={styles.actionCol}>수정</th>
          <th className={styles.actionCol}>삭제</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {words.map((word) => {
          const isEditing = editingId === word.id;
          const isDeleting = deletingId === word.id;

          return (
            <tr key={word.id}>
              {/* Term Column */}
              <td className={styles.termCol} data-label="단어">
                {isEditing ? (
                  <input
                    value={editingTerm}
                    onChange={(e) => onEditTermChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.input}
                    autoFocus
                    aria-label="Edit term"
                  />
                ) : (
                  word.term
                )}
              </td>

              {/* Definition Column */}
              <td className={styles.definitionCol} data-label="의미">
                {isEditing ? (
                  <input
                    value={editingDefinition}
                    onChange={(e) => onEditDefinitionChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.input}
                    aria-label="Edit definition"
                  />
                ) : (
                  word.definition
                )}
              </td>

              <td className={styles.levelCol} data-label="레벨">
                {word.level}
              </td>

              {/* Edit/Save Column */}
              <td className={styles.actionCol} data-label="수정">
                <ActionEditButton
                  isEditing={isEditing}
                  onEditStart={() => onEditStart(word)}
                  onEditSave={onEditSave}
                  isDeleting={isDeleting}
                  onDeleteCancel={onDeleteCancel}
                />
              </td>

              {/* Delete/Cancel Column */}
              <td className={styles.actionCol} data-label="삭제">
                <ActionDelButton
                  isEditing={isEditing}
                  onDelete={() => onDelete(word.id)}
                  onDeleteStart={() => onDeleteStart(word.id)}
                  isDeleting={isDeleting}
                  onEditCancel={onEditCancel}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ShowWords;