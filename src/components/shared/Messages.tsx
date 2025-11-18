import { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { mockConversations, mockMessages } from '../../data/mockData';
import { Send, Paperclip, Search, MessageSquare } from 'lucide-react';

interface MessagesProps {
  userRole?: 'company' | 'committee';
}

export default function Messages({ userRole = 'committee' }: MessagesProps) {
  // Filter conversations: committees see only companies, companies see only committees
  const filteredConversations = useMemo(
    () =>
      userRole === 'committee'
        ? mockConversations.filter((c) => c.participantRole === 'company')
        : mockConversations.filter((c) => c.participantRole === 'committee'),
    [userRole]
  );

  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    filteredConversations[0]?.id || null
  );
  const [messageText, setMessageText] = useState('');

  const selectedConversationData = useMemo(
    () => filteredConversations.find((c) => c.id === selectedConversation),
    [selectedConversation, filteredConversations]
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      alert('Message sent!');
      setMessageText('');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with your project partners</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 min-h-[600px]">
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{conversation.participantName}</h3>
                  {conversation.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                {conversation.projectTitle && (
                  <p className="text-xs text-gray-500 mb-1">{conversation.projectTitle}</p>
                )}
                <p className="text-sm text-gray-600 line-clamp-1">{conversation.lastMessage}</p>
                <p className="text-xs text-gray-400 mt-1">{conversation.lastMessageTime}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">Conversation with</p>
                    <h2 className="font-bold text-gray-900">
                      {selectedConversationData?.participantName || 'Conversation'}
                    </h2>
                    <p className="text-sm text-gray-600">{selectedConversationData?.projectTitle}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {selectedConversationData?.participantRole === 'company'
                      ? 'Company Partner'
                      : 'Committee Partner'}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
                {mockMessages.map((message) => {
                  const isCurrentUser = message.senderRole === userRole;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                          isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          {!isCurrentUser && (
                            <p className="font-semibold text-sm">{message.senderName}</p>
                          )}
                          <p
                            className={`text-xs ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                        <p className="text-sm">{message.content}</p>
                        {message.hasAttachment && (
                          <div
                            className={`mt-2 flex items-center text-xs ${
                              isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            <Paperclip className="h-4 w-4 mr-1" />
                            <span>Attachment included</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <Button type="submit">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
