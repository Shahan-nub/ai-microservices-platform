import { Logo } from "@/components/Logo";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="subtle-grid relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"><div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" /><div className="relative z-10 flex w-full flex-col items-center"><div className="mb-8"><Logo /></div>{children}<p className="mt-8 text-center text-[10px] text-zinc-700">Protected by enterprise-grade encryption</p></div></main>;
}
