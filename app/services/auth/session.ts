import { AppLoadContext } from '@remix-run/node';

export type SessionUser = {
  id: number;
  username: string;
};

export async function getSession(context: AppLoadContext, request: Request) {
  return context.session.getSession(request.headers.get('Cookie'));
}

export async function getCurrentUser(
  context: AppLoadContext,
  request: Request,
) {
  const session = await getSession(context, request);

  const sessionUserId = session.get('id');
  const sessionUserName = session.get('username');

  if (sessionUserId && sessionUserName) {
    return {
      id: sessionUserId,
      username: sessionUserName,
    };
  }
}
