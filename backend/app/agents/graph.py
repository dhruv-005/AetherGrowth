from langgraph.graph import StateGraph, END
from app.agents.state import AgentCampaignState
from app.agents.researcher import run_researcher
from app.agents.copywriter import run_copywriter
from app.agents.compliance import run_compliance

def routing_decision_gate(state: AgentCampaignState) -> str:
    if not state["is_compliant"] or any(score < 70 for score in state["predictive_scores"].values()):
        return "rebuild_assets"
    if not state["human_approved"]:
        return "wait_for_ui_gate"
    return "execute_mcp_deployment"

# Initialize state-graph machine
workflow = StateGraph(AgentCampaignState)

# Add functional worker nodes
workflow.add_node("researcher_node", run_researcher)
workflow.add_node("copywriter_node", run_copywriter)
workflow.add_node("compliance_node", run_compliance)

# Set base structural sequence edges
workflow.set_entry_point("researcher_node")
workflow.add_edge("researcher_node", "copywriter_node")
workflow.add_edge("copywriter_node", "compliance_node")

# Dynamic logic control edges routing execution pathways
workflow.add_conditional_edges(
    "compliance_node",
    routing_decision_gate,
    {
        "rebuild_assets": "copywriter_node",
        "wait_for_ui_gate": END,  # Safe state freezing for HITL validation
        "execute_mcp_deployment": END
    }
)

aether_compiled_engine = workflow.compile()
