import { Link } from 'react-router-dom'
import styles from './homeButton.module.css';
import React from 'react';

const HomeButton: React.FC = () => {
  return (
    <Link to="/">
        <button className={styles.buttonToMain}>
            <img src='/home.svg' alt='homeSVG' className={styles.homeSVG}/>
        </button>
    </Link>
  )
}

export default HomeButton;
