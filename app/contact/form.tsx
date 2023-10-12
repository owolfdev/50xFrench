"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"; // <-- Add this import

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  email: z.string().email().min(2, {}),
  name: z.string().min(2, {
    message: "Your name must be at least 2 characters.",
  }),
  message: z.string().min(20, {
    message: "Your message must be at least 20 characters.",
  }),
  type: z.string().min(2, {
    message: "Select a type.",
  }),
  recaptcha: z
    .string()
    .min(1, { message: "Please complete the reCAPTCHA challenge." }),
});

const optionsForSelectType = [
  { label: "Bug Report", value: "Bug Report" },
  { label: "Support Query", value: "Support Query" },
  { label: "Correspondence", value: "Correspondence" },
];

const NEXT_PUBLIC_RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function ContactForm() {
  const [recaptchaValue, setRecaptchaValue] = React.useState("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
      type: "",
    },
  });

  // 2. Handle form submission.
  const handleSubmit = form.handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!recaptchaValue) {
      // Handle missing reCAPTCHA response
      alert("Please complete the reCAPTCHA challenge.");
      return;
    }
    values.recaptcha = recaptchaValue;
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function handleRecaptchaChange(value: any) {
    setRecaptchaValue(value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-lg"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select message type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {optionsForSelectType.map((option) => (
                    <SelectItem value={option.value} key={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>
                {/* <span className="text-black">
                  This is your public display name.
                </span> */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                {/* <span className="text-black">
                  This is your public display name.
                </span> */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message" {...field} />
              </FormControl>
              <FormDescription>
                {/* <span className="text-black">
                  This is your public display name.
                </span> */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div
          className="g-recaptcha"
          data-sitekey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        ></div> */}
        <ReCAPTCHA
          sitekey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          onChange={handleRecaptchaChange}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
