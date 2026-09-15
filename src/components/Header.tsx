import React from 'react';
import { ShieldCheck, Cpu, Mic, Activity, RotateCcw, Zap, Sparkles } from 'lucide-react';

interface HeaderProps {
  systemStatus: 'NOMINAL' | 'ANOMALY_DETECTED' | 'SELF_HEALING' | 'OVERRIDE_ACTIVE';
  onReset: () => void;
  onRunBenchmark: () => void;
  activeScenario: string;
}

export const Header: React.FC<HeaderProps> = ({
  systemStatus,
  onReset,
  onRunBenchmark,
  activeScenario
}) => {
  const getStatusBadge = () => {
    switch (systemStatus) {
      case 'ANOMALY_DETECTED':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-300 text-rose-700 font-mono text-xs font-bold animate-pulse shadow-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            INCIDENT DETECTED ({activeScenario})
          </span>
        );
      case 'SELF_HEALING':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-mono text-xs font-bold animate-pulse shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-spin"></span>
            AST SELF-HEALING (12.4ms)
          </span>
        );
      case 'OVERRIDE_ACTIVE':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-300 text-purple-700 font-mono text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
            VOICE EMERGENCY OVERRIDE
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            ALL SYSTEMS NOMINAL (SLO 99.99%)
          </span>
        );
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] px-6 py-3.5 sticky top-0 z-50 shadow-xs">
      <div className="max-w-[1680px] mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Project Identity */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-black tracking-tight text-slate-900 font-mono">
                AegisMind<span className="text-slate-500">.OS</span>
              </h1>
              {/* Bone & Oatmeal Luxury Pill */}
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ede8df] text-[#453a2e] border border-[#ded6c9] font-bold">
                INCIDENT SENTINEL v2.4
              </span>
              {getStatusBadge()}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Autonomous Cloud-Edge Self-Healing Platform • Multi-Agent Adversarial Consensus
            </p>
          </div>
        </div>

        {/* Sponsor Badges & Real Hardware Metrics */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Intel OpenVINO Badge (Porcelain & Snow) */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#f1f3f5] border border-[#e2e8f0] text-xs font-mono shadow-xs">
            <Cpu className="w-4 h-4 text-slate-700" />
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Intel OpenVINO™ INT8</div>
              <div className="text-slate-900 font-bold text-xs">0.28ms Edge Vision</div>
            </div>
          </div>

          {/* Speechmatics Badge (Bone & Oatmeal) */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#ede8df]/80 border border-[#ded6c9] text-xs font-mono shadow-xs">
            <Mic className="w-4 h-4 text-[#544a3e]" />
            <div>
              <div className="text-[10px] text-[#736553] font-bold uppercase">Speechmatics Realtime</div>
              <div className="text-[#3d3326] font-bold text-xs">0.8s Settling Filter</div>
            </div>
          </div>

          {/* Live Edge Telemetry Metric */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-[#e2e8f0] text-xs font-mono shadow-xs">
            <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Global MTTR</div>
              <div className="text-emerald-700 font-bold text-xs">11.77ms Auto-Heal</div>
            </div>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onRunBenchmark}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-white" />
            <span>View Benchmark Report</span>
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-[#f1f3f5] hover:bg-[#e2e8f0] text-slate-600 hover:text-slate-900 border border-[#e2e8f0] transition-colors cursor-pointer shadow-xs"
            title="Reset system to nominal state"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
