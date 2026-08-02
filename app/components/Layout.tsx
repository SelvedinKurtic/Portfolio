import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Acts as a clean fallback pass-through node block
  return <>{children}</>;
}
