import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { books } from "db/schema";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const db = drizzle(context.cloudflare.env.DB);

  const allBooks = await db.select().from(books).all();

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
