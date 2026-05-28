"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import MasterDashboardOS from '../../page';

export default function IsolatedCampaignRoutingView() {
  const path = usePathname();
  const routingId = path.split('/').pop();
  
  return (
    <div>
      <div className="bg-cyan-950/40 border-b border-cyan-900/60 p-2 text-center text-xs font-mono text-cyan-400">
        Viewing Dynamic Campaign Stream Identifier context: <span className="underline font-bold">{routingId}</span>
      </div>
      <MasterDashboardOS />
    </div>
  );
}
