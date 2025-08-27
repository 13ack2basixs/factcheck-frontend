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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, RectangleEllipsis } from "lucide-react";
import { useState } from "react";

const FormSchema = z.object({
  url: z.string(),
})

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 sm:p-10">
      <div className="gap-[10px] flex justify-end w-full">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="flex items-center">
                <DialogTitle className="text-2xl text-primary">Welcome Back!</DialogTitle>
                <DialogDescription>
                  Please enter your details to sign in.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className=" relative grid gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  >
                    <Mail />
                  </Button>
                  <Input id="email" name="email" type="email" placeholder="     Email Address" />
                </div>
                <div className="relative grid gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  >
                    <RectangleEllipsis />
                  </Button>
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="     Password" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    // disabled={isLoading}
                  >
                    {showPassword ? (<Eye className="w-4 h-4" />) : (<EyeOff className="w-4 h-4" />)}
                  </Button>
                </div>
              </div>
              <DialogFooter className="flex flex-col items-center">
                <Button type="submit" className="w-full">Sign In</Button>
                <p className="text-sm">Don&apos;t have an account? Sign up</p>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
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
        <span>Built with <a href="https://spring.io/projects/spring-boot" className="text-primary underline">Spring Boot</a> and <a href="https://nextjs.org/" className="text-primary underline">Next.js</a>
        </span>
      </footer>
    </div>
  );
}
