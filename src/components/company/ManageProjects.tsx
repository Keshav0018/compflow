import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { mockProjects } from '../../data/mockData';
import { Calendar, DollarSign, Clock, CheckCircle, Circle, Loader } from 'lucide-react';

export default function ManageProjects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'completed'>('all');

  const filteredProjects =
    filter === 'all' ? mockProjects : mockProjects.filter((p) => p.status === filter);

  const selectedProjectData = mockProjects.find((p) => p.id === selectedProject);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Projects</h1>
        <p className="text-gray-600">Track and manage all your projects</p>
      </div>

      <div className="flex space-x-2 mb-6">
        {['all', 'open', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as typeof filter)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} hover onClick={() => setSelectedProject(project.id)}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <Badge
                  variant={
                    project.status === 'open'
                      ? 'green'
                      : project.status === 'in-progress'
                      ? 'blue'
                      : 'gray'
                  }
                >
                  {project.status}
                </Badge>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {project.budget}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {project.timeline}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Posted {project.postedDate}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="gray" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedProjectData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProjectData.title}
                  </h2>
                  <Badge
                    variant={
                      selectedProjectData.status === 'open'
                        ? 'green'
                        : selectedProjectData.status === 'in-progress'
                        ? 'blue'
                        : 'gray'
                    }
                  >
                    {selectedProjectData.status}
                  </Badge>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedProjectData.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Budget</h3>
                    <p className="text-gray-600">{selectedProjectData.budget}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                    <p className="text-gray-600">{selectedProjectData.timeline}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectData.skills.map((skill) => (
                      <Badge key={skill} variant="blue">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Deliverables</h3>
                  <ul className="space-y-2">
                    {selectedProjectData.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProjectData.milestones && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Milestones</h3>
                    <div className="space-y-4">
                      {selectedProjectData.milestones.map((milestone) => (
                        <div key={milestone.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center">
                              {milestone.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                              ) : milestone.status === 'in-progress' ? (
                                <Loader className="h-5 w-5 text-blue-600 mr-2" />
                              ) : (
                                <Circle className="h-5 w-5 text-gray-400 mr-2" />
                              )}
                              <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                            </div>
                            <Badge
                              variant={
                                milestone.status === 'completed'
                                  ? 'green'
                                  : milestone.status === 'in-progress'
                                  ? 'blue'
                                  : 'gray'
                              }
                              size="sm"
                            >
                              {milestone.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Due: {milestone.dueDate}</span>
                            <span className="text-gray-900 font-medium">
                              {milestone.progress}% Complete
                            </span>
                          </div>
                          <div className="mt-2 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 rounded-full h-2 transition-all"
                              style={{ width: `${milestone.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedProject(null)}>
                    Close
                  </Button>
                  <Button>Message Committee</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
