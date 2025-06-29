import type { FC, ReactNode } from 'react';

export const Skeleton: FC<{ className?: string; children?: ReactNode }> = ({
  className = '',
  children,
}) => <div className={`animate-pulse rounded ${className}`}>{children}</div>;
