import { Link } from '@remix-run/react';

const navRoutes = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/books', label: 'Books' },
];

export function Header() {
  return (
    <header className="flex flex-col items-center sm:flex-row py-2 px-3">
      <h1 className="uppercase text-xl sm:mr-auto">
        <Link to="/" className="hover:underline underline-offset-2">
          Math Rock Stack
        </Link>
      </h1>
      <nav>
        <ul className="flex pt-2 sm:pt-0 sm:items-start sm:flex-row gap-4 sm:gap-4">
          {navRoutes.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="uppercase hover:underline underline-offset-2"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
