"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { UploadCloud, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  uploadResume,
  getResumeStatus,
} from "@/services/resume";

export function ResumeUpload({
  onCompleted,
}: {
  onCompleted: (result: any) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const [dragging, setDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const accept = (files: FileList | null) => {
    if (files?.length) {
      setFile(files[0]);
    }
  };

  async function analyze() {
    if (!file) return;

    setLoading(true);
    setAnalysisError("");

    try {
      const job = await uploadResume(file);

      const interval = window.setInterval(() => {
        void getResumeStatus(job.job_id)
          .then(async (status) => {
            if (status.status !== "completed" && status.status !== "failed") return;

            window.clearInterval(interval);

            window.dispatchEvent(new Event("nexora:notifications-changed"));

            if (status.status === "completed") {
              onCompleted(status);
            } else {
              setAnalysisError("Resume analysis failed. You can try uploading the file again.");
            }

            setLoading(false);
          })
          .catch((err: unknown) => {
            window.clearInterval(interval);
            console.error(err);
            setAnalysisError("Could not retrieve the analysis status. Please try again.");
            setLoading(false);
          });
      }, 2000);
    } catch (err) {
      console.error(err);
      setAnalysisError("The resume could not be submitted. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,.doc,.docx"
        onChange={(e) => accept(e.target.files)}
      />

      <motion.div
        animate={{
          borderColor: dragging
            ? "rgba(82,67,51,.55)"
            : "rgba(39,32,25,.18)",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          accept(e.dataTransfer.files);
        }}
        className={cn(
          "rounded-sm border border-dashed bg-[#f7f3ed] p-8 text-center",
          dragging && "bg-[#e6ddd2]"
        )}
      >
        <UploadCloud className="mx-auto size-8 text-accent" />

        <h2 className="editorial-title mt-4 text-3xl text-foreground">
          Upload Resume
        </h2>

        <Button
          className="mt-5"
          onClick={() => inputRef.current?.click()}
        >
          Choose File
        </Button>
      </motion.div>

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-sm border border-border bg-card p-3">
          <FileText className="text-accent" />

          <div className="flex-1 truncate text-sm text-zinc-300">
            {file.name}
          </div>

          <button onClick={() => setFile(null)}>
            <X className="text-zinc-400 hover:text-white" />
          </button>
        </div>
      )}

      <Button
        className="mt-5 w-full"
        disabled={!file || loading}
        onClick={analyze}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </Button>

      {analysisError && (
        <p role="alert" className="mt-3 text-sm text-rose-700">
          {analysisError}
        </p>
      )}
    </div>
  );
}