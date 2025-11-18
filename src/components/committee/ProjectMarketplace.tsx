import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { mockProjects } from '../../data/mockData';
import { Calendar, DollarSign, Clock, Building2 } from 'lucide-react';

interface ProjectMarketplaceProps {
  onSendProposal: (projectId: string) => void;
}

export default function ProjectMarketplace({ onSendProposal }: ProjectMarketplaceProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const openProjects = mockProjects.filter((p) => p.status === 'open');
  const selectedProjectData = openProjects.find((p) => p.id === selectedProject);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Marketplace</h1>
        <p className="text-gray-600">Browse available projects and submit proposals</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {openProjects.map((project) => (
          <Card key={project.id} hover onClick={() => setSelectedProject(project.id)}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <Badge variant="green">Open</Badge>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Building2 className="h-4 w-4 mr-1" />
                {project.companyName}
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

              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="blue" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>

              <Button
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onSendProposal(project.id);
                }}
              >
                Send Proposal
              </Button>
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
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-4 w-4 mr-1" />
                    {selectedProjectData.companyName}
                  </div>
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
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Budget</h3>
                    </div>
                    <p className="text-gray-600">{selectedProjectData.budget}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Timeline</h3>
                    </div>
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
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedProject(null)}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedProject(null);
                      onSendProposal(selectedProjectData.id);
                    }}
                  >
                    Send Proposal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
