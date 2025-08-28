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

const RegisterModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Register</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-2xl text-primary">Welcome Aboard</DialogTitle>
            <DialogDescription>
              Create an account and get started.
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
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Email Address"
                className="pl-8"
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
                name="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="pl-8" 
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
                name="password" 
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter Password" 
                className="pl-8"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col items-center">
            <Button type="submit" className="w-full">Sign In</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
};

export default RegisterModal;