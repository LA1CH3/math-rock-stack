mkdir -p tmp && \
  wrangler d1 export $DATABASE_NAME --remote --no-schema --output tmp/export.sql && \
  rm -rf .wrangler
  wrangler d1 migrations apply $DATABASE_NAME && \
  wrangler d1 execute $DATABASE_NAME --local --file tmp/export.sql && \
    rm -rf tmp