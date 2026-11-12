"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { CircleDashed, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ResumeUpload } from "@/components/ResumeUpload";
import { ResumeHistory } from "@/components/ResumeHistory";

// Remove this if Next complains because client components can't export metadata
// export const metadata: Metadata = { title: "Resume Analyzer" };

export default function ResumePage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Career intelligence"
          title="Resume Analyzer"
          description="Upload your resume to uncover ATS issues, missing skills, and practical ways to make it stronger."
        />

        <div className="my-6">
          <section className="glass-panel rounded-2xl p-5 sm:p-6">
            <p className="mb-5 text-sm font-semibold text-zinc-200">
              Upload Resume
            </p>

            <ResumeUpload onCompleted={setResult} />
          </section>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols">
          <div className="grid gap-5">
            {/* ATS Score */}
            <section className="glass-panel rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-zinc-200">
                    ATS Score
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Your score appears after analysis
                  </p>
                </div>

                <div className="grid size-20 place-items-center rounded-full border border-violet-500/20">
                  <div className="text-2xl font-bold text-violet-400">
                    {result?.ats_score ?? "--"}
                  </div>
                </div>
              </div>
            </section>

            {/* AI Analysis */}
            <section className="glass-panel rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Lightbulb className="size-4 text-amber-400" />

                <p className="text-sm font-semibold text-zinc-200">
                  AI Analysis
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <pre className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                  {result?.analysis ??
                    "Upload a resume to receive an AI-powered analysis."}
                </pre>
              </div>
            </section>

            {/* Status */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
              <CircleDashed className="size-4 text-violet-400" />

              <div>
                <p className="text-xs text-zinc-400">Analysis Status</p>

                <p className="text-sm font-medium text-zinc-200">
                  {result?.status ?? "Waiting for document"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* history */}
        <div className="mt-8">
          <ResumeHistory />
        </div>
      </div>
    </div>
  );
}
