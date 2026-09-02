import z from "zod";

import {
  deals,
  locations,
  type DealValue,
  type LocationValue,
} from "@/data/contact";
import type { UIKey } from "@/libs/ui";

type Translate = (key: UIKey) => string;

const dealValues = deals.map((d) => d.value) as [DealValue, ...DealValue[]];
const locationValues = locations.map((l) => l.value) as [
  LocationValue,
  ...LocationValue[],
];

/**
 * Built per request rather than frozen at module scope, so every zod message
 * comes out of the active locale's strings.
 */
export const contactSchema = (t: Translate) =>
  z.object({
    fullName: z
      .string()
      .trim()
      .min(3, { message: t("err.fullName") }),
    email: z
      .string()
      .trim()
      .email({ message: t("err.email") }),
    phone: z
      .string()
      .trim()
      .min(10, { message: t("err.phone") }),
    deal: z.enum(dealValues),
    location: z.enum(locationValues),
    summary: z
      .string()
      .trim()
      .min(10, { message: t("err.summary") }),
    budget: z
      .string()
      .trim()
      .min(1, { message: t("err.budget") }),
    techStack: z
      .array(z.string())
      .refine((value) => value.length > 0, { message: t("err.techStack") }),
  });

export type ContactValues = z.infer<ReturnType<typeof contactSchema>>;
