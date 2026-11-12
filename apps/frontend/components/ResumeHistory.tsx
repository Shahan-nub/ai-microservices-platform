"use client";

import { useEffect, useState } from "react";
import { Eye, FileText, X } from "lucide-react";
import { getResumeHistory } from "@/services/resume";
import { Button } from "@/components/ui/button";

type ResumeHistoryItem = {
  id: number;
  ats_score: number;
  status: string;
  analysis: string;
};

export function ResumeHistory() {
  const [history, setHistory] = useState<ResumeHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] =
    useState<ResumeHistoryItem | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await getResumeHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="glass-panel rounded-2xl p-6">

        <div className="mb-6 flex items-center gap-3">

          <FileText className="size-5 text-violet-400" />

          <h2 className="text-xl font-semibold text-white">
            Resume History
          </h2>

        </div>

        {loading ? (
          <p className="text-zinc-400">
            Loading...
          </p>
        ) : history.length === 0 ? (
          <p className="text-zinc-400">
            No resume analyses yet.
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10 text-left text-sm text-zinc-500">

                  <th className="py-3">ID</th>

                  <th>ATS Score</th>

                  <th>Status</th>

                  <th className="text-right">Action</th>

                </tr>

              </thead>

              <tbody>

                {history.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/[0.03]"
                  >

                    <td className="py-4 font-medium">
                      #{item.id}
                    </td>

                    <td>

                      <span className="font-semibold text-violet-400">
                        {item.ats_score}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "completed"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-yellow-500/15 text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="text-right">

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelected(item)}
                      >
                        <Eye className="mr-2 size-4" />
                        View
                      </Button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}
      </section>

      {/* Modal */}

      {selected && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#11141d] p-8">

            <button
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 rounded-lg p-2 hover:bg-white/10"
            >
              <X className="size-5" />
            </button>

            <h2 className="text-2xl font-bold text-white">
              Resume Analysis
            </h2>

            <div className="mt-4 flex items-center gap-6">

              <div>

                <p className="text-sm text-zinc-500">
                  ATS Score
                </p>

                <p className="text-3xl font-bold text-violet-400">
                  {selected.ats_score}
                </p>

              </div>

              <div>

                <p className="text-sm text-zinc-500">
                  Status
                </p>

                <p className="font-semibold capitalize text-green-400">
                  {selected.status}
                </p>

              </div>

            </div>

            <div className="mt-8 max-h-[60vh] overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-5">

              <pre className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                {selected.analysis}
              </pre>

            </div>

          </div>

        </div>

      )}
    </>
  );
}