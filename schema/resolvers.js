const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { userSchema, postSchema, paginationSchema } = require("./validators");
const { generateToken, verifyToken } = require("../utils/auth");

const bcrypt = require("bcrypt");

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
        addUser: async (_, input, context) => {
            const { name, email, password, role } = userSchema.parse(input);

            if(!context.user || context.user.role !== 'ADMIN'){
                throw new Error(`Unauthorized: You must be an admin to add users  ${context.user.role}`);
            }
            
            const existingUser = await prisma.user.findUnique({ where: { email } });

            if (existingUser) {
                throw new Error("User with this email already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: { name, email, password: hashedPassword, role }
            })

            return newUser;
        },
        addPost: async (_, input, context) => {
            if (!context.user) {
                throw new Error("Unauthorized: you must be logged in to add a post");
            }

            const { title, content } = postSchema.parse(input);

            const userId = context.user.userId;

            return await prisma.post.create({
                data: {
                    title,
                    content,
                    userId
                }
            });
        },
        login: async (_, { email, password }) => {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                throw new Error("User not found");
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error("Invalid creadentials");
            }

            const token = generateToken(user);
            return {
                token, user
            }
        },
        getPassHashed: async(_, {password})=>{
            if(!password || password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            return hashedPassword;
        }
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