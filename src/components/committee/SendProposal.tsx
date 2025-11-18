import { useState } from 'react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { mockProjects } from '../../data/mockData';
import { ArrowLeft } from 'lucide-react';

interface SendProposalProps {
  projectId: string;
  onBack: () => void;
}

export default function SendProposal({ projectId, onBack }: SendProposalProps) {
  const [solution, setSolution] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [experience, setExperience] = useState('');

  const project = mockProjects.find((p) => p.id === projectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Proposal submitted successfully!');
    setSolution('');
    setTimeline('');
    setBudget('');
    setTeamSize('');
    setExperience('');
    onBack();
  };

  if (!project) {
    return (
      <div>
        <p className="text-gray-600">Project not found</p>
        <Button onClick={onBack} className="mt-4">
          Back to Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Proposal</h1>
        <p className="text-gray-600">Submit your proposal for: {project.title}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <Textarea
                label="Solution Overview"
                placeholder="Describe your approach to solving this project. Include your methodology, technologies you'll use, and why you're the best fit..."
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                rows={8}
                required
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Proposed Timeline"
                  placeholder="e.g., 12 weeks"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  required
                />

                <Input
                  label="Budget Quote"
                  placeholder="e.g., ₹2,80,000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Team Size"
                type="number"
                placeholder="e.g., 6"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                required
              />

              <Textarea
                label="Past Experience"
                placeholder="Describe relevant projects you've completed, technologies you've worked with, and your team's expertise..."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={6}
                required
              />

              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Submit Proposal
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Project Details</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Project Title</p>
                  <p className="font-medium text-gray-900">{project.title}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Company</p>
                  <p className="font-medium text-gray-900">{project.companyName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Budget Range</p>
                  <p className="font-medium text-gray-900">{project.budget}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="font-medium text-gray-900">{project.timeline}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mt-6">
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-3">Tips for Success</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be specific about your approach</li>
                <li>• Highlight relevant experience</li>
                <li>• Provide realistic timelines</li>
                <li>• Show understanding of requirements</li>
                <li>• Mention your team's strengths</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
