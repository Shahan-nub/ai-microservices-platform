"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Code2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormValues = { name?: string; email: string; password: string; terms?: boolean };

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const onSubmit = async () => { await new Promise((resolve) => setTimeout(resolve, 500)); };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }} className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8">
      <div className="text-center"><h1 className="text-2xl font-semibold tracking-tight text-white">{isSignup ? "Create your workspace" : "Welcome back"}</h1><p className="mt-2 text-sm text-zinc-500">{isSignup ? "Start building with intelligent tools today." : "Sign in to continue to Nexora AI."}</p></div>
      <div className="mt-7 grid grid-cols-2 gap-3"><Button variant="secondary"><Code2 className="size-4" />GitHub</Button><Button variant="secondary"><span className="text-sm font-bold">G</span>Google</Button></div>
      <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-white/[0.07]" /><span className="text-[10px] tracking-wider text-zinc-700 uppercase">or continue with email</span><span className="h-px flex-1 bg-white/[0.07]" /></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isSignup && <div><label className="mb-1.5 block text-xs font-medium text-zinc-400" htmlFor="name">Full name</label><Input id="name" placeholder="Shahan Ali" autoComplete="name" {...register("name", { required: "Your name is required", minLength: { value: 2, message: "Enter at least 2 characters" } })} />{errors.name && <p className="mt-1.5 text-[11px] text-rose-400">{errors.name.message}</p>}</div>}
        <div><label className="mb-1.5 block text-xs font-medium text-zinc-400" htmlFor="email">Email address</label><Input id="email" type="email" placeholder="you@company.com" autoComplete="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} />{errors.email && <p className="mt-1.5 text-[11px] text-rose-400">{errors.email.message}</p>}</div>
        <div><div className="mb-1.5 flex items-center justify-between"><label className="text-xs font-medium text-zinc-400" htmlFor="password">Password</label>{!isSignup && <button type="button" className="text-[11px] text-violet-300 hover:text-violet-200">Forgot password?</button>}</div><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} placeholder={isSignup ? "At least 8 characters" : "Enter your password"} className="pr-10" autoComplete={isSignup ? "new-password" : "current-password"} {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-600 hover:text-zinc-300" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div>{errors.password && <p className="mt-1.5 text-[11px] text-rose-400">{errors.password.message}</p>}</div>
        {isSignup && <div><label className="flex items-start gap-2.5 text-xs leading-5 text-zinc-500"><input type="checkbox" className="mt-1 accent-violet-500" {...register("terms", { required: "Please accept the terms" })} /><span>I agree to the <button type="button" className="text-zinc-300 hover:text-white">Terms of Service</button> and <button type="button" className="text-zinc-300 hover:text-white">Privacy Policy</button>.</span></label>{errors.terms && <p className="mt-1.5 text-[11px] text-rose-400">{errors.terms.message}</p>}</div>}
        <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : isSignup ? "Create account" : "Sign in"}</Button>
      </form>
      <p className="mt-6 text-center text-xs text-zinc-600">{isSignup ? "Already have an account?" : "New to Nexora?"} <Link href={isSignup ? "/login" : "/signup"} className="font-medium text-violet-300 hover:text-violet-200">{isSignup ? "Sign in" : "Create an account"}</Link></p>
    </motion.div>
  );
}
