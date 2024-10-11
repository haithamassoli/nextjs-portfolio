"use client";

import QuestionMark from "@/assets/icons/question";
import SectionHeader from "@/components/SectionHeader";
import { contactSchema } from "@/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { deals, locations, skills, techStack } from "@/data/contact";

type FormData = z.infer<typeof contactSchema>;

function HireMe() {
  const form = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      deal: "part",
      location: "remote",
      techStack: [],
    },
  });

  const onSubmit = (data: FormData) => {
    const message = `mailto:haitham.b.assoli@gmail.com?subject=Opportunity to Collaborate on a Project&body=Dear Haitham,%0D%0A
I hope this email finds you well. I am reaching out to inquire about the possibility of hiring you for a project.%0D%0A
%0D%0A
Here are some details:%0D%0A

- Full Name: ${data.fullName}%0D%0A
- Email: ${data.email}%0D%0A
- Phone: ${data.phone}%0D%0A
- Project Type: ${data.deal === "full" ? "full time" : data.deal === "part" ? "part time" : data.deal} collaboration%0D%0A
- Location: ${data.location}%0D%0A
- Project Summary: ${data.summary}%0D%0A
- Budget: ${data.budget}%0D%0A
- Tech Stack: ${data.techStack.join(", ")}%0D%0A
%0D%0A
Please let me know if you're available for a discussion, and I would love to explore how we can collaborate.%0D%0A
%0D%0A
Looking forward to hearing from you.%0D%0A
%0D%0A
Best regards,%0D%0A
${data.fullName}`;

    window.open(message, "_blank");
  };

  return (
    <section className="mx-8 py-16 font-mono md:container lg:py-24">
      <SectionHeader
        eyebrow="Hire Me"
        description="If you have a project you would like to discuss, Please take a few minutes to tell me about it."
      />
      <div className="mt-10 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative flex w-full flex-col rounded-xl border border-gray-700 p-4 ring-1 ring-gray-700 sm:p-6 lg:p-8"
        >
          <Form {...form}>
            <form
              className="flex flex-col gap-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
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
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
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
                      What type of deal are you looking for?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-2"
                      >
                        {deals.map((deal) => (
                          <FormItem
                            key={deal.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={deal.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {deal.title}
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
                      What type of deal are you looking for?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-2"
                      >
                        {locations.map((location) => (
                          <FormItem
                            key={location.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={location.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {location.title}
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
                      Tell me a little about your project
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Project Summary" {...field} />
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
                      What is your estimated budget?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Estimated Budget ($USD)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="techStack"
                render={() => (
                  <FormItem className="grid grid-cols-2 items-center">
                    {techStack.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="techStack"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              // className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <div className="flex items-center space-x-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="btn-submit rounded-lg border border-green-400 bg-transparent px-4 py-4 font-mono font-medium text-green-400 transition-all duration-300 hover:bg-green-400 hover:bg-opacity-10"
              >
                Send Message
              </button>
              <p className="text-center text-sm text-gray-500">
                I'll get back to you within 2 business days max.
              </p>
            </form>
          </Form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="divide-y divide-gray-800 justify-self-center"
        >
          {skills.map((skill) => (
            <div key={skill.title} className="flex gap-x-7 py-7">
              <QuestionMark className="mt-1.5 h-6 w-6 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-200">
                  {skill.title}
                </h3>
                <p className="text-muted mt-1 max-w-[36ch] text-sm">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HireMe;
