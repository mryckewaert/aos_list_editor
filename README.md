## Aos List Editor

_To replicate this project you need a free postgresql account for the database_

### Getting Start

    1. Clone the repo
    2. Install the deps with `npm install`
    3. Fill your .env with:

    ```
    DATABASE_URL="postgresql://..."
    GITHUB_CLIENT_ID="..."
    GITHUB_CLIENT_SECRET="..."
    ```

    4. To get GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET you need to create a new OAuth App (https://github.com/settings/developers)
    Make sure to set the redirect url to `http://localhost:5173/login/github/callback`
    5. If you don't have a backup database run `npm run migrate:create`
    6. And if you have a backup database run `npm run migrate:dev`
    7. Finally you can run `npm run dev`
