import type { CSSProperties, ReactNode } from 'react';
import { useInView } from './utils';

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

