import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

type FinishedReel = {
  id: string;
  title: string;
  videoUrl?: string | null;
};

// Put these in env vars if you want
const SHEET_ID = "1x7jPNMuqDtq1u_4Mzz2ZGyI0OkzWjQjjDLwkBDV7mLw";
const SHEET_NAME = "Sheet1";

// Toggle this to enable/disable background polling for finished reels
const AUTO_REFRESH_ENABLED = false;

function parseGvizJson(text: string) {
  // Google wraps JSON like: google.visualization.Query.setResponse({...});
  const json = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
  return JSON.parse(json);
}

async function fetchFinishedReels(): Promise<FinishedReel[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    SHEET_NAME
  )}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);

  const text = await res.text();
  const data = parseGvizJson(text);

  const rows = data.table.rows as Array<{ c: Array<{ v?: any } | null> }>;

  return rows
    .map((r, idx) => {
      const title = r.c?.[0]?.v ? String(r.c[0].v) : "";
      const videoUrl = r.c?.[1]?.v ? String(r.c[1].v) : null;
      const sheetId = r.c?.[2]?.v;
      const id = sheetId != null && sheetId !== "" ? String(sheetId) : `row-${idx + 1}`;

      if (!title) return null;

      return {
        id,
        title,
        videoUrl,
      } satisfies FinishedReel;
    })
    .filter(Boolean) as FinishedReel[];
}

export function FinishedReelList() {
  const [reels, setReels] = useState<FinishedReel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchFinishedReels();
        if (!isMounted) return;

        setReels((prev) => {
          // Avoid updating state (and re-rendering) if nothing has changed
          if (prev.length === data.length) {
            let allSame = true;
            for (let i = 0; i < prev.length; i++) {
              const a = prev[i];
              const b = data[i];
              if (!b || a.id !== b.id || a.title !== b.title || a.videoUrl !== b.videoUrl) {
                allSame = false;
                break;
              }
            }

            if (allSame) {
              return prev;
            }
          }

          return data;
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Initial load
    load();

    // Poll periodically for updates, only when enabled
    let intervalId: number | undefined;
    if (AUTO_REFRESH_ENABLED) {
      intervalId = window.setInterval(() => {
        load();
      }, 15000);
    }

    return () => {
      isMounted = false;
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <Card className="mt-8 bg-slate-900/60 backdrop-blur-xl border-slate-800/50 shadow-2xl">
        <div className="p-6 text-sm text-slate-400">Loading finished reels…</div>
      </Card>
    );
  }

  if (!reels.length) {
    return (
      <Card className="mt-8 bg-slate-900/60 backdrop-blur-xl border-slate-800/50 shadow-2xl">
        <div className="p-6 text-sm text-slate-400">
          Once your videos finish generating, they will appear here.
        </div>
      </Card>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-lg font-semibold text-slate-100">Finished Reels</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {reels.map((reel) => (
          <Card
            key={reel.id}
            className="bg-slate-900/60 backdrop-blur-xl border-slate-800/50 shadow-xl overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <p className="font-medium text-slate-100 line-clamp-2">{reel.title}</p>
              {reel.videoUrl ? (
                <div className="space-y-3">
                  <div className="aspect-[9/16] w-32 sm:w-40 md:w-48 mx-auto overflow-hidden rounded-lg bg-black/40 flex items-center justify-center">
                    <video
                      src={reel.videoUrl}
                      controls
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button
                    asChild
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white"
                  >
                    <a href={reel.videoUrl} download target="_blank" rel="noopener noreferrer">
                      Download Reel
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="aspect-[9/16] w-32 sm:w-40 md:w-48 mx-auto overflow-hidden rounded-lg border border-dashed border-slate-700 bg-slate-900/40 flex flex-col items-center justify-center text-xs text-slate-500">
                    <span className="mb-1">Still generating…</span>
                    <span className="text-[10px] text-slate-600 items-center">
                      Check back here once processing completes.
                    </span>
                  </div>
                  <Button
                    className="w-full bg-purple-600/40 text-slate-400 cursor-not-allowed"
                    disabled
                  >
                    Download Reel
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

