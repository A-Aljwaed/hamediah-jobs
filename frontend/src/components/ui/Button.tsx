import React from 'react';
import { clsx } from 'clsx';
import { Icon } from './Icon';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg',
        primary: 'text-white focus:ring-primary-500 shadow-md hover:shadow-xl transform hover:scale-[1.02]',
        secondary: 'bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-white hover:border-gray-300 focus:ring-primary-500 shadow-sm hover:shadow-md',
        accent: 'text-white focus:ring-secondary-500 shadow-md hover:shadow-xl transform hover:scale-[1.02]',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
        outline: 'border border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-primary-500 shadow-sm hover:shadow-md',
        ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500',
        link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline focus:ring-primary-500',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        default: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
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
      ? { background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)' }
      : variant === 'accent'
      ? { background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' }
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
