import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import App from './App.tsx';
import LandingPage from './components/LandingPage';
import DocumentationPage from './components/DocumentationPage';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Get base path from Vite config (for GitHub Pages deployment)
// In dev mode, this will be '/design-system-tokens_UI_components/' or empty
const basePath = import.meta.env.BASE_URL || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BrowserRouter basename={basePath}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app/*" element={<App />} />
            <Route path="/documentation" element={<DocumentationPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
  