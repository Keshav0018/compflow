export interface Committee {
  id: string;
  name: string;
  college: string;
  domain: string[];
  rating: number;
  members: number;
  image: string;
  description: string;
  portfolio: PortfolioItem[];
}

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  image: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  budget: string;
  timeline: string;
  deliverables: string[];
  status: 'open' | 'in-progress' | 'completed';
  companyName: string;
  postedDate: string;
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  progress: number;
}

export interface Proposal {
  id: string;
  projectId: string;
  projectTitle: string;
  committeeName: string;
  committeeId: string;
  solution: string;
  timeline: string;
  budget: string;
  teamSize: number;
  experience: string;
  status: 'pending' | 'accepted' | 'rejected';
  submittedDate: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'company' | 'committee';
  content: string;
  timestamp: string;
  hasAttachment?: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: 'company' | 'committee';
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  projectTitle?: string;
}
