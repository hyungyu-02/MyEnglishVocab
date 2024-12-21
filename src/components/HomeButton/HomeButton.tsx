import { Link } from 'react-router-dom';
import styles from './HomeButton.module.css';
import React from 'react';

const HomeButton: React.FC = () => {
  return (
    <Link to="/main">
        <button className={styles.buttonToMain} aria-label="홈으로 이동">
            <img src='/home.svg' alt='Home' className={styles.homeSVG}/>
        </button>
    </Link>
  )
}

export default HomeButton;