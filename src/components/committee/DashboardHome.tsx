import { Briefcase, Send, CheckCircle, TrendingUp, Building2, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { mockProjects, mockProposals } from '../../data/mockData';

export default function DashboardHome() {
  const availableProjects = mockProjects.filter((p) => p.status === 'open').length;
  const proposalsSent = mockProposals.length;
  const projectsWon = mockProposals.filter((p) => p.status === 'accepted').length;

  const stats = [
    {
      label: 'Available Projects',
      value: availableProjects,
      icon: Briefcase,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      label: 'Proposals Sent',
      value: proposalsSent,
      icon: Send,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      label: 'Projects Won',
      value: projectsWon,
      icon: CheckCircle,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      label: 'Success Rate',
      value: `${projectsWon > 0 ? Math.round((projectsWon / proposalsSent) * 100) : 0}%`,
      icon: TrendingUp,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
  ];

  const recentProjects = mockProjects.filter((p) => p.status === 'open').slice(0, 3);
  const assignedProjects = mockProjects.map((project) => ({
    ...project,
    displayStatus:
      project.status === 'open'
        ? 'Pending'
        : project.status === 'in-progress'
        ? 'In Progress'
        : 'Completed',
    badgeVariant:
      project.status === 'in-progress'
        ? 'blue'
        : project.status === 'open'
        ? 'yellow'
        : 'green',
  }));
  const inProgressProjects = mockProjects.filter((p) => p.status === 'in-progress');

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

      <Card className="mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">Overview</p>
              <h2 className="text-2xl font-bold text-gray-900">Projects Assigned to You</h2>
            </div>
            <Badge variant="gray" size="md">
              {assignedProjects.length} projects
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {assignedProjects.map((project) => (
              <div key={project.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Building2 className="h-4 w-4 mr-1 text-gray-400" />
                      {project.companyName}
                    </div>
                  </div>
                  <Badge variant={project.badgeVariant as 'blue' | 'yellow' | 'green'}>
                    {project.displayStatus}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Timeline: {project.timeline}</span>
                  <span>Budget: {project.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Projects In Progress</h2>
            <span className="text-sm text-gray-500">
              {inProgressProjects.length > 0
                ? `${inProgressProjects.length} active`
                : 'No active projects'}
            </span>
          </div>
          {inProgressProjects.length === 0 ? (
            <p className="text-gray-500">You have no projects in progress at the moment.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {inProgressProjects.map((project) => (
                <div key={project.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-500">Working with</p>
                      <p className="font-semibold text-gray-900">{project.companyName}</p>
                    </div>
                    <Badge variant="blue">In Progress</Badge>
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-2">{project.title}</h3>
                  {project.milestones && (
                    <div className="space-y-2">
                      {project.milestones.slice(0, 2).map((milestone) => (
                        <div key={milestone.id}>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>{milestone.title}</span>
                            <span>{milestone.progress}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-green-600 rounded-full h-1.5"
                              style={{ width: `${milestone.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600 mt-3">
                    <Clock className="h-4 w-4 mr-1" />
                    Timeline: {project.timeline}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">New Project Opportunities</h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.companyName}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{project.budget}</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Open
                  </span>
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
              <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <p className="font-medium text-green-900">Browse Projects</p>
                <p className="text-sm text-green-700">Find new opportunities</p>
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <p className="font-medium text-gray-900">Update Portfolio</p>
                <p className="text-sm text-gray-700">Showcase your work</p>
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-900 font-medium">Proposal submitted</p>
                <p className="text-gray-600">E-Learning Platform Development</p>
                <p className="text-gray-400 text-xs mt-1">1 day ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900 font-medium">New project posted</p>
                <p className="text-gray-600">Inventory Management System</p>
                <p className="text-gray-400 text-xs mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
