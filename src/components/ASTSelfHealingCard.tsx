import React from 'react';
import { Code2, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface ASTSelfHealingCardProps {
  isHealed: boolean;
  brokenCode: string;
  patchCode: string;
  healingLatencyMs: number;
}

export const ASTSelfHealingCard: React.FC<ASTSelfHealingCardProps> = ({
  isHealed,
  brokenCode,
  patchCode,
  healingLatencyMs
}) => {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f5]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#f1f3f5] border border-[#e2e8f0] flex items-center justify-center text-slate-800">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-slate-900">
                AST SANDBOXED SELF-HEALING ENGINE
              </h3>
              <p className="text-[10px] text-slate-500">Autonomous Python bytecode compiler & AST patcher</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full bg-[#f1f3f5] border border-[#e2e8f0] text-slate-700 font-bold">
            <Clock className="w-3 h-3 text-slate-600" />
            <span>MTTR: {healingLatencyMs}ms</span>
          </div>
        </div>

        {/* Code Diff Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 font-mono text-xs">
          {/* Defective Schema */}
          <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/80">
            <div className="text-[10px] font-bold text-rose-700 uppercase mb-1.5 flex items-center justify-between">
              <span>UNRESOLVED SCHEMA (CRASH)</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-200/70 text-rose-800 font-mono">KeyError</span>
            </div>
            <pre className="text-slate-700 whitespace-pre-wrap leading-relaxed overflow-x-auto text-[11px]">
              {brokenCode}
            </pre>
          </div>

          {/* Autonomous AST Patch */}
          <div className="p-3.5 rounded-xl bg-[#f1f3f5] border border-emerald-300/80">
            <div className="text-[10px] font-bold text-emerald-800 uppercase mb-1.5 flex items-center justify-between">
              <span>DYNAMIC AST PATCH (ZERO-LOSS)</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">12.4ms MTTR</span>
            </div>
            <pre className="text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto text-[11px] font-semibold">
              {patchCode}
            </pre>
          </div>
        </div>
      </div>

      {/* Security Gate Banner (Bone & Oatmeal) */}
      <div className="p-3 rounded-xl bg-[#ede8df]/70 border border-[#ded6c9] text-xs font-mono text-[#453a2e] flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>AST Sandbox Security Gate:</span>
        </span>
        <strong className="text-slate-900 font-mono text-xs">
          100% Exploit Rejection (subprocess, os, eval blocked)
        </strong>
      </div>
    </div>
  );
};
