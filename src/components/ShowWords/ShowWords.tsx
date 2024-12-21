import React from 'react';
import { Word } from '../../types/Word';
import styles from './ShowWords.module.css';

interface ShowWordsProps {
    words: Word[];
    editingId: number | null;
    editingTerm: string;
    editingDefinition: string;
    onDelete: (id: number) => void;
    onDeleteStart: (id: number) => void;
    deletingId: number | null;
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
                    <th className={styles.actionCol}>수정</th>
                    <th className={styles.actionCol}>삭제</th>
                </tr>
            </thead>
            <tbody className={styles.tableBody}>
                {words.map((word) => {
                    const isEditing = editingId === word.id;
                    const isDeleting = deletingId === word.id;
                    let editButton;
                    let deleteButton;
                    if (isEditing) {
                        editButton = (
                            <button onClick={onEditSave} className={styles.button} type="button" >
                                <img src='./save.svg' alt='Save' className={styles.saveSVG} />
                            </button>
                        );
                        deleteButton = (
                          <button
                            onClick={onEditCancel}
                            className={styles.button}
                            type="button"
                          >
                            <img src='./cancel.svg' alt='Cancel' className={styles.cancelSVG} />
                          </button>
                        );
                    }else if (isDeleting) {
                        editButton = (
                            <button onClick={onDeleteCancel} className={styles.button} type="button" >
                                <img src='./cancel.svg' alt='Cancel' className={styles.cancelSVG} />
                            </button>
                        );
                        deleteButton = (
                          <button
                            onClick={() => onDelete(word.id)}
                            className={styles.deleteButton}
                            type="button"
                          >
                            <img src='./delete.svg' alt='Delete' className={styles.deleteSVG} />
                          </button>
                        );
                    } else {
                        editButton = (
                            <button onClick={() => onEditStart(word)} className={styles.button} type="button" >
                                <img src='./edit.svg' alt='Edit' className={styles.editSVG} />
                            </button>
                        );
                        deleteButton = (
                          <button
                            onClick={() => onDeleteStart(word.id)}
                            className={styles.button}
                            type="button"
                          >
                            <img src='./delete.svg' alt='DeleteCheck' className={styles.deleteSVG} />
                          </button>
                        );
                    }
                    
                    return (
                        <tr key={word.id}>
                          {/* Term Column */}
                          <td className={styles.termCol}>
                            {isEditing ? (
                              <input
                                value={editingTerm}
                                onChange={(e) => onEditTermChange(e.target.value)}
                                onKeyDown={handleKeyDown} // Enter 키 핸들러 추가
                                className={styles.input}
                                autoFocus
                              />
                            ) : (
                              word.term
                            )}
                          </td>
            
                          {/* Definition Column */}
                          <td className={styles.definitionCol}>
                            {isEditing ? (
                              <input
                                value={editingDefinition}
                                onChange={(e) => onEditDefinitionChange(e.target.value)}
                                onKeyDown={handleKeyDown} // Enter 키 핸들러 추가
                                className={styles.input}
                              />
                            ) : (
                              word.definition
                            )}
                          </td>
            
                          {/* Edit/Save Column */}
                          <td className={styles.actionCol}>

                            {editButton}
                            
                            {/* {isEditing ? (
                                <button
                                    onClick={onEditSave}
                                    className={styles.button}
                                    type="button"
                                >
                                    <img src='./save.svg' alt='Save' className={styles.saveSVG} />
                                </button>
                            ) : (
                              <button
                                onClick={() => onEditStart(word)}
                                className={styles.button}
                                type="button"
                              >
                                <img src='./edit.svg' alt='Edit' className={styles.editSVG} />
                              </button>
                            )} */}
                          </td>
            
                          {/* Delete/Cancel Column */}
                          <td className={styles.actionCol}>
                            {deleteButton}
                            {/* {isEditing ? (
                                <button
                                    onClick={onEditCancel}
                                    className={styles.button}
                                    type="button"
                                >
                                    <img src='./cancel.svg' alt='Cancel' className={styles.cancelSVG} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => onDelete(word.id)}
                                    className={styles.button}
                                    type="button"
                                >
                                    <img src='./delete.svg' alt='Delete' className={styles.deleteSVG} />
                                </button>
                            )} */}
                          </td>
                        </tr>
                      );
                })}
            </tbody>
        </table>
    )
}

export default ShowWords;