import React from 'react';
import { Layers, Play, Pause, Server } from 'lucide-react';

interface TaskStateStackHUDProps {
  activeTask: string;
  pausedTasks: string[];
}

export const TaskStateStackHUD: React.FC<TaskStateStackHUDProps> = ({
  activeTask,
  pausedTasks
}) => {
  const microservices = [
    { name: 'etl-worker-01', type: 'Pod / Ingest', status: 'HEALTHY', latency: '4.2ms' },
    { name: 'kafka-buffer-node', type: 'Queue / FIFO', status: 'HEALTHY', latency: '2.1ms' },
    { name: 'openvino-edge-01', type: 'NPU / INT8', status: '3,571 FPS', latency: '0.28ms' },
  ];

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f5]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#f1f3f5] border border-[#e2e8f0] flex items-center justify-center text-slate-800">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-slate-900">
                TASK STATE STACK & CLUSTER
              </h3>
              <p className="text-[10px] text-slate-500">Zero-loss LIFO state preemption</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#f1f3f5] border border-[#e2e8f0] text-slate-600">
            Stack: {pausedTasks.length}
          </span>
        </div>

        <div className="space-y-2.5 my-3.5">
          {/* Active Task (Bone & Oatmeal Luxury Container) */}
          <div className="p-3.5 rounded-xl bg-[#ede8df]/60 border border-[#ded6c9] shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-[#453a2e] font-bold flex items-center gap-1">
                <Play className="w-3 h-3 fill-current text-slate-900" />
                ACTIVE EXECUTION
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#ded6c9] text-[#3d3326] font-bold">
                PRIORITY {activeTask.includes('Emergency') ? '99' : '1'}
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-900 truncate">
              {activeTask}
            </div>
          </div>

          {/* Interrupted Tasks (Porcelain & Snow) */}
          <div className="p-3 rounded-xl bg-[#f1f3f5] border border-[#e2e8f0]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-slate-600 font-semibold flex items-center gap-1">
                <Pause className="w-3 h-3 text-slate-600" />
                INTERRUPTED STACK
              </span>
              <span className="text-[9px] font-mono text-slate-400">LIFO QUEUE</span>
            </div>
            {pausedTasks.length > 0 ? (
              <div className="space-y-1 mt-1.5">
                {pausedTasks.map((t, idx) => (
                  <div key={idx} className="text-xs font-mono text-slate-800 bg-white border border-[#e2e8f0] rounded px-2 py-1 truncate">
                    [LIFO #{idx + 1}] {t}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 italic mt-1 font-mono">
                No paused tasks in stack
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kubernetes Pods Status */}
      <div className="pt-3 border-t border-[#f1f3f5]">
        <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase mb-2 flex items-center gap-1">
          <Server className="w-3 h-3" />
          <span>CLUSTER MICROSERVICE STATUS</span>
        </div>
        <div className="space-y-1.5">
          {microservices.map((pod) => (
            <div key={pod.name} className="flex items-center justify-between text-xs font-mono p-2 rounded-lg bg-[#f1f3f5] border border-[#e2e8f0]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-800 font-bold">{pod.name}</span>
                <span className="text-[10px] text-slate-400 font-sans">({pod.type})</span>
              </div>
              <span className="text-slate-600 font-medium">{pod.latency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
