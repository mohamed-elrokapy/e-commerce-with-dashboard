# my-strapi

Strapi 5 backend for the Eldopal storefront in `../frontend`. It stores the
`product` collection and uses the users-permissions plugin for accounts and roles.

## Run it locally

You need Node 20 to 24 and a PostgreSQL database.

```bash
cd my-strapi
cp .env.example .env        # then replace every "tobemodified" value with a random secret
npm install
npm run develop             # http://localhost:1337 (admin panel at /admin)
```

On first start the bootstrap script (`src/index.js`) seeds the products from
`data/products.json`. To seed demo accounts too, copy `data/users.example.json`
to `data/users.json` first. Those accounts use fake emails and passwords for
local testing only. Seeding users needs the roles below to exist.

## One-time setup in the admin panel

The REST API is closed by default. In **Settings > Users & Permissions plugin > Roles**:

1. Create a role named `admin` (this is a shop role, not a Strapi admin panel account)
   and a role named `user`.
2. Public: `product` find and findOne.
3. Authenticated and `user`: `product` find and findOne, `user` me and update.
4. `admin`: `product` find, findOne, create, update, delete; `user` me, find, findOne,
   update, destroy; users-permissions `role` find.

The frontend treats a user as an admin when their role type or name is `admin`.
This is enforced by these permissions on the server, so the frontend checks are only
a convenience.

## Environment variables

Names only. See `.env.example`.

`HOST`, `PORT`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`,
`JWT_SECRET`, `ENCRYPTION_KEY`, `DATABASE_CLIENT`, `DATABASE_URL`, `DATABASE_SSL`.

## Deploy

`../start.sh` installs, builds Strapi and the frontend, copies the frontend build into
`public/` and starts Strapi. Set `VITE_STRAPI_API_END_POINT` for the build and the
variables above on the host. Strapi serves the copied files statically and this project does not configure a
single-page-app fallback, so deep links such as `/products/abc` are likely to return
404 on a refresh. Hosting the frontend separately (for example on Vercel) avoids that.
`start.sh` has not been run against a real Railway deployment as part of this review.

## Known limitations

- CORS uses the Strapi default (all origins). Restrict it in `config/middlewares.js`
  before using this for anything real.
- Registration only accepts username, email and password, so the frontend saves the
  phone number with a second request after sign up.
- Usernames are unique, and the frontend uses the full name as the username, so two
  people with the same full name cannot both register.
- This backend was exercised locally against SQLite for the frontend integration
  check, not against PostgreSQL.
