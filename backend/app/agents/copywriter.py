from app.agents.state import AgentCampaignState

def run_copywriter(state: AgentCampaignState) -> dict:
    research = state.get("market_research", "")
    # Synthesizing structured cross-channel copies
    email_body = f"<h2>Overcoming Cloud Cost Inefficiencies</h2><p>Based on our market data showing shifts in tech ops, AetherGrowth delivers an automated solution targeting your exact bottleneck.</p>"
    sms_body = "AetherGrowth Alert: Optimize your server asset operations immediately. Reply STOP to unsubscribe."
    
    return {
        "generated_assets": {
            "email": email_body,
            "sms": sms_body
        }
    }
