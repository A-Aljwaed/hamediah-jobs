import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ChevronIcon = isRTL ? 'rotate-180' : '';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm text-gray-600 ${className}`}
    >
      <ol className="flex items-center gap-2">
        {/* Home Link */}
        <li>
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {/* Breadcrumb Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Separator */}
              <li aria-hidden="true">
                <ChevronRight className={`h-4 w-4 text-gray-400 ${ChevronIcon}`} />
              </li>

              {/* Item */}
              <li>
                {item.path && !isLast ? (
                  <Link
                    to={item.path}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-gray-900 font-medium' : ''}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
