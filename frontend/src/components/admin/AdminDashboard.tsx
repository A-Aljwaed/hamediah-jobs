import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { 
  Users, 
  Briefcase, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Shield,
  Flag,
  UserCheck,
  UserX,
  Building
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeJobs: number;
  pendingJobs: number;
  flaggedContent: number;
  newUsersToday: number;
  jobsPostedToday: number;
  userGrowth: number;
  jobGrowth: number;
}

interface PendingJob {
  id: string;
  title: string;
  company: string;
  postedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  flagReason?: string;
  priority: 'low' | 'medium' | 'high';
}

interface UserAccount {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'publisher' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  joinedAt: string;
  lastActive: string;
  jobsPosted: number;
  applicationsSubmitted: number;
}

interface FlaggedContent {
  id: string;
  type: 'job' | 'user' | 'application';
  title: string;
  reason: string;
  reportedBy: string;
  reportedAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'users' | 'reports'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data
  const [stats] = useState<AdminStats>({
    totalUsers: 15420,
    activeJobs: 2847,
    pendingJobs: 23,
    flaggedContent: 7,
    newUsersToday: 45,
    jobsPostedToday: 18,
    userGrowth: 12.5,
    jobGrowth: 8.3
  });

  const [pendingJobs] = useState<PendingJob[]>([
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      postedBy: 'john.doe@techcorp.com',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Data Scientist Position',
      company: 'DataFlow Analytics',
      postedBy: 'hr@dataflow.com',
      submittedAt: '2024-01-15T09:15:00Z',
      status: 'pending',
      flagReason: 'Suspicious salary range',
      priority: 'high'
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'Design Studio Pro',
      postedBy: 'recruiter@designstudio.com',
      submittedAt: '2024-01-14T16:45:00Z',
      status: 'pending',
      priority: 'low'
    }
  ]);

  const [users] = useState<UserAccount[]>([
    {
      id: '1',
      username: 'john_developer',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      joinedAt: '2023-06-15T10:00:00Z',
      lastActive: '2024-01-15T14:30:00Z',
      jobsPosted: 0,
      applicationsSubmitted: 12
    },
    {
      id: '2',
      username: 'hr_techcorp',
      email: 'hr@techcorp.com',
      role: 'publisher',
      status: 'active',
      joinedAt: '2023-03-20T09:00:00Z',
      lastActive: '2024-01-15T11:20:00Z',
      jobsPosted: 25,
      applicationsSubmitted: 0
    },
    {
      id: '3',
      username: 'spam_user',
      email: 'spam@suspicious.com',
      role: 'user',
      status: 'suspended',
      joinedAt: '2024-01-10T12:00:00Z',
      lastActive: '2024-01-12T08:15:00Z',
      jobsPosted: 0,
      applicationsSubmitted: 50
    }
  ]);

  const [flaggedContent] = useState<FlaggedContent[]>([
    {
      id: '1',
      type: 'job',
      title: 'Suspicious Job Posting - High Salary',
      reason: 'Unrealistic salary range for position level',
      reportedBy: 'system_auto',
      reportedAt: '2024-01-15T12:00:00Z',
      status: 'pending',
      severity: 'medium'
    },
    {
      id: '2',
      type: 'user',
      title: 'Spam Applications',
      reason: 'User submitted 50+ applications in 1 hour',
      reportedBy: 'system_auto',
      reportedAt: '2024-01-15T10:30:00Z',
      status: 'pending',
      severity: 'high'
    },
    {
      id: '3',
      type: 'job',
      title: 'Inappropriate Content',
      reason: 'Job description contains inappropriate language',
      reportedBy: 'user_report',
      reportedAt: '2024-01-14T15:20:00Z',
      status: 'resolved',
      severity: 'low'
    }
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': case 'active': case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': case 'suspended': case 'dismissed': return 'bg-red-100 text-red-800';
      case 'banned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{stats.userGrowth}%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeJobs.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{stats.jobGrowth}%</span>
                </div>
              </div>
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingJobs}</p>
                <p className="text-sm text-gray-600 mt-1">Jobs awaiting approval</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Flagged Content</p>
                <p className="text-2xl font-bold text-gray-900">{stats.flaggedContent}</p>
                <p className="text-sm text-gray-600 mt-1">Requires attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingJobs.slice(0, 5).map(job => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{job.title}</p>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(job.priority)}>
                      {job.priority}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flagged Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {flaggedContent.filter(item => item.status === 'pending').slice(0, 5).map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(item.severity)}>
                      {item.severity}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const JobsTab = () => (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Jobs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Job Title</th>
                  <th className="text-left p-4 font-medium text-gray-900">Company</th>
                  <th className="text-left p-4 font-medium text-gray-900">Posted By</th>
                  <th className="text-left p-4 font-medium text-gray-900">Submitted</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Priority</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingJobs.map(job => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{job.title}</p>
                        {job.flagReason && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <Flag className="w-3 h-3" />
                            {job.flagReason}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{job.company}</td>
                    <td className="p-4 text-gray-600">{job.postedBy}</td>
                    <td className="p-4 text-gray-600">{formatDate(job.submittedAt)}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getPriorityColor(job.priority)}>
                        {job.priority}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <XCircle className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">User</th>
                  <th className="text-left p-4 font-medium text-gray-900">Role</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Joined</th>
                  <th className="text-left p-4 font-medium text-gray-900">Last Active</th>
                  <th className="text-left p-4 font-medium text-gray-900">Activity</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.username}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{user.role}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-600">{formatDate(user.joinedAt)}</td>
                    <td className="p-4 text-gray-600">{formatDate(user.lastActive)}</td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600">
                        <p>{user.jobsPosted} jobs posted</p>
                        <p>{user.applicationsSubmitted} applications</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <UserX className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Reports</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      {/* Reports Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Content</th>
                  <th className="text-left p-4 font-medium text-gray-900">Type</th>
                  <th className="text-left p-4 font-medium text-gray-900">Reason</th>
                  <th className="text-left p-4 font-medium text-gray-900">Reported By</th>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Severity</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flaggedContent.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{item.title}</p>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{item.type}</Badge>
                    </td>
                    <td className="p-4 text-gray-600">{item.reason}</td>
                    <td className="p-4 text-gray-600">{item.reportedBy}</td>
                    <td className="p-4 text-gray-600">{formatDate(item.reportedAt)}</td>
                    <td className="p-4">
                      <Badge className={getSeverityColor(item.severity)}>
                        {item.severity}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <XCircle className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage jobs, users, and content moderation
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <AlertTriangle className="w-4 h-4 mr-2" />
            View Alerts
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'jobs', label: 'Job Moderation', icon: Briefcase },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'reports', label: 'Content Reports', icon: Flag }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'jobs' && <JobsTab />}
      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'reports' && <ReportsTab />}
    </div>
  );
};

export default AdminDashboard;
