import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Loader />
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
    
  );
}
