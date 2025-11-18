import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { mockProposals } from '../../data/mockData';
import { Clock, DollarSign, Users } from 'lucide-react';

export default function MyProposals() {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  const selectedProposalData = mockProposals.find((p) => p.id === selectedProposal);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Proposals</h1>
        <p className="text-gray-600">Track the status of your submitted proposals</p>
      </div>

      {mockProposals.length === 0 ? (
        <Card>
          <div className="p-12 text-center">
            <p className="text-gray-500">No proposals submitted yet</p>
          </div>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {mockProposals.map((proposal) => (
            <Card key={proposal.id} hover onClick={() => setSelectedProposal(proposal.id)}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{proposal.projectTitle}</h3>
                  <Badge
                    variant={
                      proposal.status === 'pending'
                        ? 'yellow'
                        : proposal.status === 'accepted'
                        ? 'green'
                        : 'red'
                    }
                  >
                    {proposal.status}
                  </Badge>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{proposal.solution}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Budget: {proposal.budget}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Timeline: {proposal.timeline}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    Team Size: {proposal.teamSize} members
                  </div>
                </div>

                <p className="text-xs text-gray-500">Submitted on {proposal.submittedDate}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedProposalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedProposalData.projectTitle}
                  </h2>
                  <Badge
                    variant={
                      selectedProposalData.status === 'pending'
                        ? 'yellow'
                        : selectedProposalData.status === 'accepted'
                        ? 'green'
                        : 'red'
                    }
                  >
                    {selectedProposalData.status}
                  </Badge>
                </div>
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Your Solution</h3>
                  <p className="text-gray-600">{selectedProposalData.solution}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Budget Quote</h3>
                    </div>
                    <p className="text-gray-600">{selectedProposalData.budget}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Timeline</h3>
                    </div>
                    <p className="text-gray-600">{selectedProposalData.timeline}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Team Size</h3>
                  </div>
                  <p className="text-gray-600">{selectedProposalData.teamSize} members</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Experience Shared</h3>
                  <p className="text-gray-600">{selectedProposalData.experience}</p>
                </div>

                <div className="text-sm text-gray-500">
                  Submitted on {selectedProposalData.submittedDate}
                </div>

                {selectedProposalData.status === 'pending' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 font-medium">Awaiting Company Review</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      The company is reviewing your proposal. You'll be notified once they make a
                      decision.
                    </p>
                  </div>
                )}

                {selectedProposalData.status === 'accepted' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">Proposal Accepted!</p>
                    <p className="text-green-700 text-sm mt-1">
                      Congratulations! The company has accepted your proposal. You can now start
                      working on the project.
                    </p>
                  </div>
                )}

                {selectedProposalData.status === 'rejected' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium">Proposal Not Selected</p>
                    <p className="text-red-700 text-sm mt-1">
                      Unfortunately, the company decided to go with a different proposal. Keep
                      improving and try again!
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedProposal(null)}>
                    Close
                  </Button>
                  {selectedProposalData.status === 'accepted' && (
                    <Button>Start Project</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
