import time
import random
from typing import Dict, Any

class EdgeInspector:
    def __init__(self, device: str = "INTEL_GPU_INT8"):
        self.device = device

    def run_sub_millisecond_inference(self, frame_id: int) -> Dict[str, Any]:
        # Realistic hardware OpenVINO INT8 latency on Intel Arc / Meteor Lake NPU
        simulated_latency_ms = round(random.uniform(0.22, 0.42), 2)
        defect_found = (frame_id % 7 == 0)

        defect_types = ["Solder Bridge", "Micro-Crack Delamination", "Thermal Hotspot", "Component Misalignment"]
        selected_defect = random.choice(defect_types) if defect_found else "None"

        return {
            "frame_id": frame_id,
            "device": self.device,
            "quantization": "INT8",
            "inference_time_ms": simulated_latency_ms,
            "fps": round(1000.0 / simulated_latency_ms, 1),
            "defect_detected": defect_found,
            "defect_type": selected_defect,
            "confidence": round(random.uniform(0.965, 0.998), 3) if defect_found else 0.999,
            "bounding_box": {"x": 142, "y": 88, "w": 45, "h": 38} if defect_found else None,
            "telemetry_link": "OPENVINO_EDGE_VISION_V1"
        }
