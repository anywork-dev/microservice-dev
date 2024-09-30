import { z } from "zod";

const loginSchema = z.object({
  store: z.object({
    token: z.string(),
  user: z.object({
    confirmation: z.boolean(),
    email: z.string().email(),
    id: z.number(),
    role: z.string(),
  }),
  }),
  message: z.string().optional(),
});

const refreshSessionSchema = z.object({
  store: z.object({
    confirmation: z.object({
      attempts: z.number(),
      next: z.number(),
    }).optional(),
    token: z.string(),
    user: z.object({
      id: z.number(),
      role: z.string(),
      confirmation: z.boolean().optional(),
      email: z.string().email(),
    }),
  }),
});

const logoutSchema = z.object({
  message: z.string(),
});

const surveyStatusSchema = z.object({
  status: z.boolean(),
});

const cancelRegistrationSchema = z.object({
  message: z.string(),
});

const requestConfirmationSchema = z.object({
  message: z.string(),
  store: z.object({}).optional(), // Empty object, optional
});

const registerSchema = z.object({
  token: z.string(),
  user: z.object({
    confirmation: z.boolean(),
    email: z.string().email(),
    id: z.number(),
    role: z.string(),
  }),
});

export default {
    loginSchema,
    refreshSessionSchema,
    logoutSchema,
    surveyStatusSchema,
    cancelRegistrationSchema,
    requestConfirmationSchema,
    registerSchema,
  };
