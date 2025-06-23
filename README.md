# Fullstack GraphQL API con Node.js, Prisma, SQLite, JWT y Zod

This project is a API GraphQL developed with **Node.js** y **Prisma ORM**, include:

- Authentication and Authorization with **JWT**
- Strict Validation using **Zod**
- Database **SQLite**
- Rol access (`USER`, `ADMIN`)
- Modular and clean structure

---

## Tech stack

- [Node.js](https://nodejs.org/)
- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [Zod](https://zod.dev/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---

## 📦 Instalation and use 

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
npm install
npx prisma migrate dev --name init
npx prisma studio  # Optional: to see the data
npm start | nodemon index.js
