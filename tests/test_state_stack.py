import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from core.state_stack import StateStackManager

class TestStateStack(unittest.TestCase):
    def setUp(self):
        self.manager = StateStackManager()

    def test_task_interruption_and_resume(self):
        # Start baseline task
        self.manager.start_task("t1", "Background Log Sentinel", {"processed_logs": 1050}, priority=1)
        self.assertEqual(self.manager.current_task.name, "Background Log Sentinel")

        # Emergency override interrupts baseline
        self.manager.interrupt_and_execute("override_911", "Voice Emergency Stop", {"reason": "Operator command"})
        self.assertEqual(self.manager.current_task.name, "Voice Emergency Stop")
        self.assertEqual(len(self.manager.stack), 1)
        self.assertEqual(self.manager.stack[0].name, "Background Log Sentinel")
        self.assertEqual(self.manager.stack[0].status, "PAUSED_INTERRUPTED")

        # Resume after override finishes
        resumed = self.manager.pop_and_resume()
        self.assertIsNotNone(resumed)
        self.assertEqual(resumed.name, "Background Log Sentinel")
        self.assertEqual(resumed.status, "RESUMED_RUNNING")
        self.assertEqual(len(self.manager.stack), 0)

if __name__ == "__main__":
    unittest.main()
