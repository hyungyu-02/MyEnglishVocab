import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import WordListPage from './pages/WordListPage/WordListPage';
import QuizPage from './pages/QuizPage/QuizPage';

export const API_URL = 'http://localhost:3001/words';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/words" element={<WordListPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
