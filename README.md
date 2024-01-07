Role-Based Access Control (RBAC) - Test

## Features

- Basic Auth
- Roles [ admin , user ]
- Administrators can write , update, and delete a single blog and also create a user
- User can read and write a blog

## Documentation

Postman: [See documentation](https://documenter.getpostman.com/view/11724511/2s9YsJBXnj)

Auth

```
POST /api/v1/auth/login
```

Blog

```
POST /api/v1/blogs
GET /api/v1/blogs
GET /api/v1/blogs/:blogId
DELETE /api/v1/blogs/:blogId
PATCH /api/v1/blogs/:blogId
```

## Tech Stack

- Node Js
- Typescript
- Express
- MongoDB
- Jest
- Postman

## Clone this project

```
git clone https://github.com/mr-chidex/RBAC.git
```

```
cd RBAC
```

## Configure the app

- Create a file named `.env` in the project root directory
- Add the environment variables as described in the `env.example` file

## Install dependencies

```
yarn install
```

## Running this project locally

```
yarn dev
```
