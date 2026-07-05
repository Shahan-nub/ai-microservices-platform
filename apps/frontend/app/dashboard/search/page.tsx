import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SearchExperience } from "@/components/SearchExperience";
export const metadata: Metadata = { title: "Embedding Search" };
export default function SearchPage() { return <div className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-5xl"><PageHeader eyebrow="Semantic retrieval" title="Embedding Search" description="Search across your indexed knowledge by context and meaning—not just exact keywords." /><SearchExperience /></div></div>; }
