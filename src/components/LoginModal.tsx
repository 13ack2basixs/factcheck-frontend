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
import axios from "axios";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginModal = () => {
  const {
      register,
      handleSubmit,
      setError,
      formState: { errors }
    } = useForm<LoginFormValues>();

  const [showPassword, setShowPassword] = useState(false);
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", 
        {
          email: data.email,
          password: data.password,
        }
      );
      const token = res.data.accessToken;
      console.log("Successful login:", res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400 || err.response?.status === 401) {
          setError("root", {
            type: "manual",
            message: "Invalid email or password",
          });
        } else {
          setError("root", {
            type: "manual",
            message: "Something went wrong. Please try again later.",
          });
        }
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-2xl text-primary">Welcome Back!</DialogTitle>
            <DialogDescription>
              Please enter your details to sign in.
            </DialogDescription>
            {errors.root && (
              <p className="text-sm text-red-500 text-center">
                {errors.root.message}
              </p>
            )}
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
              <Input 
                id="email" 
                type="email" 
                placeholder="Email Address"
                className="pl-8"
                {...register("email", {
                  required: "Email is required",
                })}
              />
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
                })}
              />
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

export default LoginModal;