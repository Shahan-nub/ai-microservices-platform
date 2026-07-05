import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { AuthLayout } from "@/components/AuthLayout";
export const metadata: Metadata = { title: "Sign in" };
export default function LoginPage() { return <AuthLayout><AuthForm mode="login" /></AuthLayout>; }
