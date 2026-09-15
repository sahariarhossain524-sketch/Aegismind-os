import React from 'react';
import { Activity, Brain, ShieldAlert, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface MultiAgentMeshCardProps {
  step: 'IDLE' | 'TELEMETRY' | 'DIAGNOSTIC' | 'ADVERSARY' | 'GUARDIAN' | 'HEALED';
  telemetryData: any;
  diagnosticResult: any;
  adversaryResult: any;
  guardianResult: any;
}

export const MultiAgentMeshCard: React.FC<MultiAgentMeshCardProps> = ({
  step,
  telemetryData,
  diagnosticResult,
  adversaryResult,
  guardianResult
}) => {
  const agents = [
    {
      id: 'telemetry',
      name: 'Telemetry Agent',
      role: 'Metrics & Log Observer',
      icon: Activity,
      active: step !== 'IDLE',
      passed: step !== 'IDLE',
      tag: telemetryData?.status || 'NOMINAL',
      detail: telemetryData?.log_message || 'Observing Kafka ingestion & microservice streams. P99 < 10ms.'
    },
    {
      id: 'diagnostic',
      name: 'Diagnostic Agent',
      role: 'Root-Cause & AST Generator',
      icon: Brain,
      active: ['DIAGNOSTIC', 'ADVERSARY', 'GUARDIAN', 'HEALED'].includes(step),
      passed: ['DIAGNOSTIC', 'ADVERSARY', 'GUARDIAN', 'HEALED'].includes(step),
      tag: diagnosticResult?.action || 'STANDBY',
      detail: diagnosticResult?.reasoning || 'Awaiting incident detection triggers.'
    },
    {
      id: 'adversary',
      name: 'Adversary Agent',
      role: 'Red-Team Stress-Tester',
      icon: ShieldAlert,
      active: ['ADVERSARY', 'GUARDIAN', 'HEALED'].includes(step),
      passed: adversaryResult?.passed ?? true,
      tag: adversaryResult?.passed ? 'PASSED (0.02 Risk)' : 'CHALLENGING',
      detail: adversaryResult?.critique || 'Zero side-effects, no forbidden imports (os/subprocess blocked).'
    },
    {
      id: 'guardian',
      name: 'Risk Guardian',
      role: 'Deterministic Gateway',
      icon: ShieldCheck,
      active: ['GUARDIAN', 'HEALED'].includes(step),
      passed: guardianResult?.approved ?? true,
      tag: guardianResult?.approved ? 'APPROVED (SLO 99.99%)' : 'STANDBY',
      detail: guardianResult?.message || 'Deterministic execution clear. Zero-trust validation enforced.'
    }
  ];

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[#f1f3f5]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-700" />
          <h2 className="text-sm font-mono font-bold text-slate-900 tracking-tight">
            MULTI-AGENT ADVERSARIAL CONSENSUS MESH
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Autonomous Debate Stage:</span>
          {/* Bone & Oatmeal Badge */}
          <span className="px-2.5 py-0.5 rounded-full bg-[#ede8df] text-[#453a2e] border border-[#ded6c9] font-bold">
            {step}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
        {agents.map((ag) => {
          const Icon = ag.icon;
          return (
            <div
              key={ag.id}
              className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                ag.active
                  ? 'bg-[#f1f3f5]/70 border-[#cbd5e1] shadow-xs'
                  : 'bg-white border-[#e2e8f0]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f1f3f5] border border-[#e2e8f0] flex items-center justify-center text-slate-800">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ede8df] text-[#453a2e] border border-[#ded6c9] font-bold">
                    {ag.tag}
                  </span>
                </div>

                <div className="text-xs font-mono font-bold text-slate-900">
                  {ag.name}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mb-2">
                  {ag.role}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {ag.detail}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#e2e8f0] flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Validation:</span>
                <span className="font-bold flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ag.active ? 'VERIFIED' : 'READY'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
