"use client";
import React from 'react';

export default function HitlGate({ onApprove, approved, status }: { onApprove: () => void, approved: boolean, status: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center gap-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Distribution Node Pipeline Authorization</h4>
        <p className="text-sm font-semibold text-emerald-400 mt-1 font-mono">Current Status: {status}</p>
      </div>
      {!approved && (
        <button onClick={onApprove} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition active:scale-95">
          Authorize & Dispatched
        </button>
      )}
    </div>
  );
}
