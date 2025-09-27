import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-bold">{t('index.headline')}</h1>
      <p className="text-gray-600">{t('index.tagline')}</p>
      <div>
        <Link 
          to="/jobs" 
          className="inline-block bg-black text-white px-4 py-2 rounded"
        >
          {t('index.cta.explore')}
        </Link>
      </div>
    </section>
  );
};

export default Home;