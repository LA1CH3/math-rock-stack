import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { Form, useActionData } from '@remix-run/react';
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
    <>
      {actionData?.error ? <p>{actionData.error}</p> : null}
      <Form method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </Form>
    </>
  );
}
