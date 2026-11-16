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
      <form onSubmit={submit} className="mt-8 flex gap-2 rounded-sm border border-border bg-card p-2 shadow-sm focus-within:border-accent">
        <Search className="ml-3 mt-3 size-4.5 shrink-0 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your knowledge base by meaning..." className="h-10 min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
        <Button type="button" variant="ghost" size="icon" aria-label="Search filters"><SlidersHorizontal className="size-4" /></Button>
        <Button type="submit" className="hidden sm:inline-flex">Search</Button>
      </form>
      <div className="mt-7">
        {!searched ? <div className="grid min-h-72 place-items-center rounded-sm border border-dashed border-border bg-[#e8e1d8] text-center"><div><span className="mx-auto grid size-12 place-items-center border border-border bg-card text-muted-foreground"><Search className="size-5" /></span><p className="mt-4 text-sm text-foreground">Search across everything you know</p><p className="mt-1 text-xs text-muted-foreground">Results will be ranked by semantic similarity.</p></div></div> : (
          <div><div className="mb-3 flex items-center justify-between"><p className="text-xs text-muted-foreground">3 results for “{query}”</p><p className="text-[10px] text-muted-foreground">Sorted by relevance</p></div><div className="space-y-3">{results.map((result, index) => <motion.article key={result.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} className="group glass-panel rounded-sm p-4 hover:border-accent"><div className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-sm bg-[#e6ddd2] text-accent"><FileText className="size-4" /></span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h2 className="text-sm font-medium text-foreground">{result.title}</h2><span className="rounded-sm border border-border bg-background px-2 py-1 text-[10px] text-accent">{result.similarity}% match</span></div><p className="mt-2 text-xs leading-5 text-muted-foreground">{result.excerpt}</p><div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground"><span>{result.source}</span><button className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">Open <ArrowUpRight className="size-3" /></button></div></div></div></motion.article>)}</div></div>
        )}
      </div>
    </>
  );
}
