import { LayoutDashboard, Briefcase, Send, FolderOpen, FileText, MessageSquare, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const { setUserRole, setCurrentPage } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'marketplace', label: 'Project Marketplace', icon: Briefcase },
    { id: 'active-projects', label: 'Active Projects', icon: FolderOpen },
    { id: 'my-proposals', label: 'My Proposals', icon: Send },
    { id: 'portfolio', label: 'Portfolio', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('landing');
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Committee Portal</h2>
        <p className="text-sm text-gray-600">Find & manage projects</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
