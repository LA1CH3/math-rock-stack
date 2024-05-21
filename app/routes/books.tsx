import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { Outlet, useLoaderData } from '@remix-run/react';
import { books } from 'db/schema';
import { Link } from '~/components/Link/Link';
import { SplitPage } from '~/components/SplitPage/SplitPage';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const allBooks = await context.db.select().from(books).all();

  return json({ books: allBooks });
};

export default function Books() {
  const { books } = useLoaderData<typeof loader>();

  return (
    <SplitPage heading="Books" outlet={<Outlet />}>
      {books.length ? (
        <ul className="list-disc list-inside">
          {books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>{`There's been no books added...this is awkward...`}</p>
      )}
    </SplitPage>
  );
}
