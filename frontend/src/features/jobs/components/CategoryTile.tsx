import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { JobCategory } from '../types';

interface CategoryTileProps {
  category: JobCategory;
  className?: string;
}

export const CategoryTile: React.FC<CategoryTileProps> = ({ category, className = '' }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const categoryName = isRTL ? category.nameAr : category.name;

  // Get icon component dynamically
  const IconComponent = (Icons as any)[category.icon] as LucideIcon || Icons.Briefcase;

  return (
    <Link
      to={`/jobs/browse?category=${category.id}`}
      className={`
        group block bg-white rounded-xl p-6 border border-gray-200
        hover:border-primary-300 hover:shadow-md hover:scale-105
        transition-all duration-200
        ${className}
      `}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
          <IconComponent className="h-6 w-6 text-primary-600" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
            {categoryName}
          </h3>
          <p className="text-sm text-gray-600">
            {category.count.toLocaleString()} {isRTL ? 'وظيفة' : 'jobs'}
          </p>
        </div>
      </div>
    </Link>
  );
};
