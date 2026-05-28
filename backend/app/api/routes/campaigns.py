from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from app.agents.graph import aether_compiled_engine
import uuid

router = APIRouter(tags=["Campaign Operations Management"])

# Temporary in-memory operational database cache
CAMPAIGN_CACHE = {}

class CampaignRequestPayload(BaseModel):
    goal: str
    leads: List[Dict[str, str]]

@router.post("/campaigns/create")
async def create_new_autonomous_run(payload: CampaignRequestPayload):
    generated_id = str(uuid.uuid4())
    
    initial_state = {
        "campaign_id": generated_id,
        "campaign_goal": payload.goal,
        "target_leads": payload.leads,
        "market_research": "",
        "audience_segments": [],
        "generated_assets": {},
        "predictive_scores": {},
        "is_compliant": False,
        "human_approved": False,
        "delivery_status": "Paused in Compliance Validation Buffer Gate",
        "optimization_metrics": None
    }
    
    # Fire processing down compiled agent state machine graph nodes
    result_state = aether_compiled_engine.invoke(initial_state)
    CAMPAIGN_CACHE[generated_id] = result_state
    return {"status": "hitl_paused", "data": result_state}

@router.post("/campaigns/{campaign_id}/approve")
async def execute_distribution_dispatch(campaign_id: str):
    if campaign_id not in CAMPAIGN_CACHE:
        raise HTTPException(status_code=404, detail="Requested campaign session parameters missing.")
    
    current_state = CAMPAIGN_CACHE[campaign_id]
    current_state["human_approved"] = True
    current_state["delivery_status"] = "Dispatched via external integrated communications infrastructure nodes."
    
    # Reroute back into state graph for deployment processing
    final_output = aether_compiled_engine.invoke(current_state)
    CAMPAIGN_CACHE[campaign_id] = final_output
    return {"status": "completed_execution", "data": final_output}
