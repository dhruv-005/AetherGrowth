"use client";
import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

export default function AnalyticsDashboard() {
  const { metrics, funnel } = useAnalytics();
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">📊 Enterprise Performance Telemetry</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="bg-slate-950 p-4 border border-slate-850 rounded-lg font-mono">
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider">{key}</span>
            <span className="text-lg font-bold text-slate-200">{value}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <span className="block text-[10px] text-slate-500 uppercase font-mono tracking-wider">Live Conversion Funnel</span>
        {funnel.map((f) => (
          <div key={f.stage} className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-850">
            <span className="text-slate-400">{f.stage}</span>
            <span className="text-cyan-400 font-bold">{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
