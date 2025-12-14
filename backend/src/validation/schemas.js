const { z } = require("zod");

const objectIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id")
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const forgotPasswordSchema = z.object({
  email: z.string().email()
});

const resetPasswordSchema = z.object({
  token: z.string().min(10),
  newPassword: z.string().min(8)
});

const homeCreateSchema = z.object({
  headline: z.string().min(1),
  subtext: z.string().min(1),
  ctaText: z.string().min(1),
  published: z.boolean().optional()
});

const aboutCreateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1),
  profileImageUrl: z.string().min(1),
  summary: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  location: z.string().optional(),
  socials: z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional()
  }).optional(),
  resumeLink: z.string().optional(),
  published: z.boolean().optional()
});

const skillCreateSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  level: z.string().min(1).optional().nullable(),
  iconUrl: z.string().min(1).optional().or(z.literal('')), // Make optional as frontend might not send it initially
  order: z.number().int().optional(), // Make optional
  published: z.boolean().optional()
});

const projectCreateSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  techStack: z.array(z.string()).optional(),
  imageUrls: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional().nullable().or(z.literal('')),
  githubUrl: z.string().url().optional().nullable().or(z.literal('')),
  order: z.number().int().optional(),
  published: z.boolean().optional()
});

const experienceCreateSchema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int(),
  published: z.boolean().optional()
});

const messageCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1)
});

const messageUpdateSchema = z.object({
  isRead: z.boolean()
});

const certificationCreateSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  year: z.string().min(1),
  link: z.string().optional(),
  order: z.number().int().optional(),
  published: z.boolean().optional()
});

module.exports = {
  objectIdParamSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  homeCreateSchema,
  aboutCreateSchema,
  skillCreateSchema,
  projectCreateSchema,
  experienceCreateSchema,
  messageCreateSchema,
  messageUpdateSchema,
  certificationCreateSchema
};
