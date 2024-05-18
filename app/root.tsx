import {
  type LoaderFunctionArgs,
  json,
  LinksFunction,
} from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import tailwindStylesHref from './tailwind.css?url';

import { Header } from './components/Header/Header';
import { books } from 'db/schema';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStylesHref },
];

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const allBooks = await context.db.select().from(books).all();

  const session = await context.session.getSession(
    request.headers.get('Cookie'),
  );

  const currentUser = session.get('username');

  return json({ books: allBooks, currentUser });
};

export default function App() {
  // const { books, currentUser } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="py-2 px-3">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
