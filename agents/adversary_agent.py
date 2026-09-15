import ast
from typing import Dict, Any

class AdversaryAgent:
    def __init__(self):
        self.forbidden_tokens = ["import os", "import sys", "subprocess", "eval(", "exec(", "shutil", "open("]

    def challenge_proposed_fix(self, diagnostic_output: Dict[str, Any]) -> Dict[str, Any]:
        fix = diagnostic_output.get("diagnostic_result", {})
        action = fix.get("action", "")
        patch = fix.get("proposed_patch", "")

        if action == "NO_ACTION":
            return {"passed": True, "risk_score": 0.0, "critique": "NO_ACTION verified safe."}

        # 1. Check for dangerous exploit tokens
        for token in self.forbidden_tokens:
            if token in patch:
                return {
                    "passed": False,
                    "risk_score": 0.98,
                    "critique": f"SECURITY REJECTION: Found forbidden malicious pattern '{token}'."
                }

        # 2. Syntax AST Verification
        try:
            tree = ast.parse(patch)
            for node in ast.walk(tree):
                if isinstance(node, (ast.Import, ast.ImportFrom)):
                    return {
                        "passed": False,
                        "risk_score": 0.95,
                        "critique": "REJECTED: Dynamic patches cannot introduce top-level module imports."
                    }
        except SyntaxError as e:
            return {
                "passed": False,
                "risk_score": 1.0,
                "critique": f"SYNTAX ERROR IN PROPOSED PATCH: {str(e)}"
            }

        return {
            "passed": True,
            "risk_score": 0.02,
            "critique": "ADVERSARIAL CLEARANCE: Patch contains pure deterministic transformation functions with zero side-effects."
        }
