from typing import Dict, Any

class RiskGuardian:
    def __init__(self):
        self.allowed_actions = ["GENERATE_AST_PATCH", "DRAIN_AND_PRUNE_BUFFER", "NO_ACTION"]
        self.max_acceptable_risk = 0.15

    def final_gatecheck(self, diagnostic_output: Dict[str, Any], adversary_output: Dict[str, Any]) -> Dict[str, Any]:
        diag = diagnostic_output.get("diagnostic_result", {})
        action = diag.get("action", "NO_ACTION")
        risk_score = adversary_output.get("risk_score", 1.0)
        passed_adversary = adversary_output.get("passed", False)

        if action not in self.allowed_actions:
            return {
                "approved": False,
                "status_code": "DISAPPROVED_UNRECOGNIZED_ACTION",
                "message": f"Action '{action}' is not in deterministic allowed registry."
            }

        if not passed_adversary or risk_score > self.max_acceptable_risk:
            return {
                "approved": False,
                "status_code": "DISAPPROVED_ADVERSARIAL_RISK",
                "message": f"Adversarial risk score ({risk_score}) exceeds threshold ({self.max_acceptable_risk})."
            }

        return {
            "approved": True,
            "status_code": "APPROVED_EXECUTION_CLEAR",
            "message": "Zero-trust verification complete. All safety barriers satisfied.",
            "execution_protocol": "SANDBOXED_BYTECODE_APPLICATION"
        }
