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

  const accept = (files: FileList | null) => {
    if (files?.length) {
      setFile(files[0]);
    }
  };

  async function analyze() {
    if (!file) return;

    setLoading(true);

    try {
      const job = await uploadResume(file);

      const interval = setInterval(async () => {
        const status = await getResumeStatus(job.job_id);

        if (status.status === "completed") {
          clearInterval(interval);

          onCompleted(status);

          setLoading(false);
        }
      }, 2000);
    } catch (err) {
      console.error(err);
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
            ? "rgba(139,92,246,.7)"
            : "rgba(255,255,255,.1)",
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
          "rounded-2xl border border-dashed bg-white/[0.02] p-8 text-center",
          dragging && "bg-violet-500/[0.04]"
        )}
      >
        <UploadCloud className="mx-auto size-8 text-violet-400" />

        <h2 className="mt-4 text-white text-lg font-semibold">
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
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/10 p-3">
          <FileText className="text-violet-400" />

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
    </div>
  );
}