export function useAnalytics() {
  return {
    metrics: {
      ctr: 14.8,
      conversions: 322,
      openRate: 42.1,
      bounceRate: 1.2
    },
    funnel: [
      { stage: "Leads Ingested", value: 5000 },
      { stage: "Dispatched Assets", value: 4980 },
      { stage: "Positive Responses", value: 684 }
    ]
  };
}
