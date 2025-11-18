import { Briefcase, FileText, Users, TrendingUp, Building2, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { mockProjects, mockProposals } from '../../data/mockData';

export default function DashboardHome() {
  const activeProjects = mockProjects.filter((p) => p.status === 'in-progress').length;
  const openProjects = mockProjects.filter((p) => p.status === 'open').length;
  const totalProposals = mockProposals.length;

  const stats = [
    {
      label: 'Active Projects',
      value: activeProjects,
      icon: Briefcase,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      label: 'Open Projects',
      value: openProjects,
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      label: 'Proposals Received',
      value: totalProposals,
      icon: FileText,
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
    {
      label: 'Committees Contacted',
      value: 8,
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
  ];

  const recentProjects = mockProjects.slice(0, 3);
  const statusConfig: Record<
    string,
    { label: string; variant: 'blue' | 'green' | 'yellow' | 'gray' }
  > = {
    open: { label: 'Pending', variant: 'yellow' },
    'in-progress': { label: 'In Progress', variant: 'blue' },
    completed: { label: 'Completed', variant: 'green' },
  };
  const assignedCommittees = mockProposals.map((proposal) => ({
    id: proposal.id,
    committeeName: proposal.committeeName,
    projectTitle: proposal.projectTitle,
    status: proposal.status === 'accepted' ? 'Approved' : 'Pending Review',
    badgeVariant: proposal.status === 'accepted' ? 'green' : 'yellow',
    timeline: proposal.timeline,
    teamSize: proposal.teamSize,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Active Projects</h2>
              <Badge variant="blue" size="md">
                {activeProjects} live
              </Badge>
            </div>
            <div className="space-y-4">
              {mockProjects.map((project) => {
                const config =
                  statusConfig[project.status] || { label: project.status, variant: 'gray' };
                return (
                  <div key={project.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Project</p>
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Building2 className="h-4 w-4 mr-1 text-gray-400" />
                          {project.companyName}
                        </div>
                      </div>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <span>Budget: {project.budget}</span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Timeline: {project.timeline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Assigned Committees</h2>
            <div className="space-y-4 flex-1">
              {assignedCommittees.map((assignment) => (
                <div key={assignment.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between mb-1 gap-3">
                    <p className="font-semibold text-gray-900 flex-1">{assignment.committeeName}</p>
                    <Badge variant={assignment.badgeVariant as 'green' | 'yellow'} className="flex-shrink-0 whitespace-nowrap">
                      {assignment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{assignment.projectTitle}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                    <span>Timeline: {assignment.timeline}</span>
                    <span>Team size: {assignment.teamSize}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.companyName}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'open'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600">{project.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <p className="font-medium text-blue-900">Post New Project</p>
                <p className="text-sm text-blue-700">Create a new project listing</p>
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <p className="font-medium text-gray-900">Browse Committees</p>
                <p className="text-sm text-gray-700">Find the perfect team</p>
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-900 font-medium">New proposal received</p>
                <p className="text-gray-600">TechCrew IIT Delhi submitted a proposal</p>
                <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900 font-medium">Milestone completed</p>
                <p className="text-gray-600">Social Media Analytics - Phase 1</p>
                <p className="text-gray-400 text-xs mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
