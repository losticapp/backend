# Lostic Backend
This is the REST/Graphql API server of the [Lostic](https://github.com/losticapp) built with [directus](https://github.com/directus/directus).  

## Installation & Setup
1. Clone this repository and run `npm i` inside the root directory.
2. Run `npx directus init` to connect to a database and create an administrator account.
3. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables in the `.env` file.
4. Run `npx migrate up` to create content types.

## Running
Run `npm start` to start the application.
