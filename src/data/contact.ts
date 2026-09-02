import type { UIKey } from "@/libs/ui";

/**
 * Option lists for the hire-me form. These hold values only; the visible label
 * is a `ui.ts` key resolved through `useT(lang)` at render time, so the same
 * array serves both locales.
 */

type Option<V extends string> = { readonly value: V; readonly labelKey: UIKey };

export const deals = [
  { value: "part", labelKey: "deal.part" },
  { value: "full", labelKey: "deal.full" },
  { value: "contract", labelKey: "deal.contract" },
  { value: "freelance", labelKey: "deal.freelance" },
  { value: "hourly", labelKey: "deal.hourly" },
] as const satisfies readonly Option<string>[];

export const locations = [
  { value: "remote", labelKey: "loc.remote" },
  { value: "onsite", labelKey: "loc.onsite" },
] as const satisfies readonly Option<string>[];

export const techStack = [
  { value: "frontend", labelKey: "tech.frontend" },
  { value: "backend", labelKey: "tech.backend" },
  { value: "mobile", labelKey: "tech.mobile" },
  { value: "other", labelKey: "tech.other" },
] as const satisfies readonly Option<string>[];

/** The "what I can deliver" column beside the form. */
export const skills = [
  { value: "web", titleKey: "skill.web", descKey: "skill.webDesc" },
  { value: "mobile", titleKey: "skill.mobile", descKey: "skill.mobileDesc" },
  { value: "backend", titleKey: "skill.backend", descKey: "skill.backendDesc" },
  { value: "other", titleKey: "skill.other", descKey: "skill.otherDesc" },
] as const satisfies readonly {
  readonly value: string;
  readonly titleKey: UIKey;
  readonly descKey: UIKey;
}[];

export type DealValue = (typeof deals)[number]["value"];
export type LocationValue = (typeof locations)[number]["value"];
export type TechStackValue = (typeof techStack)[number]["value"];
