import React from 'react';
import { clsx } from 'clsx';
import { Icon } from './Icon';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        primary: 'text-white focus:ring-primary-500',
        secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-primary-500',
        accent: 'text-white focus:ring-secondary-500',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        outline: 'border border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-primary-500',
        ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500',
        link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline focus:ring-primary-500',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        default: 'h-10 px-5 text-base',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: string;
  iconRight?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, icon, iconRight, ...props }, ref) => {
    const gradientStyle = variant === 'primary' 
      ? { background: '#10b981' }
      : variant === 'accent'
      ? { background: '#8b5cf6' }
      : {};
    
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }), 'gap-2')}
        style={(variant === 'primary' || variant === 'accent') ? gradientStyle : undefined}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Icon name="spinner" size="16" className="animate-spin" aria-hidden="true" />
            {children}
          </>
        ) : (
          <>
            {icon && <Icon name={icon} size="16" aria-hidden="true" />}
            {children}
            {iconRight && <Icon name={iconRight} size="16" aria-hidden="true" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
