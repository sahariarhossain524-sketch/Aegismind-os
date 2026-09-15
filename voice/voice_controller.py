import time
from typing import Dict, Any

class SpeechmaticsVoiceSupervisor:
    def __init__(self, settling_threshold_sec: float = 0.8):
        self.settling_threshold_sec = settling_threshold_sec
        self.last_transcript = ""
        self.last_change_time = time.time()
        self.confirmed_commands = []

    def process_streaming_transcript(self, transcript: str) -> Dict[str, Any]:
        now = time.time()
        clean_text = transcript.strip()

        if clean_text != self.last_transcript:
            self.last_transcript = clean_text
            self.last_change_time = now
            return {
                "status": "UNSTABLE_STREAMING",
                "transcript": clean_text,
                "action": "HOLD",
                "settling_progress": 0.0,
                "message": "Speech streaming... waiting for speaker pause."
            }

        elapsed = now - self.last_change_time
        if elapsed >= self.settling_threshold_sec and clean_text:
            lower = clean_text.lower()
            is_emergency_stop = any(w in lower for w in ["stop", "emergency", "halt", "shutdown"])
            is_reroute = any(w in lower for w in ["reroute", "divert", "bypass"])

            action = "EMERGENCY_OVERRIDE" if is_emergency_stop else ("REROUTE_PIPELINE" if is_reroute else "EXECUTE")
            self.confirmed_commands.append({"transcript": clean_text, "action": action, "time": now})

            return {
                "status": "SETTLED_STABLE",
                "transcript": clean_text,
                "action": action,
                "settling_progress": 1.0,
                "message": f"Transcript stabilized ({elapsed:.2f}s). Executing command '{action}'."
            }

        return {
            "status": "SETTLING_WAIT",
            "transcript": clean_text,
            "action": "HOLD",
            "settling_progress": min(1.0, elapsed / self.settling_threshold_sec),
            "message": f"Hold filter active ({elapsed:.2f}s / {self.settling_threshold_sec}s)..."
        }
