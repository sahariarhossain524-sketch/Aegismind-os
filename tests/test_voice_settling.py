import unittest
import time
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from voice.voice_controller import SpeechmaticsVoiceSupervisor

class TestVoiceSupervisor(unittest.TestCase):
    def setUp(self):
        self.voice = SpeechmaticsVoiceSupervisor(settling_threshold_sec=0.2)

    def test_streaming_to_settled_transition(self):
        # 1. First word -> unstable
        res1 = self.voice.process_streaming_transcript("system")
        self.assertEqual(res1["status"], "UNSTABLE_STREAMING")
        self.assertEqual(res1["action"], "HOLD")

        # 2. Second word -> unstable changing
        res2 = self.voice.process_streaming_transcript("system emergency stop")
        self.assertEqual(res2["status"], "UNSTABLE_STREAMING")

        # 3. Wait for settling threshold (0.25s)
        time.sleep(0.25)
        res3 = self.voice.process_streaming_transcript("system emergency stop")
        self.assertEqual(res3["status"], "SETTLED_STABLE")
        self.assertEqual(res3["action"], "EMERGENCY_OVERRIDE")

if __name__ == "__main__":
    unittest.main()
