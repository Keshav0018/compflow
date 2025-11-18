import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { mockProposals } from '../../data/mockData';
import { Users, Clock, DollarSign, CheckCircle, X } from 'lucide-react';

export default function Proposals() {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [proposals, setProposals] = useState(mockProposals);

  const selectedProposalData = proposals.find((p) => p.id === selectedProposal);

  const handleAccept = (proposalId: string) => {
    setProposals(
      proposals.map((p) => (p.id === proposalId ? { ...p, status: 'accepted' as const } : p))
    );
    alert('Proposal accepted! You can now start working with the committee.');
    setSelectedProposal(null);
  };

  const handleReject = (proposalId: string) => {
    setProposals(
      proposals.map((p) => (p.id === proposalId ? { ...p, status: 'rejected' as const } : p))
    );
    alert('Proposal rejected.');
    setSelectedProposal(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposals</h1>
        <p className="text-gray-600">Review proposals submitted by committees</p>
      </div>

      {proposals.length === 0 ? (
        <Card>
          <div className="p-12 text-center">
            <p className="text-gray-500">No proposals received yet</p>
          </div>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} hover onClick={() => setSelectedProposal(proposal.id)}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {proposal.committeeName}
                    </h3>
                    <p className="text-sm text-gray-600">{proposal.projectTitle}</p>
                  </div>
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
                    {selectedProposalData.committeeName}
                  </h2>
                  <p className="text-gray-600">{selectedProposalData.projectTitle}</p>
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
                  <h3 className="font-semibold text-gray-900 mb-2">Proposed Solution</h3>
                  <p className="text-gray-600">{selectedProposalData.solution}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Budget</h3>
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
                  <h3 className="font-semibold text-gray-900 mb-2">Past Experience</h3>
                  <p className="text-gray-600">{selectedProposalData.experience}</p>
                </div>

                <div className="text-sm text-gray-500">
                  Submitted on {selectedProposalData.submittedDate}
                </div>

                {selectedProposalData.status === 'pending' && (
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedProposalData.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleAccept(selectedProposalData.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accept Proposal
                    </Button>
                  </div>
                )}

                {selectedProposalData.status === 'accepted' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center text-green-800">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Proposal Accepted</span>
                    </div>
                  </div>
                )}

                {selectedProposalData.status === 'rejected' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center text-red-800">
                      <X className="h-5 w-5 mr-2" />
                      <span className="font-medium">Proposal Rejected</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
