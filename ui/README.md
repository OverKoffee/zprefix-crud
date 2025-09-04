# Z-prefix Solo App

This is a basic CRUD app demonstrating a plaintext user and guest login. The app allows the user to perform all CRUD operations against an item inventory database. The app also allows guests to view the inventory but cannot perform CRUD operations.

## How-to

### Run API (http://localhost:5000)

    cd api
    npm install
    npm run dev

### Run UI (http://localhost:8080)

    cd ui
    npm install
    npm run dev

### Create Postgres database

    createdb -U postgres zprefix

### Run migrations

    npx knex migrate:latest

### Run seeds

    npx knex seed:run

### Notes:

# If needed, rollback migrations

        cd api
        npx knex migrate:rollback --all

## Default User Logins (from seeds)

    username: bross
    password: painting

    username: ozzy
    password: rocks
