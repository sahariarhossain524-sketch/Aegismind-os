import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from sandbox.ast_patcher import ASTSelfHealingEngine

class TestASTSandbox(unittest.TestCase):
    def setUp(self):
        self.engine = ASTSelfHealingEngine()

    def test_safe_schema_patch(self):
        safe_code = """
def adapt_schema(data):
    return {str(k): str(v) for k, v in data.items()}
"""
        res = self.engine.validate_and_apply_patch(safe_code)
        self.assertTrue(res["success"])
        self.assertLess(res["latency_ms"], 25.0)  # Sub-25ms self-healing

    def test_forbidden_import_rejection(self):
        unsafe_code = """
import subprocess
subprocess.run(['ls'])
"""
        res = self.engine.validate_and_apply_patch(unsafe_code)
        self.assertFalse(res["success"])
        self.assertIn("Forbidden import", res["error"])

if __name__ == "__main__":
    unittest.main()
