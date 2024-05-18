import { LinksFunction } from '@remix-run/cloudflare';
import indexStylesHref from '~/styles/index.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: indexStylesHref },
];

export default function Index() {
  return (
    <div className="mt-auto ml-auto text-right">
      <div className="uppercase text-9xl text-heading mb-4">
        <div>Math</div>
        <div>Rock</div>
        <div>Stack</div>
      </div>
      <div>
        <p className="text-3xl">
          A Remix stack built with Cloudflare Pages, D1, Drizzle, Tailwind and
          more.
        </p>
      </div>
    </div>
  );
}
