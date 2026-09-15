import time
import random
from typing import Dict, Any, List

class TelemetryAgent:
    def __init__(self):
        self.metrics_history: List[Dict[str, Any]] = []

    def scan_telemetry(self, mock_scenario: str = "normal") -> Dict[str, Any]:
        timestamp = time.time()
        cpu_load = round(random.uniform(18.5, 42.0), 1)
        mem_load = round(random.uniform(45.0, 68.0), 1)
        latency_p99 = round(random.uniform(4.5, 8.2), 2)

        if mock_scenario == "schema_drift":
            telemetry = {
                "timestamp": timestamp,
                "status": "ANOMALY_DETECTED",
                "error_type": "SchemaMismatchError",
                "severity": "HIGH",
                "component": "ETL_Ingest_Stream_v2",
                "cpu_load_pct": 78.4,
                "memory_load_pct": 86.2,
                "latency_p99_ms": 142.8,
                "log_message": "Invalid field 'payload_v2' in ETL pipeline stream; expected schema [id, timestamp, metrics]",
                "affected_records": 1240,
                "mttr_baseline_sec": 750.0  # Human MTTR ~ 12.5 mins
            }
        elif mock_scenario == "memory_leak":
            telemetry = {
                "timestamp": timestamp,
                "status": "ANOMALY_DETECTED",
                "error_type": "UnboundedMemorySpike",
                "severity": "CRITICAL",
                "component": "Kafka_Event_Buffer",
                "cpu_load_pct": 94.1,
                "memory_load_pct": 98.6,
                "latency_p99_ms": 890.0,
                "log_message": "Buffer allocation exceeded 4GB threshold. Garbage collector thrashing.",
                "affected_records": 5400,
                "mttr_baseline_sec": 1200.0
            }
        else:
            telemetry = {
                "timestamp": timestamp,
                "status": "HEALTHY",
                "error_type": "NONE",
                "severity": "NOMINAL",
                "component": "Cluster_Mesh",
                "cpu_load_pct": cpu_load,
                "memory_load_pct": mem_load,
                "latency_p99_ms": latency_p99,
                "log_message": "All pipeline channels operating within SLO (P99 < 10ms)."
            }

        self.metrics_history.append(telemetry)
        return telemetry
