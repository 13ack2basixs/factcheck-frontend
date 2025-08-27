"use client"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const FormSchema = z.object({
  url: z.string(),
})

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  })

  // 3. Submit handler
  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 sm:p-10">
      <div className="gap-[10px] flex justify-end w-full">
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <span className="text-primary text-4xl font-bold">Paste a link. Uncover the truth.</span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-[40px] rounded-r-none w-[300px]" 
                      placeholder="Paste a URL and verify its authenticity" {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="rounded-l-none">Submit</Button>
          </form>
        </Form>
      </main>
      <footer className="flex flex-col items-center justify-center">
        <span className="italic">Always FactCheck your sources!</span>
        <span>Built with <a href="https://spring.io/projects/spring-boot" className="text-blue-500 underline">Spring Boot</a> and <a href="https://nextjs.org/" className="text-blue-500 underline">Next.js</a>
        </span>
      </footer>
    </div>
  );
}
