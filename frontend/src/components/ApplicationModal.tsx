import React, { useState, useCallback } from 'react';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { X, Upload, CheckCircle } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationData) => Promise<void>;
  jobTitle: string;
  applicantName?: string;
  applicantEmail?: string;
}

export interface ApplicationData {
  applicantName: string;
  applicantEmail: string;
  phone: string;
  coverLetter: string;
  resumeUrl: string;
  resumeFile?: File;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  jobTitle,
  applicantName = '',
  applicantEmail = ''
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ApplicationData>({
    applicantName,
    applicantEmail,
    phone: '',
    coverLetter: '',
    resumeUrl: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ApplicationData, string>> = {};

    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Name is required';
    }

    if (!formData.applicantEmail.trim()) {
      newErrors.applicantEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicantEmail)) {
      newErrors.applicantEmail = 'Invalid email format';
    }

    if (!uploadedFile && !formData.resumeUrl) {
      newErrors.resumeUrl = 'Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        resumeFile: uploadedFile || undefined
      });
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.includes('word')) {
        setUploadedFile(file);
        setErrors(prev => ({ ...prev, resumeUrl: undefined }));
      } else {
        setErrors(prev => ({ ...prev, resumeUrl: 'Please upload a PDF or Word document' }));
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type.includes('word')) {
        setUploadedFile(file);
        setErrors(prev => ({ ...prev, resumeUrl: undefined }));
      } else {
        setErrors(prev => ({ ...prev, resumeUrl: 'Please upload a PDF or Word document' }));
      }
    }
  };

  const updateField = (field: keyof ApplicationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-2xl shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary-500 to-accent-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Apply for Position</h2>
              <p className="text-white/90">{jobTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.applicantName}
                  onChange={(e) => updateField('applicantName', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.applicantName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.applicantName && (
                  <p className="mt-1 text-sm text-red-600">{errors.applicantName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.applicantEmail}
                  onChange={(e) => updateField('applicantEmail', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.applicantEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.applicantEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.applicantEmail}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume/CV</h3>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive
                  ? 'border-primary-500 bg-primary-50'
                  : errors.resumeUrl
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-primary-400 bg-gray-50'
              }`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="resume-upload"
              />
              
              {uploadedFile ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setUploadedFile(null);
                    }}
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Drag & drop your resume here
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      or click to browse (PDF, DOC, DOCX)
                    </p>
                  </div>
                </div>
              )}
            </div>
            {errors.resumeUrl && (
              <p className="mt-2 text-sm text-red-600">{errors.resumeUrl}</p>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter
            </label>
            <textarea
              value={formData.coverLetter}
              onChange={(e) => updateField('coverLetter', e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              placeholder="Tell us why you're a great fit for this position..."
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.coverLetter.length} / 1000 characters
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Icon name="refresh" size="16" className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Icon name="check" size="16" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
