import type { Metadata } from "next";
import { CheckCircle2, CircleDashed, Lightbulb, Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ResumeUpload } from "@/components/ResumeUpload";

export const metadata: Metadata = { title: "Resume Analyzer" };

export default function ResumePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-7xl">
      <PageHeader eyebrow="Career intelligence" title="Resume Analyzer" description="Upload your resume to uncover ATS issues, missing skills, and practical ways to make it stronger." />
      <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="glass-panel rounded-2xl p-5 sm:p-6"><p className="mb-5 text-sm font-semibold text-zinc-200">Upload resume</p><ResumeUpload /></section>
        <div className="grid gap-5">
          <section className="glass-panel rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-zinc-200">ATS score</p><p className="mt-1 text-xs text-zinc-600">Your score appears after analysis</p></div><div className="relative grid size-20 place-items-center rounded-full bg-[conic-gradient(rgba(139,92,246,.18)_0deg,rgba(255,255,255,.04)_0deg)]"><div className="grid size-16 place-items-center rounded-full bg-[#10131c] text-lg font-semibold text-zinc-600">—</div></div></div>
          </section>
          <section className="glass-panel rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2"><Lightbulb className="size-4 text-amber-300" /><p className="text-sm font-semibold text-zinc-200">Analysis</p></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[{ icon: CheckCircle2, title: "Strengths", text: "Your strongest sections will appear here." }, { icon: Target, title: "Improvements", text: "Prioritized recommendations will appear here." }].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"><Icon className="size-4 text-zinc-600" /><p className="mt-4 text-xs font-medium text-zinc-400">{title}</p><p className="mt-1 text-xs leading-5 text-zinc-650">{text}</p></div>)}
            </div>
          </section>
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"><CircleDashed className="size-4 text-zinc-600" /><div><p className="text-xs text-zinc-400">Analysis status</p><p className="text-[11px] text-zinc-650">Waiting for a document</p></div></div>
        </div>
      </div>
    </div></div>
  );
}
