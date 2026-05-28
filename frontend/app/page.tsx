"use client";
import React, { useState } from 'react';
import { useCampaignStore } from '../store/useCampaignStore';
import { useAgentSocket } from '../hooks/useAgentSocket';
import AgentCanvas from '../components/agent-canvas';
import AssetPreview from '../components/asset-preview';
import HitlGate from '../components/hitl-gate';
import TerminalStream from '../components/terminal-stream';
import AnalyticsDashboard from '../components/analytics-dashboard';
import AbTestPanel from '../components/ab-test-panel';
import MemoryExplorer from '../components/memory-explorer';

export default function MasterDashboardOS() {
  const store = useCampaignStore();
  useAgentSocket();
  const [loading, setLoading] = useState(false);

  const startPipelineRun = async () => {
    setLoading(true);
    useCampaignStore.update({ status: "processing", activeAgent: "Researcher" });
    
    // Simulating deep system node loops sequentially
    setTimeout(() => useCampaignStore.update({ activeAgent: "Copywriter" }), 1500);
    setTimeout(() => {
      useCampaignStore.update({
        status: "paused_gate",
        activeAgent: "Compliance",
        emailContent: "<h2>Optimizing Core Data Silos</h2><p>Accelerate structural enterprise velocity with high-end tools.</p>",
        smsContent: "AetherGrowth: Scale infrastructure deployment arrays securely now. Reply STOP to opt out.",
        score: 91,
        isCompliant: true,
        logs: [
          ...store.logs,
          { agent: "Copywriter Agent", message: "Synthesized multi-format content payloads." },
          { agent: "Compliance Agent", message: "Passed programmatic policy evaluation metrics verification checks." }
        ]
      });
      setLoading(false);
    }, 3000);
  };

  const handleFinalDeployment = () => {
    useCampaignStore.update({
      isApproved: true,
      status: "dispatched_production",
      activeAgent: "None"
    });
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <header className="border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">AetherGrowth OS</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Enterprise Context Optimization Engine</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">🎯 Strategy Core Parameters</h3>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-slate-500 mb-1">Target Campaign Objective</label>
              <textarea value={store.goal} onChange={(e) => useCampaignStore.update({ goal: e.target.value })} className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs focus:outline-none focus:border-cyan-500 font-mono h-20 resize-none" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-slate-500 mb-1">Target Audiences Dataset</label>
              <textarea value={store.leads} onChange={(e) => useCampaignStore.update({ leads: e.target.value })} className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs focus:outline-none focus:border-cyan-500 font-mono h-20 resize-none text-emerald-400" />
            </div>
            <button onClick={startPipelineRun} disabled={loading} className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg disabled:opacity-40 transition">
              {loading ? "PROCESSING..." : "EXECUTE SWARM TARGET"}
            </button>
          </div>
          <MemoryExplorer logs={store.memoryLogs} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <AgentCanvas activeAgent={store.activeAgent} />
          <AssetPreview email={store.emailContent} sms={store.smsContent} score={store.score} compliant={store.isCompliant} />
          <TerminalStream logs={store.logs} />
          <AbTestPanel active={store.abTestActive} />
          <HitlGate onApprove={handleFinalDeployment} approved={store.isApproved} status={store.status} />
          <AnalyticsDashboard />
        </div>
      </div>
    </div>
  );
}
