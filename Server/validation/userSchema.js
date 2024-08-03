const { z } = require("zod");

const registerSchema = z
  .object({
    body: z.object({
      username: z.string().min(6, "username is 6 characters long"),
      email: z.string().email("email not valid"),
      password: z.string().min(6, "password atleast 6 characters long"),
      confirmPassword: z
        .string()
        .min(6, "confirmPassword atleast 6 characters long"),
    }),
  })
  .refine((data) => data.body.password === data.body.confirmPassword, {
    message: "password do not match",
    path: ["body", "confirmPassword"],
  });

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("email not valid"),
    password: z.string().min(6, "password atleast 6 characters long"),
  }),
});

module.exports = { registerSchema, loginSchema };
