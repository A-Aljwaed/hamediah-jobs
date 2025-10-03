import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const currentLanguage = i18n.language === 'ar' ? 'العربية' : 'English';
  const nextLanguage = i18n.language === 'ar' ? 'English' : 'العربية';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      title={`Switch to ${nextLanguage}`}
    >
      <Icon name="globe" size="16" aria-hidden="true" />
      <span className="hidden sm:inline">{currentLanguage}</span>
    </Button>
  );
};

export default LanguageSwitcher;
