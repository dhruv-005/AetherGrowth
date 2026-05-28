import React from 'react';

interface LogItem {
  agent: string;
  message: string;
}

interface TerminalStreamProps {
  logs?: LogItem[];
}

export default function TerminalStream({ logs = [] }: TerminalStreamProps) {
  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">📡 System Execution Thought Logs</h3>
      <div className="bg-slate-950 border border-slate-850 rounded-lg p-4 font-mono text-xs h-40 overflow-y-auto space-y-2 text-slate-400">
        {!logs || logs.length === 0 ? (
          <p className="text-slate-600">Awaiting runtime orchestration trigger event profiles...</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="border-l border-cyan-500 pl-2">
              <span className="text-cyan-400 font-bold">[{log?.agent || 'System'}]:</span> <span>{log?.message || ''}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
