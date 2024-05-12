import { createCookieSessionStorage } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { AppDB, getDB } from "../db/utilities";
import { AppLoadContext } from "@remix-run/cloudflare";
import { pbkdf2Sync } from "crypto";

// export the whole sessionStorage object
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    ...(process.env.SESSION_SECRET
      ? { secrets: [process.env.SESSION_SECRET] }
      : {}),
    secure: process.env.NODE_ENV === "production",
  },
});

export const authenticator = new Authenticator(sessionStorage).use(
  new FormStrategy(async ({ form, context }) => {
    if (context) {
      const db = getDB(context as AppLoadContext);

      const username = form.get("username")?.toString();
      const password = form.get("password")?.toString();

      if (username && password) {
        const user = await login(username, password, db);

        return user;
      }
    }
  }),
  "user-pass",
);

export const login = async (username: string, password: string, db: AppDB) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (!user) {
    return null;
  }

  const validPassword =
    pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex") ===
    user.password;

  if (!validPassword) {
    return null;
  }

  return user;
};
