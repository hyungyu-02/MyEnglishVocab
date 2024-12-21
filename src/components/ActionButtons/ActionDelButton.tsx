import React from 'react';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  isEditing: boolean;
  onEditCancel: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  onDeleteStart: () => void;
}

const ActionDelButton: React.FC<ActionButtonsProps> = ({
  isEditing,
  onEditCancel,
  onDelete,
  isDeleting,
  onDeleteStart
}) => {
  if (isEditing) {
    return (
        <button
        onClick={onEditCancel}
        className={styles.button}
        type="button"
        aria-label="Cancel editing"
        >
            <img src='./cancel.svg' alt='Cancel' className={styles.cancelSVG} />
        </button>
    );
  } else if (isDeleting) {
    return (
        <button
          onClick={onDelete}
          className={styles.deleteButton}
          type="button"
          aria-label="Confirm delete"
        >
          <img src='./delete.svg' alt='Delete' className={styles.deleteSVG} />
        </button>
    );
  } else {
    return (
        <button
          onClick={onDeleteStart}
          className={styles.button}
          type="button"
          aria-label="Delete word"
        >
          <img src='./delete.svg' alt='Delete' className={styles.deleteSVG} />
        </button>
    );
  }
};

export default ActionDelButton;