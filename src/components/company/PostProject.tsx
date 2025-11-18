import { useState } from 'react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Plus, X } from 'lucide-react';

export default function PostProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [deliverableInput, setDeliverableInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addDeliverable = () => {
    if (deliverableInput.trim()) {
      setDeliverables([...deliverables, deliverableInput.trim()]);
      setDeliverableInput('');
    }
  };

  const removeDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Project posted successfully!');
    setTitle('');
    setDescription('');
    setSkills([]);
    setBudget('');
    setTimeline('');
    setDeliverables([]);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post New Project</h1>
        <p className="text-gray-600">Create a project listing to receive proposals from committees</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Project Title"
            placeholder="e.g., E-Learning Platform Development"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            label="Project Description"
            placeholder="Describe your project requirements, goals, and expectations..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills
            </label>
            <div className="flex space-x-2 mb-3">
              <Input
                placeholder="e.g., React, Node.js"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} className="whitespace-nowrap">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Budget Range"
              placeholder="e.g., ₹2,00,000 - ₹3,00,000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />

            <Input
              label="Timeline"
              placeholder="e.g., 3 months"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deliverables
            </label>
            <div className="flex space-x-2 mb-3">
              <Input
                placeholder="e.g., Web Application, Documentation"
                value={deliverableInput}
                onChange={(e) => setDeliverableInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDeliverable())}
              />
              <Button type="button" onClick={addDeliverable} className="whitespace-nowrap">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {deliverables.length > 0 && (
              <ul className="space-y-2">
                {deliverables.map((deliverable, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-between"
                  >
                    <span className="text-gray-700">{deliverable}</span>
                    <button
                      type="button"
                      onClick={() => removeDeliverable(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">Post Project</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
