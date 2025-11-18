import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Badge from '../ui/Badge';
import { Plus, X, Edit2, Trash2 } from 'lucide-react';
import { PortfolioItem } from '../../types';

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Full-stack marketplace with payment integration and real-time inventory tracking',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    techStack: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const techStackArray = formData.techStack.split(',').map((tech) => tech.trim()).filter(Boolean);

    if (editingId) {
      setPortfolioItems(
        portfolioItems.map((item) =>
          item.id === editingId
            ? { ...item, ...formData, techStack: techStackArray }
            : item
        )
      );
      alert('Portfolio item updated!');
    } else {
      const newItem: PortfolioItem = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        techStack: techStackArray,
        image: formData.image || 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
      };
      setPortfolioItems([...portfolioItems, newItem]);
      alert('Portfolio item added!');
    }

    setFormData({ name: '', description: '', techStack: '', image: '' });
    setShowAddModal(false);
    setEditingId(null);
  };

  const handleEdit = (item: PortfolioItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      techStack: item.techStack.join(', '),
      image: item.image,
    });
    setEditingId(item.id);
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
      alert('Portfolio item deleted!');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', techStack: '', image: '' });
    setShowAddModal(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio</h1>
          <p className="text-gray-600">Showcase your completed projects</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {portfolioItems.length === 0 ? (
        <Card>
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No portfolio items yet</p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} hover>
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-white p-2 rounded-lg shadow hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-white p-2 rounded-lg shadow hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <Badge key={tech} variant="green" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Project Name"
                  placeholder="e.g., E-Commerce Platform"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <Textarea
                  label="Description"
                  placeholder="Describe the project, its features, and your role..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                />

                <Input
                  label="Tech Stack"
                  placeholder="React, Node.js, MongoDB (comma-separated)"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  required
                />

                <Input
                  label="Image URL"
                  placeholder="https://example.com/image.jpg (optional)"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />

                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {editingId ? 'Update Project' : 'Add Project'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
