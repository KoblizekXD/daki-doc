// Default non-expandable navbar

import Link from 'next/link';
import { ReactSVG } from 'react-svg';

interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  return (
    <nav
      className={`border-b bg-blend-darken backdrop-blur-[2px] gap-x-6 px-16 *:py-2 text-sm flex items-center ${className}`}>
      {children}
    </nav>
  );
};

export const RedirectingNavItem = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};
