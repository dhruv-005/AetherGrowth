from typing import Dict, List, TypedDict, Optional

class AgentCampaignState(TypedDict):
    campaign_id: str
    campaign_goal: str
    target_leads: List[Dict[str, str]]
    market_research: str
    audience_segments: List[str]
    generated_assets: Dict[str, str] # Maps email, sms, web
    predictive_scores: Dict[str, float]
    is_compliant: bool
    human_approved: bool
    delivery_status: str
    optimization_metrics: Optional[Dict[str, any]]
