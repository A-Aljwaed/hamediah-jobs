import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Job } from '../types';
import { jobService, applicationService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import ApplicationModal, { ApplicationData } from '../components/ApplicationModal';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Calendar,
  Heart,
  Share2,
  CheckCircle,
  Plus,
  AlertCircle
} from 'lucide-react';

const JobDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await jobService.getJob(parseInt(id));
        setJob(data);
        
        // Check if user has already applied
        if (isAuthenticated && user) {
          const applied = await applicationService.checkIfApplied(parseInt(id), user.email);
          setHasApplied(applied);
        }

        // Load similar jobs (for demo, just load some recent jobs)
        const allJobs = await jobService.getJobs();
        const similar = allJobs
          .filter(j => j.id !== parseInt(id))
          .slice(0, 3);
        setSimilarJobs(similar);
        
        setError(null);
      } catch (err) {
        setError('Failed to load job details');
        console.error('Error loading job:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, isAuthenticated, user]);

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    setShowApplyModal(true);
  };

  const handleSubmitApplication = async (data: ApplicationData) => {
    if (!job) return;

    try {
      await applicationService.submitApplication({
        jobId: job.id,
        applicantName: data.applicantName,
        applicantEmail: data.applicantEmail,
        coverLetter: data.coverLetter,
        resumeUrl: data.resumeUrl || 'uploaded-file.pdf'
      });
      setHasApplied(true);
      setShowApplyModal(false);
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit application. Please try again.');
      console.error('Error submitting application:', err);
      throw err;
    }
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Job removed from saved' : 'Job saved successfully!');
  };

  const handleShare = async () => {
    if (navigator.share && job) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title}`,
          url: window.location.href
        });
      } catch (err) {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="-mx-4 -mt-4">
        <section className="bg-white border-b border-gray-100 py-6 px-4">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-4 w-24 mb-6" />
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <Skeleton className="h-10 w-96 mb-4" />
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <Skeleton className="h-16 w-48" />
                  <Skeleton className="h-16 w-48" />
                  <Skeleton className="h-16 w-48" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center max-w-md" padding="lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Not Found</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button asChild>
            <Link to="/jobs">Browse All Jobs</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-16">
        <Card className="max-w-md mx-auto" padding="lg">
          <h3 className="text-lg font-semibold mb-4">Job not found</h3>
          <Button asChild>
            <Link to="/jobs">Back to Jobs</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="-mx-4 -mt-4">
      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        onSubmit={handleSubmitApplication}
        jobTitle={job.title}
        applicantName={user?.username}
        applicantEmail={user?.email}
      />

      {/* Header Section */}
      <section className="bg-white border-b border-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-6">
            <Button variant="ghost" asChild className="p-0">
              <Link to="/jobs" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('jobs.back')}
              </Link>
            </Button>
          </nav>
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{job.company?.name || '—'}</p>
                    <p className="text-sm text-gray-500">Company</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{job.location || '—'}</p>
                    <p className="text-sm text-gray-500">Location</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Full-time</p>
                    <p className="text-sm text-gray-500">Type</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Full-time</Badge>
                <Badge variant="success">Remote</Badge>
                <Badge variant="primary">Senior Level</Badge>
                <Badge variant="warning">Urgent</Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 min-w-0 lg:min-w-[200px]">
              {hasApplied ? (
                <div className="flex items-center justify-center gap-2 bg-green-50 text-green-800 px-6 py-3 rounded-lg border border-green-200 shadow-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Applied ✓</span>
                </div>
              ) : (
                <Button onClick={handleApply} size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  <Plus className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
              )}
              
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleSaveJob}
                className="group"
              >
                <Heart className={`w-5 h-5 mr-2 transition-all ${isSaved ? 'fill-red-500 text-red-500' : 'group-hover:scale-110'}`} />
                {isSaved ? 'Saved' : 'Save Job'}
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Apply Button for Mobile */}
      {!hasApplied && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
          <Button onClick={handleApply} size="lg" className="w-full shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Apply Now
          </Button>
        </div>
      )}

      {/* Job Description */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                  <div className="prose max-w-none text-gray-700 leading-relaxed">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: job.description.replace(/\n/g, '<br/>') 
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              {/* Job Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Posted:</span>
                      </div>
                      <span className="font-medium">2 days ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Applications:</span>
                      </div>
                      <span className="font-medium">23 candidates</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Experience:</span>
                      </div>
                      <span className="font-medium">3-5 years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>Salary:</span>
                      </div>
                      <span className="font-medium">$80k - $120k</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>About the Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {job.company?.name?.charAt(0) || 'C'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{job.company?.name || 'Company'}</h4>
                      <p className="text-sm text-gray-600">Technology Company</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    A leading technology company focused on innovation and creating amazing user experiences.
                  </p>
                  <Button variant="secondary" className="w-full">
                    View Company Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Jobs Section */}
      {similarJobs.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Similar Job Opportunities
              </h2>
              <p className="text-gray-600">
                You might also be interested in these positions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarJobs.map((similarJob) => (
                <Card 
                  key={similarJob.id} 
                  variant="interactive" 
                  className="hover:shadow-lg transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                        <Link to={`/jobs/${similarJob.id}`}>
                          {similarJob.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {similarJob.company?.name || '—'}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {similarJob.location || '—'}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {similarJob.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="default" className="text-xs">Full-time</Badge>
                      <Badge variant="success" className="text-xs">Remote</Badge>
                    </div>

                    <Button asChild variant="secondary" className="w-full">
                      <Link to={`/jobs/${similarJob.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default JobDetail;