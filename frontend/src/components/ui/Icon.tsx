import React from 'react';
import { clsx } from 'clsx';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  name: string;
  size?: '16' | '20' | '24';
  className?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = '20', className, ...props }, ref) => {
    const iconSize = {
      '16': 'h-4 w-4',
      '20': 'h-5 w-5',
      '24': 'h-6 w-6',
    }[size];

    return (
      <svg
        ref={ref}
        className={clsx(iconSize, 'shrink-0', className)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        viewBox="0 0 24 24"
        aria-hidden={props['aria-hidden'] !== false}
        role={props.title ? 'img' : undefined}
        {...props}
      >
        {props.title && <title>{props.title}</title>}
        <use href={`/icons.svg#${name}`} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon };

