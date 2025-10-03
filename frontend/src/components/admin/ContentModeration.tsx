import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Icon } from '../ui/Icon';

interface ModerationItem {
  id: string;
  type: 'job' | 'user_profile' | 'application' | 'comment';
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
    email: string;
    reputation: number;
  };
  flags: ModerationFlag[];
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  autoFlags: AutoFlag[];
  manualReview: boolean;
}

interface ModerationFlag {
  id: string;
  reason: string;
  category: 'spam' | 'inappropriate' | 'misleading' | 'copyright' | 'other';
  reportedBy: string;
  reportedAt: string;
  severity: 'low' | 'medium' | 'high';
  description?: string;
}

interface AutoFlag {
  type: 'keyword' | 'pattern' | 'ml_classification' | 'duplicate' | 'suspicious_activity';
  confidence: number;
  reason: string;
  details: string;
}

interface ModerationAction {
  id: string;
  itemId: string;
  action: 'approve' | 'reject' | 'request_changes' | 'escalate';
  reason: string;
  moderator: string;
  timestamp: string;
  notes?: string;
}

const ContentModeration: React.FC = () => {
  const { t } = useTranslation();
  
  const [items, setItems] = useState<ModerationItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('pending');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  // Mock data
  useEffect(() => {
    const mockItems: ModerationItem[] = [
      {
        id: '1',
        type: 'job',
        title: 'Senior Software Engineer - High Salary',
        content: 'We are offering $500,000 salary for a junior developer position. No experience required. Work from home. Contact us immediately!',
        author: {
          id: 'user1',
          username: 'recruiter_xyz',
          email: 'recruiter@xyz.com',
          reputation: 2.1
        },
        flags: [
          {
            id: 'flag1',
            reason: 'Unrealistic salary offer',
            category: 'misleading',
            reportedBy: 'system_auto',
            reportedAt: '2024-01-15T10:30:00Z',
            severity: 'high',
            description: 'Salary amount seems unrealistic for the position level'
          }
        ],
        status: 'pending',
        priority: 'high',
        submittedAt: '2024-01-15T09:00:00Z',
        autoFlags: [
          {
            type: 'keyword',
            confidence: 0.85,
            reason: 'Suspicious salary keywords detected',
            details: 'Contains phrases commonly associated with scam job postings'
          },
          {
            type: 'pattern',
            confidence: 0.72,
            reason: 'Urgency pattern detected',
            details: 'Uses urgent language like "immediately", "contact us now"'
          }
        ],
        manualReview: true
      },
      {
        id: '2',
        type: 'user_profile',
        title: 'Suspicious User Activity',
        content: 'User profile with minimal information, created multiple accounts',
        author: {
          id: 'user2',
          username: 'spam_user_123',
          email: 'temp@tempmail.com',
          reputation: 0.5
        },
        flags: [
          {
            id: 'flag2',
            reason: 'Multiple account creation',
            category: 'spam',
            reportedBy: 'system_auto',
            reportedAt: '2024-01-15T11:15:00Z',
            severity: 'medium'
          }
        ],
        status: 'under_review',
        priority: 'medium',
        submittedAt: '2024-01-14T16:30:00Z',
        autoFlags: [
          {
            type: 'suspicious_activity',
            confidence: 0.91,
            reason: 'Multiple accounts from same IP',
            details: 'Created 5 accounts in the last 24 hours from the same IP address'
          }
        ],
        manualReview: true
      },
      {
        id: '3',
        type: 'application',
        title: 'Bulk Application Submission',
        content: 'Generic application submitted to 50+ jobs in 1 hour',
        author: {
          id: 'user3',
          username: 'job_seeker_99',
          email: 'seeker@email.com',
          reputation: 3.2
        },
        flags: [
          {
            id: 'flag3',
            reason: 'Spam application behavior',
            category: 'spam',
            reportedBy: 'system_auto',
            reportedAt: '2024-01-15T12:00:00Z',
            severity: 'medium'
          }
        ],
        status: 'pending',
        priority: 'low',
        submittedAt: '2024-01-15T11:30:00Z',
        autoFlags: [
          {
            type: 'pattern',
            confidence: 0.88,
            reason: 'Bulk submission detected',
            details: 'Submitted identical applications to multiple jobs in short timeframe'
          }
        ],
        manualReview: false
      }
    ];
    
    setItems(mockItems);
  }, []);

  const filteredItems = items.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterPriority !== 'all' && item.priority !== filterPriority) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleModerationAction = (itemId: string, action: 'approve' | 'reject' | 'escalate', reason: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'under_review',
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'current_moderator'
          }
        : item
    ));
    
    // In a real app, this would make an API call
    console.log(`Action ${action} taken on item ${itemId} with reason: ${reason}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'job': return <Icon name="briefcase" size="16" />;
      case 'user_profile': return <Icon name="user" size="16" />;
      case 'application': return <Icon name="file-text" size="16" />;
      case 'comment': return <Icon name="message-square" size="16" />;
      default: return <Icon name="file-text" size="16" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Icon name="shield" size="24" className="text-primary-600" />
            Content Moderation
          </h1>
          <p className="text-gray-600 mt-1">
            Review and moderate flagged content across the platform
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Icon name="clock" size="16" />
            {filteredItems.filter(item => item.status === 'pending').length} Pending
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Icon name="alert-triangle" size="16" />
            {filteredItems.filter(item => item.priority === 'high' || item.priority === 'critical').length} High Priority
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon='search'
            />
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="job">Jobs</option>
              <option value="user_profile">User Profiles</option>
              <option value="application">Applications</option>
              <option value="comment">Comments</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <Button variant="outline" className="gap-2">
              <Icon name="filter" size="16" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredItems.map(item => (
            <Card 
              key={item.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedItem?.id === item.id ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => {
                setSelectedItem(item);
                setShowDetails(true);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Icon name="user" size="16" />
                      {item.author.username}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="clock" size="16" />
                      {formatDate(item.submittedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="flag" size="16" />
                      {item.flags.length} flags
                    </div>
                  </div>

                  {item.autoFlags.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <Icon name="bot" size="16" />
                      Auto-flagged
                    </div>
                  )}
                </div>

                {/* Auto Flags Preview */}
                {item.autoFlags.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {item.autoFlags.slice(0, 2).map((flag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {flag.type}: {Math.round(flag.confidence * 100)}%
                        </Badge>
                      ))}
                      {item.autoFlags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{item.autoFlags.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Icon name="shield" size="24" className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No items to moderate
                </h3>
                <p className="text-gray-600">
                  All content has been reviewed or no items match your filters.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          {selectedItem ? (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getTypeIcon(selectedItem.type)}
                  Review Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Item Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{selectedItem.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{selectedItem.content}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getPriorityColor(selectedItem.priority)}>
                      {selectedItem.priority}
                    </Badge>
                    <Badge className={getStatusColor(selectedItem.status)}>
                      {selectedItem.status}
                    </Badge>
                  </div>
                </div>

                {/* Author Info */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Author</h5>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Username:</span> {selectedItem.author.username}</p>
                    <p><span className="font-medium">Email:</span> {selectedItem.author.email}</p>
                    <p><span className="font-medium">Reputation:</span> {selectedItem.author.reputation}/5.0</p>
                  </div>
                </div>

                {/* Auto Flags */}
                {selectedItem.autoFlags.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-1">
                      <Icon name="bot" size="16" />
                      Auto Flags
                    </h5>
                    <div className="space-y-2">
                      {selectedItem.autoFlags.map((flag, index) => (
                        <div key={index} className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-blue-900">{flag.type}</span>
                            <span className="text-xs text-blue-600">{Math.round(flag.confidence * 100)}%</span>
                          </div>
                          <p className="text-xs text-blue-800">{flag.reason}</p>
                          <p className="text-xs text-blue-600 mt-1">{flag.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Manual Flags */}
                {selectedItem.flags.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Manual Reports</h5>
                    <div className="space-y-2">
                      {selectedItem.flags.map(flag => (
                        <div key={flag.id} className="p-2 bg-red-50 rounded border-l-4 border-red-400">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-red-900">{flag.reason}</span>
                            <Badge className={getSeverityColor(flag.severity)}>
                              {flag.severity}
                            </Badge>
                          </div>
                          <p className="text-xs text-red-600">Category: {flag.category}</p>
                          <p className="text-xs text-red-600">By: {flag.reportedBy}</p>
                          {flag.description && (
                            <p className="text-xs text-red-800 mt-1">{flag.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {selectedItem.status === 'pending' && (
                  <div className="space-y-2 pt-4 border-t">
                    <h5 className="font-medium text-gray-900 mb-2">Moderation Actions</h5>
                    
                    <Button 
                      className="w-full gap-2"
                      onClick={() => handleModerationAction(selectedItem.id, 'approve', 'Content approved after review')}
                    >
                      <Icon name="check-circle" size="16" />
                      Approve
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      className="w-full gap-2"
                      onClick={() => handleModerationAction(selectedItem.id, 'reject', 'Content violates community guidelines')}
                    >
                      <Icon name="x-circle" size="16" />
                      Reject
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      onClick={() => handleModerationAction(selectedItem.id, 'escalate', 'Requires senior moderator review')}
                    >
                      <Icon name="alert-triangle" size="16" />
                      Escalate
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-4">
              <CardContent className="text-center py-12">
                <Icon name="eye" size="24" className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select an item to review
                </h3>
                <p className="text-gray-600">
                  Click on any item from the list to see detailed information and moderation options.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentModeration;
