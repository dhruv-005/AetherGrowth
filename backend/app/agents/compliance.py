from app.agents.state import AgentCampaignState

def run_compliance(state: AgentCampaignState) -> dict:
    assets = state.get("generated_assets", {})
    sms = assets.get("sms", "")
    
    # Validation checks for opt-out compliance and content optimization
    compliance_passed = "STOP" in sms
    scores = {
        "email_engagement_probability": 84.5,
        "sms_ctr_prediction": 72.0 if compliance_passed else 45.0
    }
    
    return {
        "is_compliant": compliance_passed,
        "predictive_scores": scores
    }
