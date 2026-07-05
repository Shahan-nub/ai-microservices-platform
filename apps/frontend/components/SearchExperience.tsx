"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, FileText, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SearchResult } from "@/types";

const results: SearchResult[] = [
  { id: "1", title: "Platform architecture overview", excerpt: "The gateway provides a unified entry point for authentication, chat, document analysis, semantic search, and notifications…", source: "Architecture.pdf", similarity: 96 },
  { id: "2", title: "Embedding search implementation", excerpt: "Documents are split into contextual chunks before vector representations are generated and stored for similarity retrieval…", source: "Technical notes", similarity: 89 },
  { id: "3", title: "API gateway conventions", excerpt: "All downstream service routes follow a shared versioning, error response, and authorization contract…", source: "Developer guide", similarity: 83 },
];

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (query.trim()) setSearched(true); };
  return (
    <>
      <form onSubmit={submit} className="mt-8 flex gap-2 rounded-2xl border border-white/10 bg-[#10131c]/90 p-2 shadow-2xl shadow-black/20 focus-within:border-violet-500/30">
        <Search className="ml-3 mt-3 size-4.5 shrink-0 text-zinc-600" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your knowledge base by meaning..." className="h-10 min-w-0 flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none" />
        <Button type="button" variant="ghost" size="icon" aria-label="Search filters"><SlidersHorizontal className="size-4" /></Button>
        <Button type="submit" className="hidden sm:inline-flex">Search</Button>
      </form>
      <div className="mt-7">
        {!searched ? <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-white/[0.07] bg-white/[0.015] text-center"><div><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/[0.04] text-zinc-600"><Search className="size-5" /></span><p className="mt-4 text-sm text-zinc-400">Search across everything you know</p><p className="mt-1 text-xs text-zinc-650">Results will be ranked by semantic similarity.</p></div></div> : (
          <div><div className="mb-3 flex items-center justify-between"><p className="text-xs text-zinc-500">3 results for “{query}”</p><p className="text-[10px] text-zinc-650">Sorted by relevance</p></div><div className="space-y-3">{results.map((result, index) => <motion.article key={result.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} className="group glass-panel rounded-xl p-4 hover:border-white/15"><div className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-cyan-500/10 text-cyan-300"><FileText className="size-4" /></span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h2 className="text-sm font-medium text-zinc-200">{result.title}</h2><span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">{result.similarity}% match</span></div><p className="mt-2 text-xs leading-5 text-zinc-500">{result.excerpt}</p><div className="mt-3 flex items-center justify-between text-[10px] text-zinc-650"><span>{result.source}</span><button className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">Open <ArrowUpRight className="size-3" /></button></div></div></div></motion.article>)}</div></div>
        )}
      </div>
    </>
  );
}
