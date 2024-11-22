import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
