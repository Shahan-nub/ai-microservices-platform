"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { FileText, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const accept = (files: FileList | null) => files?.[0] && setFile(files[0]);

  return (
    <div>
      <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(event) => accept(event.target.files)} />
      <motion.div
        animate={{ borderColor: dragging ? "rgba(139,92,246,.7)" : "rgba(255,255,255,.1)" }}
        onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => { event.preventDefault(); setDragging(false); accept(event.dataTransfer.files); }}
        className={cn("rounded-2xl border border-dashed bg-white/[0.02] p-8 text-center transition sm:p-12", dragging && "bg-violet-500/[0.04]")}
      >
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20"><UploadCloud className="size-6" /></span>
        <h2 className="mt-5 text-sm font-semibold text-zinc-200">Drop your resume here</h2>
        <p className="mt-2 text-xs text-zinc-600">PDF, DOC, or DOCX · Maximum 10 MB</p>
        <Button variant="secondary" size="sm" className="mt-5" onClick={() => inputRef.current?.click()}>Choose file</Button>
      </motion.div>
      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
          <span className="grid size-9 place-items-center rounded-lg bg-cyan-500/10 text-cyan-300"><FileText className="size-4" /></span>
          <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-zinc-300">{file.name}</p><p className="text-[10px] text-zinc-600">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready to analyze</p></div>
          <button onClick={() => setFile(null)} aria-label="Remove file" className="rounded-lg p-2 text-zinc-600 hover:bg-white/5 hover:text-zinc-300"><X className="size-4" /></button>
        </div>
      )}
      <Button className="mt-4 w-full" disabled={!file}>Analyze resume</Button>
    </div>
  );
}
