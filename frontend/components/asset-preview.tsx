"use client";
import React, { useState } from 'react';

interface Props { email: string; sms: string; score: number; compliant: boolean; }

export default function AssetPreview({ email, sms, score, compliant }: Props) {
  const [tab, setTab] = useState<'email' | 'sms'>('email');
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
        <div className="flex gap-2">
          <button onClick={() => setTab('email')} className={`px-3 py-1.5 text-xs font-bold rounded-md ${tab === 'email' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500'}`}>Email Variant</button>
          <button onClick={() => setTab('sms')} className={`px-3 py-1.5 text-xs font-bold rounded-md ${tab === 'sms' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500'}`}>SMS Variant</button>
        </div>
        <div className="flex gap-4 text-right font-mono text-xs">
          <div><span className="text-slate-500">CRITIC SCORE:</span> <span className="text-emerald-400 font-bold">{score}%</span></div>
          <div><span className="text-slate-500">COMPLIANCE:</span> <span className={compliant ? "text-emerald-400" : "text-rose-400"}>{compliant ? "PASS" : "FAIL"}</span></div>
        </div>
      </div>
      <div className="bg-slate-950 border border-slate-850 rounded-lg p-4 min-h-[160px] font-mono text-sm text-slate-300">
        {tab === 'email' ? (
          <div dangerouslySetInnerHTML={{ __html: email || "<p class='text-slate-600'>No email asset generated yet.</p>" }} />
        ) : (
          <p>{sms || "No text asset generated yet."}</p>
        )}
      </div>
    </div>
  );
}
