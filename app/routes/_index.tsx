import { LinksFunction } from '@remix-run/cloudflare';
import indexStylesHref from '~/styles/index.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: indexStylesHref },
];

export default function Index() {
  return (
    <div className="mt-auto ml-auto text-right">
      <div className="uppercase text-9xl logo mb-4">
        <div>Math</div>
        <div>Rock</div>
        <div>Stack</div>
      </div>
      <div>
        <p className="text-3xl">
          A Remix stack built with Cloudflare Pages, D1, Tailwind and more.
        </p>
      </div>
    </div>
  );
}
