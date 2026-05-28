import React from 'react';

interface MemoryExplorerProps {
  logs?: string[];
}

export default function MemoryExplorer({ logs = [] }: MemoryExplorerProps) {
  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">🧠 Deep Memory Store Explorer</h3>
      <div className="space-y-2">
        {logs && logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="p-2.5 bg-slate-950 border border-slate-850 rounded text-xs font-mono text-slate-400">
              {log}
            </div>
          ))
        ) : (
          <div className="text-xs text-slate-500 italic">No memory logs recorded yet.</div>
        )}
      </div>
    </div>
  );
}
