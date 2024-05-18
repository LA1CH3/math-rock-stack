import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { Form, useActionData } from '@remix-run/react';
import { Button } from '~/components/Button/Button';
import { TextField } from '~/components/TextField/TextField';
import { login } from '~/services/auth/login';

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const session = await context.session.getSession(
    request.headers.get('Cookie'),
  );

  const form = await request.formData();
  const username = form.get('username')?.toString();
  const password = form.get('password')?.toString();

  if (username && password) {
    const user = await login(username, password, context.db);

    if (user) {
      session.set('id', user.id);
      session.set('username', user.username);

      return redirect('/', {
        headers: {
          'Set-Cookie': await context.session.commitSession(session),
        },
      });
    }

    return json({
      error: 'Invalid username or password',
    });
  }

  return json({
    error: 'Something went wrong',
  });
};

export default function AdminLogin() {
  const actionData = useActionData<typeof action>();

  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full">
      {actionData?.error ? <p>{actionData.error}</p> : null}
      <h2 className="text-6xl uppercase text-heading">Login</h2>
      <Form className="flex flex-col gap-4" method="post">
        <TextField label="Username" name="username" />
        <TextField label="Password" name="password" type="password" />
        <Button type="submit">Login</Button>
      </Form>
    </section>
  );
}
