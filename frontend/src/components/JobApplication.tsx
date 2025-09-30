import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';
import { Upload, FileText, AlertCircle, CheckCircle, X, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import Captcha, { CaptchaRef } from './security/Captcha';
import { validateFile, VALIDATION_CONFIGS } from '../utils/fileValidation';
import { applicationRateLimiter } from '../utils/rateLimiter';

interface JobApplicationProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  onClose?: () => void;
}

const JobApplication: React.FC<JobApplicationProps> = ({ 
  jobId, 
  jobTitle, 
  companyName, 
  onClose 
}) => {
   const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const captchaRef = useRef<CaptchaRef>(null);;

  const handleFileSelect = async (file: File) => {
    setIsValidating(true);
    
    try {
      const validationResult = await validateFile(file, VALIDATION_CONFIGS.RESUME);
      
      if (!validationResult.isValid) {
        setErrors({ ...errors, resume: validationResult.error || t('application.resumeError') });
        toast.error(validationResult.error || t('application.resumeError'));
        return;
      }
      
      // Show warnings if any
      if (validationResult.warnings && validationResult.warnings.length > 0) {
        validationResult.warnings.forEach(warning => {
          toast.warning(warning, { duration: 3000 });
        });
      }
      
      setResumeFile(file);
      setErrors({ ...errors, resume: '' });
      toast.success(t('application.resumeSuccess'));
    } catch (error) {
      console.error('File validation error:', error);
      toast.error('File validation failed. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error(t('application.loginMessage'));
      return;
    }

    // Rate limiting check
    const rateLimitKey = user?.email || 'anonymous';
    if (!applicationRateLimiter.isAllowed(rateLimitKey)) {
      const timeUntilUnblocked = applicationRateLimiter.getTimeUntilUnblocked(rateLimitKey);
      const minutesLeft = Math.ceil(timeUntilUnblocked / (1000 * 60));
      toast.error(`Too many application attempts. Please try again in ${minutesLeft} minutes.`);
      return;
    }

    if (!resumeFile) {
      setErrors({ ...errors, resume: t('application.resumeRequired') });
      return;
    }

    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('jobId', jobId);
      formData.append('resume', resumeFile);
      formData.append('coverLetter', coverLetter);
      formData.append('captchaToken', captchaToken);
      
      // TODO: Replace with actual API call
      // const response = await jobService.applyToJob(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset rate limiter on successful submission
      applicationRateLimiter.reset(rateLimitKey);
      
      toast.success(t('application.success'));
      onClose?.();
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(t('application.error'));
      
      // Reset CAPTCHA on error
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('application.loginRequired')}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('application.loginMessage')}
          </p>
          <Button asChild>
            <a href="/login">{t('application.loginButton')}</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t('application.title')}</CardTitle>
          <div className="mt-2">
            <h3 className="font-semibold text-gray-900">{jobTitle}</h3>
            <p className="text-gray-600">{companyName}</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Applicant Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">{t('application.applicantInfo')}</h4>
            <div className="flex items-center gap-2">
              <Badge variant="primary">{user?.username}</Badge>
              <span className="text-sm text-gray-600">{user?.email}</span>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('application.resume')} <span className="text-red-500">*</span>
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? 'border-primary-500 bg-primary-50'
                  : resumeFile
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {isValidating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                  <p className="text-gray-600">Validating file security...</p>
                </div>
              ) : resumeFile ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <Shield className="w-4 h-4 text-green-600" title="Security validated" />
                  </div>
                  <div>
                    <p className="font-medium text-green-900">{resumeFile.name}</p>
                    <p className="text-sm text-green-600">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Security verified
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    {t('application.resumeUpload')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('application.resumeFormat')}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-400">
                    <Shield className="w-3 h-3" />
                    <span>Files are automatically scanned for security</span>
                  </div>
                </div>
              )}
            </div>
            {errors.resume && (
              <p className="mt-2 text-sm text-red-600">{errors.resume}</p>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('application.coverLetter')} ({t('common.optional')})
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder={t('application.coverLetterPlaceholder')}
            />
            <p className="mt-1 text-sm text-gray-500">
              {coverLetter.length}/1000 characters
            </p>
          </div>

          {/* CAPTCHA Verification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Security Verification <span className="text-red-500">*</span>
            </label>
            <Captcha
              ref={captchaRef}
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
              onError={() => setCaptchaToken(null)}
            />
            <p className="mt-1 text-xs text-gray-500">
              Complete the verification to submit your application
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!resumeFile || !captchaToken || isValidating}
              className="flex-1"
            >
              {isSubmitting ? t('application.submitting') : t('application.submit')}
            </Button>
            {onClose && (
              <Button type="button" variant="secondary" onClick={onClose}>
                {t('common.cancel')}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobApplication;
