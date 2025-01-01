// Default non-expandable navbar

import Link from "next/link";

interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className={'border-b gap-x-6 px-16 *:py-2 text-sm flex items-center'}>
      {children}
    </nav>
  )
}

export const RedirectingNavItem = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}