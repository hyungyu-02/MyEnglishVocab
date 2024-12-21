import React from 'react';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  isEditing: boolean;
  onEditStart: () => void;
  onEditSave: () => void;
  isDeleting: boolean;
  onDeleteCancel: () => void;
}

const ActionEditButton: React.FC<ActionButtonsProps> = ({
  isEditing,
  onEditStart,
  onEditSave,
  isDeleting,
  onDeleteCancel
}) => {
  if (isEditing) {
    return (
        <button
        onClick={onEditSave}
        className={styles.button}
        type="button"
        aria-label="Save word"
        >
            <img src='./save.svg' alt='Save' className={styles.saveSVG} />
        </button>
    );
  } else if (isDeleting) {
    return (
        <button
        onClick={onDeleteCancel}
        className={styles.button}
        type="button"
        aria-label="Cancel delete"
        >
        <img src='./cancel.svg' alt='Cancel' className={styles.cancelSVG} />
        </button>
    );
  } else {
    return (
        <button
            onClick={onEditStart}
            className={styles.button}
            type="button"
            aria-label="Edit word"
        >
            <img src='./edit.svg' alt='Edit' className={styles.editSVG} />
        </button>
        
    );
  }
};

export default ActionEditButton;