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
          <section className="glass-panel rounded-sm p-5 sm:p-6">
            <p className="mb-5 text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Upload Resume
            </p>

            <ResumeUpload onCompleted={setResult} />
          </section>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols">
          <div className="grid gap-5">
            {/* ATS Score */}
            <section className="glass-panel rounded-sm p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="editorial-title text-2xl text-foreground">
                    ATS Score
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Your score appears after analysis
                  </p>
                </div>

                <div className="grid size-20 place-items-center rounded-full border border-[#d2c7ba]">
                  <div className="editorial-title text-3xl text-accent">
                    {result?.ats_score ?? "--"}
                  </div>
                </div>
              </div>
            </section>

            {/* AI Analysis */}
            <section className="glass-panel rounded-sm p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Lightbulb className="size-4 text-accent" />

                <p className="editorial-title text-2xl text-foreground">
                  AI Analysis
                </p>
              </div>

              <div className="mt-5 rounded-sm border border-border bg-background p-4">
                <pre className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                  {result?.analysis ??
                    "Upload a resume to receive an AI-powered analysis."}
                </pre>
              </div>
            </section>

            {/* Status */}
            <div className="flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-3">
              <CircleDashed className="size-4 text-accent" />

              <div>
                <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase">Analysis Status</p>

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
