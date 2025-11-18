import { useState } from 'react';
import Sidebar from '../components/committee/Sidebar';
import DashboardHome from '../components/committee/DashboardHome';
import ProjectMarketplace from '../components/committee/ProjectMarketplace';
import SendProposal from '../components/committee/SendProposal';
import ActiveProjects from '../components/committee/ActiveProjects';
import MyProposals from '../components/committee/MyProposals';
import Portfolio from '../components/committee/Portfolio';
import Messages from '../components/shared/Messages';

export default function CommitteeDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [proposalProjectId, setProposalProjectId] = useState<string | null>(null);

  const handleSendProposal = (projectId: string) => {
    setProposalProjectId(projectId);
    setActivePage('send-proposal');
  };

  const handleBackFromProposal = () => {
    setProposalProjectId(null);
    setActivePage('marketplace');
  };

  const renderPage = () => {
    if (activePage === 'send-proposal' && proposalProjectId) {
      return <SendProposal projectId={proposalProjectId} onBack={handleBackFromProposal} />;
    }

    switch (activePage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'marketplace':
        return <ProjectMarketplace onSendProposal={handleSendProposal} />;
      case 'active-projects':
        return <ActiveProjects />;
      case 'my-proposals':
        return <MyProposals />;
      case 'portfolio':
        return <Portfolio />;
      case 'messages':
        return <Messages userRole="committee" />;
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
