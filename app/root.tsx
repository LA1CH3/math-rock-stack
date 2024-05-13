import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts, useLoaderData } from '@remix-run/react';
import { books } from 'db/schema';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const allBooks = await context.db.select().from(books).all();

  return json({ books: allBooks });
};

export default function App() {
  const { books } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h2>This is a test</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
