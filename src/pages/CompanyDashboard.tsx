import { useState } from 'react';
import Sidebar from '../components/company/Sidebar';
import DashboardHome from '../components/company/DashboardHome';
import BrowseCommittees from '../components/company/BrowseCommittees';
import PostProject from '../components/company/PostProject';
import ManageProjects from '../components/company/ManageProjects';
import Proposals from '../components/company/Proposals';
import Messages from '../components/shared/Messages';

export default function CompanyDashboard() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'browse':
        return <BrowseCommittees />;
      case 'post-project':
        return <PostProject />;
      case 'projects':
        return <ManageProjects />;
      case 'proposals':
        return <Proposals />;
      case 'messages':
        return <Messages userRole="company" />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="flex-1 ml-64 p-8">{renderPage()}</main>
    </div>
  );
}
