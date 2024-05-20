import { Link } from '~/components/Link/Link';
import { Page } from '~/components/Page/Page';

export default function About() {
  return (
    <Page heading="About">
      <article className="prose prose-indigo">
        <p>
          MATH ROCK STACK is a simple yet powerful Remix stack pre-configured
          out of the box.
        </p>
        <p>
          The stack is ideal for read-heavy web applications but is flexible
          enough to handle a variety of use-cases for small-to-medium sized web
          applications.
        </p>
        <p>Its features include:</p>
        <ul>
          <li>Host: Cloudflare Pages</li>
          <li>Database: Cloudflare D1 (SQLite)</li>
          <li>ORM: Drizzle</li>
          <li>Styles: Tailwind</li>
          <li>Session storage: Cloudflare Workers KV</li>
          <li>Basic authentication using username/password</li>
          <li>Deployment pipeline using GitHub Actions</li>
        </ul>
        <p>
          Visit{' '}
          <Link external to="https://github.com/LA1CH3/math-rock-stack">
            GitHub
          </Link>{' '}
          for more information and how to get started using the stack.
        </p>
      </article>
    </Page>
  );
}
