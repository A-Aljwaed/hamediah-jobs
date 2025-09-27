import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
        logout: 'Logout'
      },
      index: {
        headline: 'Find your next job',
        tagline: 'Search and apply to jobs in English and Arabic.',
        cta: {
          explore: 'Explore Jobs'
        }
      },
      jobs: {
        list: {
          title: 'Latest jobs'
        },
        search: {
          placeholder: 'Search jobs...',
          button: 'Search'
        },
        empty: 'No jobs found.',
        back: 'Back to jobs'
      },
      auth: {
        login: {
          title: 'Sign in',
          button: 'Login'
        },
        username: 'Username',
        password: 'Password'
      }
    }
  },
  ar: {
    translation: {
      app: {
        title: 'وظائف حمدية'
      },
      nav: {
        jobs: 'الوظائف',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج'
      },
      index: {
        headline: 'ابحث عن وظيفتك التالية',
        tagline: 'ابحث وتقدم للوظائف باللغة الإنجليزية والعربية.',
        cta: {
          explore: 'استكشاف الوظائف'
        }
      },
      jobs: {
        list: {
          title: 'أحدث الوظائف'
        },
        search: {
          placeholder: 'البحث عن وظائف...',
          button: 'بحث'
        },
        empty: 'لم يتم العثور على وظائف.',
        back: 'العودة للوظائف'
      },
      auth: {
        login: {
          title: 'تسجيل الدخول',
          button: 'دخول'
        },
        username: 'اسم المستخدم',
        password: 'كلمة المرور'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already does escaping
    }
  });

export default i18n;