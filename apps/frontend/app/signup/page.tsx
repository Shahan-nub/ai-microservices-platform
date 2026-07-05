import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { AuthLayout } from "@/components/AuthLayout";
export const metadata: Metadata = { title: "Create account" };
export default function SignupPage() { return <AuthLayout><AuthForm mode="signup" /></AuthLayout>; }
