import { Logo } from "@/components/Logo";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background px-5 py-6 sm:px-8">
      <div className="mx-auto max-w-[1440px]">
        <header className="grid grid-cols-3 items-center border-y border-border py-4">
          <p className="hidden text-[9px] tracking-[0.28em] text-muted-foreground uppercase sm:block">AI / WORKSPACE</p>
          <div className="justify-self-center"><Logo /></div>
          <p className="hidden text-right text-[9px] tracking-[0.28em] text-muted-foreground uppercase sm:block">PRIVATE / SECURE</p>
        </header>
        <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-xl flex-col justify-center py-12">
          <p className="mb-4 text-center text-[9px] tracking-[0.3em] text-muted-foreground uppercase">Account / Access</p>
          {children}
          <p className="mt-6 text-center text-[9px] tracking-[0.16em] text-muted-foreground uppercase">Protected by enterprise-grade encryption</p>
        </div>
      </div>
    </main>
  );
}
