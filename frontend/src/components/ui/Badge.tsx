import React from 'react';
import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200',
        primary: 'border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200',
        secondary: 'border-transparent bg-secondary-100 text-secondary-800 hover:bg-secondary-200',
        accent: 'border-transparent bg-accent-100 text-accent-800 hover:bg-accent-200',
        success: 'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        danger: 'border-transparent bg-red-100 text-red-800 hover:bg-red-200',
        outline: 'border-gray-300 text-gray-700 hover:bg-gray-50',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={clsx(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
