import { Link } from '@remix-run/react';

const navRoutes = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/books', label: 'Books' },
];

export function Header() {
  return (
    <header className="flex flex-col items-center sm:flex-row">
      <h1 className="uppercase text-xl sm:mr-auto">Math Rock Stack</h1>
      <nav>
        <ul className="flex flex-col items-center justify-center sm:items-start sm:flex-row gap-1 sm:gap-4">
          {navRoutes.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="uppercase hover:underline underline-offset-2"
            >
              {label}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
