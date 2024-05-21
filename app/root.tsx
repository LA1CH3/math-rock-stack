import { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';

import tailwindStylesHref from './tailwind.css?url';
import { Header } from './components/Header/Header';

export const meta: MetaFunction = () => [
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStylesHref },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen root font-mono">
        <Header />
        <main className="container mx-auto px-5 py-3 flex flex-1">
          <Outlet />
        </main>
        <Scripts />
      </body>
    </html>
  );
}
