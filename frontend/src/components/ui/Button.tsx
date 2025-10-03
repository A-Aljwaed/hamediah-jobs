import React from 'react';
import { clsx } from 'clsx';
import { Icon } from './Icon';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm',
        primary: 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 focus:ring-primary-500 shadow-md hover:shadow-lg transform hover:scale-105',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-primary-500 shadow-sm',
        accent: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-md hover:shadow-lg transform hover:scale-105',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
        outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-primary-500 shadow-sm',
        ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500',
        link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline focus:ring-primary-500',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        default: 'h-11 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
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
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }), 'gap-2')}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Icon name="spinner" size="20" className="animate-spin" aria-hidden="true" />
            {children}
          </>
        ) : (
          <>
            {icon && <Icon name={icon} size="20" aria-hidden="true" />}
            {children}
            {iconRight && <Icon name={iconRight} size="20" aria-hidden="true" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
