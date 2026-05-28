"use client";
import React from 'react';
import { useCampaignStore } from '../store/useCampaignStore';

export default function AbTestPanel({ active }: { active: boolean }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Autonomous A/B Variant Splits</h4>
        <p className="text-xs text-slate-500 mt-1">Managed distribution balancing optimized weights automatically via MCP servers.</p>
      </div>
      <button 
        onClick={() => useCampaignStore.update({ abTestActive: !active })}
        className={`px-4 py-2 rounded-lg font-mono text-xs font-bold border transition ${active ? 'bg-emerald-950 text-emerald-400 border-emerald-700' : 'bg-slate-950 text-slate-500 border-slate-850'}`}
      >
        {active ? "ACTIVE TESTING" : "ACTIVATE FORK"}
      </button>
    </div>
  );
}
