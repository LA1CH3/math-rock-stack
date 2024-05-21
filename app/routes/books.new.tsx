import { ActionFunctionArgs } from '@remix-run/cloudflare';
import { Form, json, redirect } from '@remix-run/react';
import { books } from 'db/schema';
import { Button } from '~/components/Button/Button';
import { TextArea } from '~/components/TextArea/TextArea';
import { TextField } from '~/components/TextField/TextField';

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const form = await request.formData();
  const title = form.get('title')?.toString();
  const author = form.get('author')?.toString();
  const description = form.get('description')?.toString();

  if (title && author && description) {
    await context.db.insert(books).values({
      title,
      author,
      description,
    });

    return redirect('/books');
  }

  return json({
    error: 'Something went wrong',
  });
};

export default function BooksNew() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-4xl text-heading-sm uppercase">New book</h3>
      <Form className="flex flex-col gap-6" method="post">
        <div className="flex flex-col gap-4">
          <TextField label="Title" name="title" required />
          <TextField label="Author" name="author" required />
          <TextArea label="Description" name="description" required />
        </div>
        <Button type="submit">Add new book</Button>
      </Form>
    </div>
  );
}
