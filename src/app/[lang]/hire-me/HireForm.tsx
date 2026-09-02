"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";

import QuestionMark from "@/assets/icons/question";
import SectionHeader from "@/components/SectionHeader";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { deals, locations, skills, techStack } from "@/data/contact";
import type { Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";
import { contactSchema, type ContactValues } from "@/schemas/contact";

const EMAIL = "haitham.b.assoli@gmail.com";

export default function HireForm({ lang }: { lang: Locale }) {
  const t = useT(lang);
  // `useT` is a plain factory rather than a hook, so it returns a fresh closure
  // every render. Key the schema on the locale instead.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const schema = useMemo(() => contactSchema(t), [lang]);

  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      deal: "part",
      location: "remote",
      summary: "",
      budget: "",
      techStack: [],
    },
  });

  const onSubmit = (data: ContactValues) => {
    const dealLabel = t(
      deals.find((d) => d.value === data.deal)?.labelKey ?? "deal.part",
    );
    const locationLabel = t(
      locations.find((l) => l.value === data.location)?.labelKey ??
        "loc.remote",
    );
    const stackLabels = data.techStack
      .map((value) => techStack.find((item) => item.value === value)?.labelKey)
      .filter((key): key is NonNullable<typeof key> => Boolean(key))
      .map((key) => t(key))
      .join(", ");

    const subject = t("hire.title");
    const body = [
      `${t("hire.fullName")}: ${data.fullName}`,
      `${t("hire.email")}: ${data.email}`,
      `${t("hire.phone")}: ${data.phone}`,
      `${t("hire.deal")} ${dealLabel}`,
      `${t("hire.location")} ${locationLabel}`,
      `${t("hire.techStack")} ${stackLabels}`,
      `${t("hire.budget")}: ${data.budget}`,
      "",
      `${t("hire.summary")}`,
      data.summary,
      "",
      data.fullName,
    ].join("\r\n");

    window.open(
      `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
      "_blank",
    );
  };

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  return (
    <section className="mx-8 py-16 font-mono md:container lg:py-24">
      <SectionHeader eyebrow={t("hire.eyebrow")} description={t("hire.lede")} />
      <div className="mt-10 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative order-3 flex w-full flex-col rounded-xl border border-gray-700 p-4 text-start ring-1 ring-gray-700 sm:p-6 lg:order-1 lg:p-8"
        >
          <Form {...form}>
            <form
              className="flex flex-col gap-8"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted">
                      {t("hire.fullName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("hire.fullName")}
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-muted">
                      {t("hire.email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        dir="ltr"
                        className="ltr text-start"
                        placeholder={t("hire.email")}
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted">
                      {t("hire.phone")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        dir="ltr"
                        className="ltr text-start"
                        placeholder={t("hire.phone")}
                        autoComplete="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deal"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-muted">
                      {t("hire.deal")}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-x-6 gap-y-2"
                      >
                        {deals.map((deal) => (
                          <FormItem
                            key={deal.value}
                            className="flex items-center gap-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={deal.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {t(deal.labelKey)}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-muted">
                      {t("hire.location")}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-x-6 gap-y-2"
                      >
                        {locations.map((location) => (
                          <FormItem
                            key={location.value}
                            className="flex items-center gap-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={location.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {t(location.labelKey)}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-muted">
                      {t("hire.summary")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder={t("hire.summaryPlaceholder")}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-muted">
                      {t("hire.budget")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        dir="ltr"
                        className="ltr text-start"
                        placeholder={t("hire.budgetPlaceholder")}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="techStack"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-muted">
                      {t("hire.techStack")}
                    </FormLabel>
                    <div className="grid grid-cols-2 gap-y-3">
                      {techStack.map((item) => (
                        <div
                          key={item.value}
                          className="flex items-center gap-x-3"
                        >
                          <Checkbox
                            id={`tech-${item.value}`}
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) =>
                              field.onChange(
                                checked
                                  ? [...(field.value ?? []), item.value]
                                  : (field.value ?? []).filter(
                                      (value) => value !== item.value,
                                    ),
                              )
                            }
                          />
                          <label
                            htmlFor={`tech-${item.value}`}
                            className="cursor-pointer text-sm font-normal"
                          >
                            {t(item.labelKey)}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-submit rounded-lg border border-green-400 bg-transparent px-4 py-4 font-mono font-medium text-green-400 transition-all duration-300 hover:bg-green-400 hover:bg-opacity-10 disabled:opacity-60"
              >
                {isSubmitting ? t("hire.submitting") : t("hire.submit")}
              </button>
              <p className="text-center text-sm text-muted/70">
                {isSubmitSuccessful ? t("hire.sent") : t("hire.note")}
              </p>
            </form>
          </Form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="order-1 divide-y divide-gray-800 justify-self-center text-start lg:order-2"
        >
          <h2 className="sr-only">{t("skills.title")}</h2>
          {skills.map((skill) => (
            <div key={skill.value} className="flex gap-x-7 py-7">
              <QuestionMark className="mt-1.5 h-6 w-6 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-200">
                  {t(skill.titleKey)}
                </h3>
                <p className="mt-1 max-w-[36ch] text-sm text-muted">
                  {t(skill.descKey)}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
