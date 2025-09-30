import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import AdminDashboard from '../components/admin/AdminDashboard';
import ContentModeration from '../components/admin/ContentModeration';
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Briefcase, 
  BarChart3,
  Settings,
  Lock,
  Eye,
  FileText,
  Activity
} from 'lucide-react';

type AdminView = 'dashboard' | 'moderation' | 'settings' | 'analytics';

const AdminPanel: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [activeView, setActiveView] = useState<AdminView>('dashboard');

  // Check if user has admin privileges
  const isAdmin = isAuthenticated && (user?.role === 'admin' || user?.role === 'superadmin');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="text-center p-8">
            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please log in to access the admin panel.
            </p>
            <Button asChild>
              <a href="/login">Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="text-center p-8">
            <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access the admin panel. 
              Contact your administrator if you believe this is an error.
            </p>
            <Button variant="outline" asChild>
              <a href="/">Return to Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navigationItems = [
    {
      id: 'dashboard' as AdminView,
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Overview and key metrics'
    },
    {
      id: 'moderation' as AdminView,
      label: 'Content Moderation',
      icon: Shield,
      description: 'Review flagged content'
    },
    {
      id: 'analytics' as AdminView,
      label: 'Analytics',
      icon: Activity,
      description: 'Detailed reports and insights'
    },
    {
      id: 'settings' as AdminView,
      label: 'Settings',
      icon: Settings,
      description: 'System configuration'
    }
  ];

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Advanced Analytics
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Detailed analytics and reporting features would be implemented here, 
          including user behavior analysis, job posting trends, and platform performance metrics.
        </p>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          System Settings
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          System configuration options would be available here, including 
          moderation rules, user permissions, platform settings, and integration configurations.
        </p>
      </div>
    </div>
  );

  return (
    <div className="-mx-4 -mt-4 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary-600" />
                Admin Panel
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and moderate the Hamediah Jobs platform
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.role} Access</p>
              </div>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {navigationItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          activeView === item.id
                            ? 'bg-primary-100 text-primary-700 border border-primary-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Pending Reviews</span>
                      <span className="font-medium text-yellow-600">23</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Active Users</span>
                      <span className="font-medium text-green-600">15.4K</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Flagged Content</span>
                      <span className="font-medium text-red-600">7</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">System Health</span>
                      <span className="font-medium text-green-600">Good</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      View Alerts
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Eye className="w-4 h-4 mr-2" />
                      Audit Log
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeView === 'dashboard' && <AdminDashboard />}
            {activeView === 'moderation' && <ContentModeration />}
            {activeView === 'analytics' && <AnalyticsView />}
            {activeView === 'settings' && <SettingsView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
