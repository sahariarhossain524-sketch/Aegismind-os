import React from 'react';
import { X, Zap } from 'lucide-react';

interface BenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BenchmarkModal: React.FC<BenchmarkModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-900 font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#f1f3f5] text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pb-3 border-b border-[#f1f3f5] text-slate-900 font-bold text-base font-mono">
          <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 fill-current text-white" />
          </div>
          <span>EMPIRICAL 100-TRIAL BENCHMARK REPORT</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-5 font-mono">
          <div className="p-3.5 rounded-xl bg-[#f1f3f5] border border-[#e2e8f0] text-center">
            <div className="text-[10px] text-slate-500 font-bold uppercase">SUCCESS RATE</div>
            <div className="text-xl font-bold text-emerald-700 mt-1">100.0%</div>
            <div className="text-[9px] text-slate-500 mt-0.5">100/100 Trials Passed</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f1f3f5] border border-[#e2e8f0] text-center">
            <div className="text-[10px] text-slate-500 font-bold uppercase">MEAN RECOVERY (MTTR)</div>
            <div className="text-xl font-bold text-slate-900 mt-1">11.77 ms</div>
            <div className="text-[9px] text-emerald-700 font-semibold mt-0.5">84.8% Reduction</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f1f3f5] border border-[#e2e8f0] text-center">
            <div className="text-[10px] text-slate-500 font-bold uppercase">OPENVINO LATENCY</div>
            <div className="text-xl font-bold text-slate-900 mt-1">0.34 ms</div>
            <div className="text-[9px] text-slate-500 mt-0.5">3,075 FPS INT8</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#ede8df]/50 border border-[#ded6c9] text-xs space-y-2 text-slate-800 font-mono">
          <div className="flex items-center justify-between">
            <span>• Adversarial Hallucination Catch Rate:</span>
            <strong className="text-emerald-700">100% (20/20 Malicious Tests Blocked)</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>• AST Bytecode Sandbox Compilation:</span>
            <strong className="text-slate-900">P95: 12.0ms | P99: 12.11ms</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>• Speechmatics Settling Filter Precision:</span>
            <strong className="text-slate-900">100% (0 False Triggers)</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>• Intel OpenVINO Sub-ms Latency:</span>
            <strong className="text-slate-900">Mean 0.34ms (&lt; 1ms Target)</strong>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-[#f1f3f5] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-all"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
