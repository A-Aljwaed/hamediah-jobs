import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import namespaced translations
import jobsEn from './locales/en/jobs.json';
import jobsAr from './locales/ar/jobs.json';

// Translation resources
const resources = {
  en: {
    translation: {
      app: {
        title: 'Hamediah Jobs'
      },
      nav: {
        jobs: 'Jobs',
        login: 'Login',
        logout: 'Logout',
        createJob: 'Post Job',
        admin: 'Admin'
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        apply: 'Apply',
        submit: 'Submit',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        clear: 'Clear',
        required: 'Required',
        optional: 'Optional'
      },
      index: {
        headline: 'Find your next job',
        tagline: 'Search and apply to jobs in English and Arabic.',
        cta: {
          explore: 'Explore Jobs'
        },
        categories: {
          title: 'Popular Job Categories',
          subtitle: 'Explore opportunities in the most in-demand fields'
        },
        features: {
          title: 'Why Choose Hamediah Jobs?',
          subtitle: 'Your gateway to exciting career opportunities with bilingual support',
          bilingual: {
            title: 'Bilingual Support',
            description: 'Search and apply for jobs in both English and Arabic with full RTL support'
          },
          fast: {
            title: 'Fast & Easy',
            description: 'Quick job search with powerful filtering and instant results'
          },
          quality: {
            title: 'Quality Jobs',
            description: 'Curated job listings from trusted employers and companies'
          }
        },
        stats: {
          jobs: 'Active Jobs',
          companies: 'Companies',
          seekers: 'Job Seekers',
          success: 'Success Rate'
        }
      },
      jobs: {
        list: {
          title: 'Latest Jobs',
          subtitle: 'Discover your next career opportunity from our curated collection of job listings'
        },
        search: {
          placeholder: 'Job title, keywords, or company',
          location: 'Location',
          button: 'Search Jobs'
        },
        filters: {
          title: 'Filters',
          type: 'Job Type',
          level: 'Experience Level',
          salary: 'Salary Range',
          remote: 'Remote Work',
          fullTime: 'Full-time',
          partTime: 'Part-time',
          contract: 'Contract',
          internship: 'Internship'
        },
        card: {
          viewDetails: 'View Details',
          saveJob: 'Save Job',
          applied: 'Applied',
          company: 'Company',
          location: 'Location',
          type: 'Type',
          posted: 'Posted',
          salary: 'Salary'
        },
        empty: 'No jobs found. Try adjusting your search criteria.',
        back: 'Back to Jobs',
        loadMore: 'Load More Jobs'
      },
      jobDetail: {
        applyNow: 'Apply Now',
        saveJob: 'Save Job',
        share: 'Share',
        applied: 'Applied',
        description: 'Job Description',
        summary: 'Job Summary',
        company: 'About the Company',
        requirements: 'Requirements',
        benefits: 'Benefits',
        viewCompany: 'View Company Profile',
        notFound: 'Job Not Found',
        backToJobs: 'Browse All Jobs'
      },
      application: {
        title: 'Apply for Position',
        loginRequired: 'Login Required',
        loginMessage: 'You need to be logged in to apply for jobs.',
        loginButton: 'Login to Apply',
        applicantInfo: 'Applicant Information',
        resume: 'Resume/CV',
        resumeRequired: 'Resume is required',
        resumeUpload: 'Click to upload or drag and drop',
        resumeFormat: 'PDF files only, max 5MB',
        resumeSuccess: 'Resume uploaded successfully',
        resumeError: 'Only PDF files are allowed for resumes',
        resumeSizeError: 'File size must be less than 5MB',
        coverLetter: 'Cover Letter',
        coverLetterPlaceholder: 'Tell us why you\'re interested in this position and what makes you a great fit...',
        submit: 'Submit Application',
        submitting: 'Submitting Application...',
        success: 'Application submitted successfully!',
        error: 'Failed to submit application. Please try again.'
      },
      auth: {
        login: {
          title: 'Sign In',
          subtitle: 'Welcome back! Please sign in to your account.',
          button: 'Sign In',
          noAccount: 'Don\'t have an account?',
          signUp: 'Sign up'
        },
        register: {
          title: 'Create Account',
          subtitle: 'Join thousands of job seekers finding their dream jobs.',
          button: 'Create Account',
          hasAccount: 'Already have an account?',
          signIn: 'Sign in'
        },
        username: 'Username',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        forgotPassword: 'Forgot Password?',
        rememberMe: 'Remember me'
      },
      createJob: {
        title: 'Post a New Job',
        subtitle: 'Find the perfect candidate for your open position.',
        basicInfo: 'Basic Information',
        jobTitle: 'Job Title',
        company: 'Company Name',
        location: 'Location',
        type: 'Job Type',
        level: 'Experience Level',
        salary: 'Salary Range',
        description: 'Job Description',
        requirements: 'Requirements',
        benefits: 'Benefits',
        tags: 'Tags',
        publish: 'Publish Job',
        draft: 'Save as Draft',
        preview: 'Preview'
      },
      admin: {
        title: 'Admin Dashboard',
        jobs: 'Manage Jobs',
        users: 'Manage Users',
        reports: 'Reports',
        settings: 'Settings',
        deleteJob: 'Delete Job',
        confirmDelete: 'Are you sure you want to delete this job?',
        deleteSuccess: 'Job deleted successfully',
        deleteError: 'Failed to delete job'
      },
      footer: {
        quickLinks: 'Quick Links',
        company: 'Company',
        browseJobs: 'Browse Jobs',
        signIn: 'Sign In',
        helpCenter: 'Help Center',
        contactUs: 'Contact Us',
        aboutUs: 'About Us',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        careers: 'Careers',
        copyright: 'All rights reserved',
        madeWith: 'Made with ❤️ for job seekers worldwide'
      }
    },
    jobs: jobsEn
  },
  ar: {
    translation: {
      app: {
        title: 'وظائف حمدية'
      },
      nav: {
        jobs: 'الوظائف',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        createJob: 'نشر وظيفة',
        admin: 'الإدارة'
      },
      common: {
        loading: 'جاري التحميل...',
        error: 'خطأ',
        success: 'نجح',
        cancel: 'إلغاء',
        save: 'حفظ',
        delete: 'حذف',
        edit: 'تعديل',
        view: 'عرض',
        apply: 'تقدم',
        submit: 'إرسال',
        close: 'إغلاق',
        back: 'رجوع',
        next: 'التالي',
        previous: 'السابق',
        search: 'بحث',
        filter: 'تصفية',
        sort: 'ترتيب',
        clear: 'مسح',
        required: 'مطلوب',
        optional: 'اختياري'
      },
      index: {
        headline: 'ابحث عن وظيفتك التالية',
        tagline: 'ابحث وتقدم للوظائف باللغة الإنجليزية والعربية.',
        cta: {
          explore: 'استكشاف الوظائف'
        },
        categories: {
          title: 'فئات الوظائف الشائعة',
          subtitle: 'استكشف الفرص في المجالات الأكثر طلباً'
        },
        features: {
          title: 'لماذا تختار وظائف حمدية؟',
          subtitle: 'بوابتك إلى فرص مهنية مثيرة مع دعم ثنائي اللغة',
          bilingual: {
            title: 'دعم ثنائي اللغة',
            description: 'ابحث وتقدم للوظائف باللغتين الإنجليزية والعربية مع دعم كامل للكتابة من اليمين إلى اليسار'
          },
          fast: {
            title: 'سريع وسهل',
            description: 'بحث سريع عن الوظائف مع تصفية قوية ونتائج فورية'
          },
          quality: {
            title: 'وظائف عالية الجودة',
            description: 'قوائم وظائف منتقاة من أصحاب عمل وشركات موثوقة'
          }
        },
        stats: {
          jobs: 'وظيفة نشطة',
          companies: 'شركة',
          seekers: 'باحث عن عمل',
          success: 'معدل النجاح'
        }
      },
      jobs: {
        list: {
          title: 'أحدث الوظائف',
          subtitle: 'اكتشف فرصتك المهنية التالية من مجموعتنا المنتقاة من إعلانات الوظائف'
        },
        search: {
          placeholder: 'المسمى الوظيفي، الكلمات المفتاحية، أو الشركة',
          location: 'الموقع',
          button: 'البحث عن وظائف'
        },
        filters: {
          title: 'التصفية',
          type: 'نوع الوظيفة',
          level: 'مستوى الخبرة',
          salary: 'نطاق الراتب',
          remote: 'العمل عن بُعد',
          fullTime: 'دوام كامل',
          partTime: 'دوام جزئي',
          contract: 'عقد',
          internship: 'تدريب'
        },
        card: {
          viewDetails: 'عرض التفاصيل',
          saveJob: 'حفظ الوظيفة',
          applied: 'تم التقديم',
          company: 'الشركة',
          location: 'الموقع',
          type: 'النوع',
          posted: 'تاريخ النشر',
          salary: 'الراتب'
        },
        empty: 'لم يتم العثور على وظائف. حاول تعديل معايير البحث.',
        back: 'العودة للوظائف',
        loadMore: 'تحميل المزيد من الوظائف'
      },
      jobDetail: {
        applyNow: 'تقدم الآن',
        saveJob: 'حفظ الوظيفة',
        share: 'مشاركة',
        applied: 'تم التقديم',
        description: 'وصف الوظيفة',
        summary: 'ملخص الوظيفة',
        company: 'عن الشركة',
        requirements: 'المتطلبات',
        benefits: 'المزايا',
        viewCompany: 'عرض ملف الشركة',
        notFound: 'الوظيفة غير موجودة',
        backToJobs: 'تصفح جميع الوظائف'
      },
      application: {
        title: 'التقدم للوظيفة',
        loginRequired: 'تسجيل الدخول مطلوب',
        loginMessage: 'تحتاج إلى تسجيل الدخول للتقدم للوظائف.',
        loginButton: 'تسجيل الدخول للتقديم',
        applicantInfo: 'معلومات المتقدم',
        resume: 'السيرة الذاتية',
        resumeRequired: 'السيرة الذاتية مطلوبة',
        resumeUpload: 'انقر للرفع أو اسحب وأفلت',
        resumeFormat: 'ملفات PDF فقط، حد أقصى 5 ميجابايت',
        resumeSuccess: 'تم رفع السيرة الذاتية بنجاح',
        resumeError: 'ملفات PDF فقط مسموحة للسير الذاتية',
        resumeSizeError: 'حجم الملف يجب أن يكون أقل من 5 ميجابايت',
        coverLetter: 'خطاب التغطية',
        coverLetterPlaceholder: 'أخبرنا لماذا أنت مهتم بهذه الوظيفة وما الذي يجعلك مناسباً لها...',
        submit: 'إرسال الطلب',
        submitting: 'جاري إرسال الطلب...',
        success: 'تم إرسال الطلب بنجاح!',
        error: 'فشل في إرسال الطلب. يرجى المحاولة مرة أخرى.'
      },
      auth: {
        login: {
          title: 'تسجيل الدخول',
          subtitle: 'مرحباً بعودتك! يرجى تسجيل الدخول إلى حسابك.',
          button: 'تسجيل الدخول',
          noAccount: 'ليس لديك حساب؟',
          signUp: 'إنشاء حساب'
        },
        register: {
          title: 'إنشاء حساب',
          subtitle: 'انضم إلى آلاف الباحثين عن عمل الذين يجدون وظائف أحلامهم.',
          button: 'إنشاء حساب',
          hasAccount: 'لديك حساب بالفعل؟',
          signIn: 'تسجيل الدخول'
        },
        username: 'اسم المستخدم',
        email: 'عنوان البريد الإلكتروني',
        password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور',
        forgotPassword: 'نسيت كلمة المرور؟',
        rememberMe: 'تذكرني'
      },
      createJob: {
        title: 'نشر وظيفة جديدة',
        subtitle: 'ابحث عن المرشح المثالي لوظيفتك الشاغرة.',
        basicInfo: 'المعلومات الأساسية',
        jobTitle: 'المسمى الوظيفي',
        company: 'اسم الشركة',
        location: 'الموقع',
        type: 'نوع الوظيفة',
        level: 'مستوى الخبرة',
        salary: 'نطاق الراتب',
        description: 'وصف الوظيفة',
        requirements: 'المتطلبات',
        benefits: 'المزايا',
        tags: 'العلامات',
        publish: 'نشر الوظيفة',
        draft: 'حفظ كمسودة',
        preview: 'معاينة'
      },
      admin: {
        title: 'لوحة الإدارة',
        jobs: 'إدارة الوظائف',
        users: 'إدارة المستخدمين',
        reports: 'التقارير',
        settings: 'الإعدادات',
        deleteJob: 'حذف الوظيفة',
        confirmDelete: 'هل أنت متأكد من أنك تريد حذف هذه الوظيفة؟',
        deleteSuccess: 'تم حذف الوظيفة بنجاح',
        deleteError: 'فشل في حذف الوظيفة'
      },
      footer: {
        quickLinks: 'روابط سريعة',
        company: 'الشركة',
        browseJobs: 'تصفح الوظائف',
        signIn: 'تسجيل الدخول',
        helpCenter: 'مركز المساعدة',
        contactUs: 'اتصل بنا',
        aboutUs: 'من نحن',
        privacyPolicy: 'سياسة الخصوصية',
        termsOfService: 'شروط الخدمة',
        careers: 'الوظائف',
        copyright: 'جميع الحقوق محفوظة',
        madeWith: 'صُنع بـ ❤️ للباحثين عن عمل في جميع أنحاء العالم'
      }
    },
    jobs: jobsAr
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // Get from localStorage or default to English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already does escaping
    },
    react: {
      useSuspense: false
    }
  });

// Listen for language changes and update document direction
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

// Set initial direction
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = i18n.language;

export default i18n;