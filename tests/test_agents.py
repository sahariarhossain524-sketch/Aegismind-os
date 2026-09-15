import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from agents.telemetry_agent import TelemetryAgent
from agents.diagnostic_agent import DiagnosticAgent
from agents.adversary_agent import AdversaryAgent
from agents.risk_guardian import RiskGuardian

class TestMultiAgentMesh(unittest.TestCase):
    def setUp(self):
        self.telemetry = TelemetryAgent()
        self.diagnostic = DiagnosticAgent()
        self.adversary = AdversaryAgent()
        self.guardian = RiskGuardian()

    def test_nominal_telemetry(self):
        t_data = self.telemetry.scan_telemetry("normal")
        self.assertEqual(t_data["status"], "HEALTHY")
        d_out = self.diagnostic.diagnose_and_propose(t_data)
        self.assertEqual(d_out["diagnostic_result"]["action"], "NO_ACTION")
        a_out = self.adversary.challenge_proposed_fix(d_out)
        self.assertTrue(a_out["passed"])
        g_out = self.guardian.final_gatecheck(d_out, a_out)
        self.assertTrue(g_out["approved"])

    def test_schema_drift_healing_consensus(self):
        t_data = self.telemetry.scan_telemetry("schema_drift")
        self.assertEqual(t_data["status"], "ANOMALY_DETECTED")
        d_out = self.diagnostic.diagnose_and_propose(t_data)
        self.assertEqual(d_out["diagnostic_result"]["action"], "GENERATE_AST_PATCH")
        a_out = self.adversary.challenge_proposed_fix(d_out)
        self.assertTrue(a_out["passed"])
        self.assertLess(a_out["risk_score"], 0.15)
        g_out = self.guardian.final_gatecheck(d_out, a_out)
        self.assertTrue(g_out["approved"])
        self.assertEqual(g_out["status_code"], "APPROVED_EXECUTION_CLEAR")

    def test_adversary_rejects_malicious_code(self):
        malicious_diag = {
            "diagnostic_result": {
                "action": "GENERATE_AST_PATCH",
                "proposed_patch": "import os; os.system('rm -rf /')"
            }
        }
        a_out = self.adversary.challenge_proposed_fix(malicious_diag)
        self.assertFalse(a_out["passed"])
        self.assertGreater(a_out["risk_score"], 0.9)
        g_out = self.guardian.final_gatecheck(malicious_diag, a_out)
        self.assertFalse(g_out["approved"])

if __name__ == "__main__":
    unittest.main()
