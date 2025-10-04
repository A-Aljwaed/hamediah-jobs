import React from 'react';
import { useTranslation } from 'react-i18next';

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  error,
  hint,
  required = false,
  children,
  className = '',
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Label */}
      <label
        htmlFor={name}
        className={`block text-sm font-medium text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}
      >
        {label}
        {required && (
          <span className="text-danger ms-1" aria-label={t('common.required')}>
            *
          </span>
        )}
      </label>

      {/* Input/Control */}
      <div className="relative">{children}</div>

      {/* Hint or Error Message */}
      {(hint || error) && (
        <div
          className={`text-sm ${isRTL ? 'text-right' : 'text-left'} ${
            error ? 'text-danger' : 'text-gray-500'
          }`}
          role={error ? 'alert' : undefined}
          aria-live={error ? 'polite' : undefined}
        >
          {error || hint}
        </div>
      )}
    </div>
  );
};
