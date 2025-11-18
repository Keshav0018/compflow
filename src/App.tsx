import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import CompanyLogin from './pages/CompanyLogin';
import CommitteeLogin from './pages/CommitteeLogin';
import CompanyDashboard from './pages/CompanyDashboard';
import CommitteeDashboard from './pages/CommitteeDashboard';

function AppContent() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'company-login':
        return <CompanyLogin />;
      case 'committee-login':
        return <CommitteeLogin />;
      case 'company-dashboard':
        return <CompanyDashboard />;
      case 'committee-dashboard':
        return <CommitteeDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return <>{renderPage()}</>;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
