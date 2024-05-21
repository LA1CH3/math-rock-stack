import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const id = params.id;
  invariant(id, 'No id provided');

  const book = await context.db.query.books.findFirst({
    where: (book, { eq }) => eq(book.id, parseInt(id)),
  });

  invariant(book, 'Book not found');

  return json({
    book,
  });
};

export default function Book() {
  const { book } = useLoaderData<typeof loader>();

  return <h1>{book.title}</h1>;
}
