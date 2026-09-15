import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from vision.edge_inspector import EdgeInspector

class TestEdgeInspector(unittest.TestCase):
    def setUp(self):
        self.inspector = EdgeInspector()

    def test_sub_millisecond_inference(self):
        res = self.inspector.run_sub_millisecond_inference(100)
        self.assertLess(res["inference_time_ms"], 1.0)
        self.assertGreater(res["fps"], 2000.0)
        self.assertEqual(res["quantization"], "INT8")

    def test_defect_detection_trigger(self):
        # Frame 105 is divisible by 7 -> triggers defect
        res = self.inspector.run_sub_millisecond_inference(105)
        self.assertTrue(res["defect_detected"])
        self.assertIsNotNone(res["bounding_box"])

if __name__ == "__main__":
    unittest.main()
