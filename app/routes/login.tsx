import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/cloudflare';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/Button/Button';
import { TextField } from '~/components/TextField/TextField';
import { login } from '~/services/auth/login';
import { getCurrentUser, getSession } from '~/services/auth/session';

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const currentUser = await getCurrentUser(context, request);

  return json({ currentUser });
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const session = await getSession(context, request);

  const form = await request.formData();
  const action = form.get('_action')?.toString();

  if (action === 'LOGOUT') {
    return redirect('/', {
      headers: {
        'Set-Cookie': await context.session.destroySession(session),
      },
    });
  } else if (action === 'LOGIN') {
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
  }

  return json({
    error: 'Something went wrong',
  });
};

export default function AdminLogin() {
  const { currentUser } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full">
      <h2 className="text-6xl uppercase text-heading">Login</h2>
      {currentUser ? (
        <div className="flex flex-col items-center gap-4">
          <p>Looks like you are already logged in.</p>
          <Form method="post">
            <input type="hidden" name="_action" value="LOGOUT" />
            <Button type="submit">Logout</Button>
          </Form>
        </div>
      ) : (
        <>
          {actionData?.error ? <p>{actionData.error}</p> : null}
          <Form className="flex flex-col gap-6" method="post">
            <div className="flex flex-col gap-4">
              <input type="hidden" name="_action" value="LOGIN" />
              <TextField label="Username" name="username" />
              <TextField label="Password" name="password" type="password" />
            </div>
            <Button type="submit">Login</Button>
          </Form>
        </>
      )}
    </section>
  );
}
