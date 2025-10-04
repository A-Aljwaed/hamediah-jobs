import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, Check, Upload, X } from 'lucide-react';
import { postJobSchema, PostJobFormData } from '../validation/schemas';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FormField } from '../components/FormField';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'jobInfo', key: 'post.steps.jobInfo' },
  { id: 'companyInfo', key: 'post.steps.companyInfo' },
  { id: 'recruiterInfo', key: 'post.steps.recruiterInfo' },
];

export const PostJobPage: React.FC = () => {
  const { t, i18n } = useTranslation('jobs');
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');
  const isRTL = i18n.language === 'ar';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    getValues,
    setValue,
  } = useForm<PostJobFormData>({
    resolver: zodResolver(postJobSchema),
    mode: 'onBlur',
    defaultValues: {
      remote: false,
      skills: [],
      benefits: [],
      salaryCurrency: 'USD',
    },
  });

  // Sync skills and benefits with form
  React.useEffect(() => {
    setValue('skills', skills);
  }, [skills, setValue]);

  React.useEffect(() => {
    setValue('benefits', benefits);
  }, [benefits, setValue]);

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput('');
      }
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addBenefit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && benefitInput.trim()) {
      e.preventDefault();
      if (!benefits.includes(benefitInput.trim())) {
        setBenefits([...benefits, benefitInput.trim()]);
        setBenefitInput('');
      }
    }
  };

  const removeBenefit = (benefit: string) => {
    setBenefits(benefits.filter((b) => b !== benefit));
  };

  const validateStep = async () => {
    let fieldsToValidate: (keyof PostJobFormData)[] = [];

    switch (currentStep) {
      case 0: // Job Info
        fieldsToValidate = [
          'title',
          'description',
          'location',
          'jobType',
          'experienceLevel',
          'remote',
        ];
        if (getValues('salaryMin') || getValues('salaryMax')) {
          fieldsToValidate.push('salaryMin', 'salaryMax');
        }
        break;
      case 1: // Company Info
        fieldsToValidate = ['companyName', 'companyWebsite'];
        break;
      case 2: // Recruiter Info
        fieldsToValidate = ['recruiterName', 'recruiterEmail', 'recruiterPhone'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: PostJobFormData) => {
    try {
      // Validate skills requirement
      if (skills.length === 0) {
        toast.error('At least one skill is required');
        return;
      }

      // In real app: await jobService.createJob(data);
      console.log('Submitting job:', { ...data, skills, benefits });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(t('post.success.message'));
      navigate('/jobs/browse');
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error(t('post.errors.generic'));
    }
  };

  const breadcrumbItems = [
    { label: t('breadcrumbs.jobs'), path: '/jobs' },
    { label: t('breadcrumbs.post') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={breadcrumbItems} className="mb-4" />
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('post.title')}
            </h1>
            <p className="text-gray-600">{t('post.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold
                      transition-colors duration-200
                      ${
                        index < currentStep
                          ? 'bg-primary-500 text-white'
                          : index === currentStep
                          ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                          : 'bg-gray-200 text-gray-600'
                      }
                    `}
                  >
                    {index < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`
                      mt-2 text-xs sm:text-sm font-medium text-center
                      ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}
                    `}
                  >
                    {t(step.key)}
                  </span>
                </div>

                {index < STEPS.length - 1 && (
                  <div
                    className={`
                      h-1 flex-1 mx-2 transition-colors duration-200
                      ${index < currentStep ? 'bg-primary-500' : 'bg-gray-200'}
                    `}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-6">
            {/* Step 1: Job Info */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {t('post.jobInfo.title')}
                  </h2>
                  <p className="text-gray-600">{t('post.jobInfo.subtitle')}</p>
                </div>

                <FormField
                  label={t('post.jobInfo.jobTitle')}
                  name="title"
                  error={errors.title?.message}
                  required
                >
                  <Input
                    {...register('title')}
                    placeholder={t('post.jobInfo.jobTitlePlaceholder')}
                    className="w-full"
                  />
                </FormField>

                <FormField
                  label={t('post.jobInfo.description')}
                  name="description"
                  error={errors.description?.message}
                  required
                >
                  <textarea
                    {...register('description')}
                    placeholder={t('post.jobInfo.descriptionPlaceholder')}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </FormField>

                <FormField
                  label={t('post.jobInfo.location')}
                  name="location"
                  error={errors.location?.message}
                  required
                >
                  <Input
                    {...register('location')}
                    placeholder={t('post.jobInfo.locationPlaceholder')}
                    className="w-full"
                  />
                </FormField>

                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    label={t('post.jobInfo.jobType')}
                    name="jobType"
                    error={errors.jobType?.message}
                    required
                  >
                    <select
                      {...register('jobType')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="full-time">{t('browse.filters.types.fullTime')}</option>
                      <option value="part-time">{t('browse.filters.types.partTime')}</option>
                      <option value="contract">{t('browse.filters.types.contract')}</option>
                      <option value="internship">{t('browse.filters.types.internship')}</option>
                    </select>
                  </FormField>

                  <FormField
                    label={t('post.jobInfo.experienceLevel')}
                    name="experienceLevel"
                    error={errors.experienceLevel?.message}
                    required
                  >
                    <select
                      {...register('experienceLevel')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="entry">{t('browse.filters.levels.entry')}</option>
                      <option value="mid">{t('browse.filters.levels.mid')}</option>
                      <option value="senior">{t('browse.filters.levels.senior')}</option>
                      <option value="lead">{t('browse.filters.levels.lead')}</option>
                    </select>
                  </FormField>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    {t('post.jobInfo.salary')}
                  </label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Input
                      {...register('salaryMin', { valueAsNumber: true })}
                      type="number"
                      placeholder={t('post.jobInfo.salaryMin')}
                    />
                    <Input
                      {...register('salaryMax', { valueAsNumber: true })}
                      type="number"
                      placeholder={t('post.jobInfo.salaryMax')}
                    />
                    <select
                      {...register('salaryCurrency')}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="SAR">SAR</option>
                    </select>
                  </div>
                  {(errors.salaryMin || errors.salaryMax) && (
                    <p className="text-sm text-danger mt-1">
                      {errors.salaryMin?.message || errors.salaryMax?.message}
                    </p>
                  )}
                </div>

                <FormField
                  label={t('post.jobInfo.skills')}
                  name="skills"
                  error={skills.length === 0 ? 'At least one skill is required' : undefined}
                  required
                >
                  <div className="space-y-3">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={addSkill}
                      placeholder={t('post.jobInfo.skillsPlaceholder')}
                      className="w-full"
                    />
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="gap-2">
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="hover:text-danger"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>

                <FormField
                  label={t('post.jobInfo.benefits')}
                  name="benefits"
                >
                  <div className="space-y-3">
                    <Input
                      value={benefitInput}
                      onChange={(e) => setBenefitInput(e.target.value)}
                      onKeyDown={addBenefit}
                      placeholder={t('post.jobInfo.benefitsPlaceholder')}
                      className="w-full"
                    />
                    {benefits.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {benefits.map((benefit) => (
                          <Badge key={benefit} variant="secondary" className="gap-2">
                            {benefit}
                            <button
                              type="button"
                              onClick={() => removeBenefit(benefit)}
                              className="hover:text-danger"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>

                <div className="flex items-center gap-3">
                  <input
                    {...register('remote')}
                    type="checkbox"
                    id="remote"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="remote" className="text-sm font-medium text-gray-700">
                    {t('post.jobInfo.remote')}
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Company Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {t('post.companyInfo.title')}
                  </h2>
                  <p className="text-gray-600">{t('post.companyInfo.subtitle')}</p>
                </div>

                <FormField
                  label={t('post.companyInfo.companyName')}
                  name="companyName"
                  error={errors.companyName?.message}
                  required
                >
                  <Input {...register('companyName')} className="w-full" />
                </FormField>

                <FormField
                  label={t('post.companyInfo.companyWebsite')}
                  name="companyWebsite"
                  error={errors.companyWebsite?.message}
                >
                  <Input
                    {...register('companyWebsite')}
                    type="url"
                    placeholder="https://example.com"
                    className="w-full"
                  />
                </FormField>

                <FormField
                  label={t('post.companyInfo.companyLogo')}
                  name="companyLogo"
                  hint={t('post.companyInfo.logoHint')}
                >
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-2">
                      {t('post.companyInfo.uploadLogo')}
                    </p>
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload">
                      <Button type="button" variant="outline" size="sm" as="span">
                        Choose File
                      </Button>
                    </label>
                  </div>
                </FormField>
              </div>
            )}

            {/* Step 3: Recruiter Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {t('post.recruiterInfo.title')}
                  </h2>
                  <p className="text-gray-600">{t('post.recruiterInfo.subtitle')}</p>
                </div>

                <FormField
                  label={t('post.recruiterInfo.recruiterName')}
                  name="recruiterName"
                  error={errors.recruiterName?.message}
                  required
                >
                  <Input {...register('recruiterName')} className="w-full" />
                </FormField>

                <FormField
                  label={t('post.recruiterInfo.recruiterEmail')}
                  name="recruiterEmail"
                  error={errors.recruiterEmail?.message}
                  required
                >
                  <Input {...register('recruiterEmail')} type="email" className="w-full" />
                </FormField>

                <FormField
                  label={t('post.recruiterInfo.recruiterPhone')}
                  name="recruiterPhone"
                  error={errors.recruiterPhone?.message}
                >
                  <Input {...register('recruiterPhone')} type="tel" className="w-full" />
                </FormField>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {t('post.actions.back')}
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button type="button" variant="primary" onClick={handleNext} className="gap-2">
                {t('post.actions.next')}
                {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? t('post.actions.submitting') : t('post.actions.submit')}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
