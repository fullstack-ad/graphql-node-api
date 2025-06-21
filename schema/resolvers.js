const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { userSchema, postSchema, paginationSchema } = require("./validators");

let users = [
    { id: "1", name: "Andy", email: "andy@gmail.com" },
    { id: "2", name: "Sandra", email: "sandra@gmail.com" }];

const resolvers = {
    Query: {
        users: async () => await prisma.user.findMany({ include: { posts: true } }),
        user: async (_, { id }) =>
            await prisma.user.findUnique({
                where: { id: parseInt(id) },
                include: { posts: true }
            }),
        posts: async (_, args) => {
            const { limit, offset } = paginationSchema.parse(args);

            return await prisma.post.findMany({
                skip: offset,
                take: limit,
                include: { user: true }
            })
        },
        post: async (_, { id }) =>
            await prisma.post.findUnique({
                where: { id: parseInt(id) },
                include: { user: true }
            }),
    },
    Mutation: {
        addUser: async (_, input) => {
            const { name, email } = userSchema.parse(input);
            // Check if user with the same email already exists
            const existingUser = await prisma.user.findUnique({ where: { email } });

            if (existingUser) {
                throw new Error("User with this email already exists");
            }

            const newUser = await prisma.user.create({
                data: { name, email }
            })

            return newUser;
        },
        addPost: async (_, input) => {
            const { userId, title, content } = postSchema.parse(input);

            // check if user exists
            const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

            if (!user) {
                throw new Error("user not found");
            }

            return await prisma.post.create({
                data: {
                    title,
                    content,
                    userId: parseInt(userId)
                }
            });
        },
    },

    //Resolver per type
    // User: {
    //     posts: async (parent) =>
    //         await prisma.post.findMany({ where: { userId: parent.id } }),
    // },

    // Post: {
    //     user: async (parent) =>
    //         await prisma.user.findUnique({ where: { id: parent.userId } }),
    // },
}

module.exports = resolvers;