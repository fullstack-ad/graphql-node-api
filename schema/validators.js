const { z } = require('zod');

const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format")
});

const postSchema = z.object({
    title: z.string().min(5, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
    userId: z.coerce.number().int().positive("User ID must be a positive integer"),
});

const paginationSchema = z.object({
    limit: z.coerce.number().int().positive().max(100).default(10),
    offset: z.coerce.number().int().nonnegative().default(0),
});

module.exports ={
    userSchema,
    postSchema,
    paginationSchema
}