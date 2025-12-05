import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Mail, RectangleEllipsis } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import axios from 'axios';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormValues>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", 
        {
          email: data.email,
          password: data.password,
        }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );  
      console.log("Registered:", res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("Status:", err.response?.status);
        console.log("Backend output:", err.response?.data);
      } else {
        console.error("Network error:", err);
      }
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Register</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-2xl text-primary">Welcome Aboard</DialogTitle>
            <DialogDescription>
              Create an account and get started.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5">
            <div className=" relative grid gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              >
                <Mail />
              </Button>
              <Input 
                id="email" 
                type="email" 
                placeholder="Email Address"
                className="pl-8"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
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
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="pl-8" 
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
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
            <div className="relative grid gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              >
                <RectangleEllipsis />
              </Button>
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter Password" 
                className="pl-8"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
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
          <DialogFooter className="flex flex-col items-center pt-5">
            <Button type="submit" className="w-full">Sign In</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
};

export default RegisterModal;