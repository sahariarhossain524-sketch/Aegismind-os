import time
from typing import Dict, Any, List, Optional

class TaskState:
    def __init__(self, task_id: str, name: str, context: Dict[str, Any], priority: int = 1):
        self.task_id = task_id
        self.name = name
        self.context = context
        self.priority = priority
        self.timestamp = time.time()
        self.status = "RUNNING"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "task_id": self.task_id,
            "name": self.name,
            "priority": self.priority,
            "timestamp": self.timestamp,
            "status": self.status,
            "context_keys": list(self.context.keys())
        }

class StateStackManager:
    def __init__(self):
        self.stack: List[TaskState] = []
        self.current_task: Optional[TaskState] = None
        self.history: List[Dict[str, Any]] = []

    def start_task(self, task_id: str, name: str, context: Dict[str, Any], priority: int = 1) -> TaskState:
        task = TaskState(task_id, name, context, priority)
        if self.current_task:
            if priority > self.current_task.priority:
                self.current_task.status = "PAUSED_INTERRUPTED"
                self.stack.append(self.current_task)
                self.history.append({"action": "INTERRUPT_PUSH", "paused": self.current_task.name, "by": task.name})
                self.current_task = task
            else:
                self.stack.insert(0, task)
                self.history.append({"action": "QUEUE_LOW_PRIORITY", "queued": task.name})
        else:
            self.current_task = task
            self.history.append({"action": "START_TASK", "task": task.name})
        return task

    def interrupt_and_execute(self, override_id: str, override_name: str, context: Dict[str, Any]) -> TaskState:
        return self.start_task(override_id, override_name, context, priority=99)

    def pop_and_resume(self) -> Optional[TaskState]:
        if self.current_task:
            self.current_task.status = "COMPLETED"
            self.history.append({"action": "TASK_COMPLETED", "task": self.current_task.name})
        if self.stack:
            resumed = self.stack.pop()
            resumed.status = "RESUMED_RUNNING"
            self.current_task = resumed
            self.history.append({"action": "RESUME_PULLED", "resumed": resumed.name})
            return resumed
        self.current_task = None
        return None

    def get_status(self) -> Dict[str, Any]:
        return {
            "active_task": self.current_task.to_dict() if self.current_task else None,
            "stack_depth": len(self.stack),
            "paused_tasks": [t.to_dict() for t in self.stack],
            "total_events": len(self.history)
        }
