"use client";
import React from 'react';
import AnalyticsDashboard from '../../components/analytics-dashboard';

export default function AnalyticsRoutePage() {
  return (
    <div className="p-8 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold font-mono text-cyan-400">System Performance Metrics Archive</h2>
      <AnalyticsDashboard />
    </div>
  );
}
