import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnalyzerPage from './pages/AnalyzerPage';
import DojoPage from './pages/DojoPage';
import EssayClinicPage from './pages/EssayClinicPage';
import SettingsPage from './pages/SettingsPage';
import ExtensionPage from './pages/ExtensionPage';
import Layout from './components/Layout';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnalyzerProvider } from './contexts/AnalyzerContext';
import { DojoProvider } from './contexts/DojoContext';
import { EssayClinicProvider } from './contexts/EssayClinicContext';

function App() {
  return (
    <ThemeProvider>
      <AnalyzerProvider>
        <DojoProvider>
          <EssayClinicProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/analyzer" element={<AnalyzerPage />} />
                  <Route path="/dojo" element={<DojoPage />} />
                  <Route path="/essay-clinic" element={<EssayClinicPage />} />
                  <Route path="/extension" element={<ExtensionPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Layout>
            </Router>
          </EssayClinicProvider>
        </DojoProvider>
      </AnalyzerProvider>
    </ThemeProvider>
  );
}

export default App;
