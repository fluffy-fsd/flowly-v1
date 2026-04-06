import { z } from "zod";
export const quoteSchema = z.object({
  product: z.string().min(1),
  addOns: z.array(z.string()).default([]),
  delivery: z.enum(["standard", "express", "urgent"]).default("standard"),
  projectName: z.string().min(2).max(100),
  description: z.string().min(20).max(2000),
  referenceUrls: z.string().max(500).optional().default(""),
  hasDesign: z.boolean().default(false),
  hasCopy: z.boolean().default(false),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().max(20).optional().default(""),
  company: z.string().max(100).optional().default(""),
  linkedin: z.string().max(200).optional().default(""),
  acceptTerms: z.boolean().refine((v) => v === true),
});
export type QuoteSchemaType = z.infer<typeof quoteSchema>;
