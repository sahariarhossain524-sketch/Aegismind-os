import React from 'react';
import { Eye, Zap, CheckCircle2, AlertOctagon } from 'lucide-react';

interface OpenVINOVisionHUDProps {
  onTriggerDefect: () => void;
  defectDetected: boolean;
  latencyMs: number;
  fps: number;
}

export const OpenVINOVisionHUD: React.FC<OpenVINOVisionHUDProps> = ({
  onTriggerDefect,
  defectDetected,
  latencyMs,
  fps
}) => {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f5]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#f1f3f5] border border-[#e2e8f0] flex items-center justify-center text-slate-800">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-slate-900">
                INTEL OPENVINO™ EDGE VISION INSPECTOR
              </h3>
              <p className="text-[10px] text-slate-500">Sub-millisecond INT8 NPU edge inference pipeline</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#f1f3f5] border border-[#e2e8f0] text-slate-700 font-bold">
            &lt; 1ms Target
          </span>
        </div>

        {/* Camera Viewport (Dark Monitor) */}
        <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden my-3.5 flex items-center justify-center">
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          {/* Reticle / Detection Box */}
          <div
            className={`w-32 h-32 rounded-xl border-2 flex items-center justify-center transition-all duration-300 relative ${
              defectDetected
                ? 'border-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse'
                : 'border-sky-400/80 bg-sky-400/5'
            }`}
          >
            <div className="absolute top-1 left-1.5 text-[8px] font-mono font-bold text-white/90">
              ROI-01 [99.8%]
            </div>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              defectDetected ? 'bg-rose-600 text-white' : 'bg-slate-900/90 text-sky-300 border border-slate-700'
            }`}>
              {defectDetected ? 'ANOMALY DETECTED' : 'SURFACE NOMINAL'}
            </span>
          </div>

          <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-400">
            FRAME #104,982 • INT8 SYNCHRONOUS
          </div>
        </div>
      </div>

      {/* Metrics & Trigger (Porcelain & Snow) */}
      <div>
        <div className="grid grid-cols-2 gap-3 mb-3 font-mono">
          <div className="p-3 rounded-xl bg-[#f1f3f5] border border-[#e2e8f0]">
            <div className="text-[10px] text-slate-500 font-bold uppercase">INFERENCE LATENCY</div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{latencyMs.toFixed(2)} ms</div>
            <div className="text-[9px] text-emerald-700 font-semibold">✓ Sub-ms verified</div>
          </div>
          <div className="p-3 rounded-xl bg-[#f1f3f5] border border-[#e2e8f0]">
            <div className="text-[10px] text-slate-500 font-bold uppercase">THROUGHPUT</div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{fps.toLocaleString()} FPS</div>
            <div className="text-[9px] text-slate-500">Batch Size: 1</div>
          </div>
        </div>

        <button
          onClick={onTriggerDefect}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Zap className="w-3.5 h-3.5 fill-current text-white" />
          <span>Simulate Surface Anomaly Frame</span>
        </button>
      </div>
    </div>
  );
};
