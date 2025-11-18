import { Star, Users, Mail, Eye } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { mockCommittees } from '../../data/mockData';
import { useState } from 'react';

export default function BrowseCommittees() {
  const [selectedCommittee, setSelectedCommittee] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleViewPortfolio = (committeeId: string) => {
    setSelectedCommittee(committeeId);
  };

  const handleContact = () => {
    setShowContactModal(true);
    setTimeout(() => {
      alert('Message sent to committee!');
      setShowContactModal(false);
    }, 500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse College Committees</h1>
        <p className="text-gray-600">Find the perfect team for your project</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCommittees.map((committee) => (
          <Card key={committee.id} hover>
            <div className="p-6">
              <img
                src={committee.image}
                alt={committee.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-bold text-gray-900 mb-1">{committee.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{committee.college}</p>

              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{committee.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">{committee.members} members</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{committee.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {committee.domain.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="blue">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewPortfolio(committee.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Portfolio
                </Button>
                <Button size="sm" className="flex-1" onClick={handleContact}>
                  <Mail className="h-4 w-4 mr-1" />
                  Contact
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedCommittee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Committee Portfolio</h2>
                <button
                  onClick={() => setSelectedCommittee(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {mockCommittees
                .find((c) => c.id === selectedCommittee)
                ?.portfolio.map((item) => (
                  <div key={item.id} className="mb-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <Badge key={tech} variant="green">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}

              {mockCommittees.find((c) => c.id === selectedCommittee)?.portfolio.length === 0 && (
                <p className="text-gray-500 text-center py-8">No portfolio items yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-900">Sending message...</p>
          </div>
        </div>
      )}
    </div>
  );
}
