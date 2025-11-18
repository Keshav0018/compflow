import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { mockProjects } from '../../data/mockData';
import { CheckCircle, Circle, Loader, Upload, Calendar } from 'lucide-react';

export default function ActiveProjects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const activeProjects = mockProjects.filter((p) => p.status === 'in-progress');
  const selectedProjectData = activeProjects.find((p) => p.id === selectedProject);

  const handleUploadSubmission = () => {
    alert('Submission uploaded successfully!');
  };

  const handleUpdateMilestone = () => {
    alert('Milestone updated!');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Active Projects</h1>
        <p className="text-gray-600">Manage your ongoing projects and milestones</p>
      </div>

      {activeProjects.length === 0 ? (
        <Card>
          <div className="p-12 text-center">
            <p className="text-gray-500">No active projects yet</p>
          </div>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {activeProjects.map((project) => (
            <Card key={project.id} hover onClick={() => setSelectedProject(project.id)}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <Badge variant="blue">In Progress</Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4">{project.companyName}</p>

                {project.milestones && (
                  <div className="space-y-3 mb-4">
                    {project.milestones.map((milestone) => (
                      <div key={milestone.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {milestone.status === 'completed' ? (
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            ) : milestone.status === 'in-progress' ? (
                              <Loader className="h-4 w-4 text-blue-600 mr-2" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-400 mr-2" />
                            )}
                            <span className="text-sm font-medium text-gray-900">
                              {milestone.title}
                            </span>
                          </div>
                        </div>
                        <div className="bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-green-600 rounded-full h-1.5 transition-all"
                            style={{ width: `${milestone.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Timeline: {project.timeline}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedProjectData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProjectData.title}
                  </h2>
                  <p className="text-gray-600">{selectedProjectData.companyName}</p>
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
                  <h3 className="font-semibold text-gray-900 mb-2">Project Description</h3>
                  <p className="text-gray-600">{selectedProjectData.description}</p>
                </div>

                {selectedProjectData.milestones && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Milestones</h3>
                    <div className="space-y-4">
                      {selectedProjectData.milestones.map((milestone) => (
                        <div key={milestone.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                              {milestone.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                              ) : milestone.status === 'in-progress' ? (
                                <Loader className="h-5 w-5 text-blue-600 mr-3" />
                              ) : (
                                <Circle className="h-5 w-5 text-gray-400 mr-3" />
                              )}
                              <div>
                                <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                                <p className="text-sm text-gray-600">Due: {milestone.dueDate}</p>
                              </div>
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

                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="text-gray-900 font-medium">
                                {milestone.progress}%
                              </span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 rounded-full h-2 transition-all"
                                style={{ width: `${milestone.progress}%` }}
                              />
                            </div>
                          </div>

                          {milestone.status === 'in-progress' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleUpdateMilestone}
                                className="flex-1"
                              >
                                Update Progress
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleUploadSubmission}
                                className="flex-1"
                              >
                                <Upload className="h-4 w-4 mr-1" />
                                Upload
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Upload Submission</h3>
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop files here
                      </p>
                    </div>
                    <Button onClick={handleUploadSubmission} className="w-full">
                      Upload Files
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedProject(null)}>
                    Close
                  </Button>
                  <Button>Message Company</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
