## Steps

- Create cloudflare account
- Create pages project, D1 database, KV namespace
- Update wrangler.toml with account ID, resource names and IDs
- Create API token
- Store token in Github actions secret
- Store session secret in Cloudflare settings

## Todo

- Github action for preview environments on PR
- Tests with Vitest?
- Document title on pages
- CSP
- 404 pages

## Resources

- https://remix.run/docs/en/main/guides/vite#cloudflare
- https://kevinkipp.com/blog/going-full-stack-on-astro-with-cloudflare-d1-and-drizzle/
- https://remix.run/docs/en/main/guides/vite#augmenting-load-context
- https://remix.run/docs/en/main/utils/sessions
