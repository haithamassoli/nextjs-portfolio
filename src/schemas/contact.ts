import z from "zod";

export const techStack = [
  {
    id: "backend",
    label: "Backend",
  },
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "mobile",
    label: "Mobile App",
  },
  {
    id: "other",
    label: "Other",
  },
] as const;

export const contactSchema = z.object({
  fullName: z.string().trim().min(3),
  email: z.string().trim().email(),
  phone: z.string().trim().min(10),
  deal: z.enum(["part", "full", "contract", "freelance", "hourly"]),
  location: z.enum(["remote", "onsite"]),
  summary: z.string(),
  budget: z.string().trim(),
  techStack: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Required",
  }),
});
