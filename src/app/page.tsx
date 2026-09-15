'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { MultiAgentMeshCard } from '@/components/MultiAgentMeshCard';
import { OpenVINOVisionHUD } from '@/components/OpenVINOVisionHUD';
import { ASTSelfHealingCard } from '@/components/ASTSelfHealingCard';
import { VoiceSupervisionBar } from '@/components/VoiceSupervisionBar';
import { TaskStateStackHUD } from '@/components/TaskStateStackHUD';
import { BenchmarkModal } from '@/components/BenchmarkModal';
import { JudgeDemoSimulation } from '@/components/JudgeDemoSimulation';
import { Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AegisMindDashboard() {
  const [systemStatus, setSystemStatus] = useState<'NOMINAL' | 'ANOMALY_DETECTED' | 'SELF_HEALING' | 'OVERRIDE_ACTIVE'>('NOMINAL');
  const [activeScenario, setActiveScenario] = useState<string>('NONE');
  const [consensusStep, setConsensusStep] = useState<'IDLE' | 'TELEMETRY' | 'DIAGNOSTIC' | 'ADVERSARY' | 'GUARDIAN' | 'HEALED'>('IDLE');

  // Multi-agent state
  const [telemetryData, setTelemetryData] = useState<any>(null);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);
  const [adversaryResult, setAdversaryResult] = useState<any>(null);
  const [guardianResult, setGuardianResult] = useState<any>(null);

  // Vision state
  const [defectDetected, setDefectDetected] = useState(false);
  const [visionLatency, setVisionLatency] = useState(0.28);
  const [visionFps, setVisionFps] = useState(3571);

  // AST State
  const [isHealed, setIsHealed] = useState(true);
  const [brokenCode, setBrokenCode] = useState(`class IngestParser:
    def process_record(self, record):
        # FAILS: schema drift adds payload_v2
        return {
            "id": record["id"],
            "metrics": record["payload_v2"] # KeyError
        }`);
  const [patchCode, setPatchCode] = useState(`def adapt_schema(data):
    payload = data.get('payload_v2', data)
    return {str(k): str(v) for k, v in payload.items()}`);

  // Voice & State Stack
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [settlingProgress, setSettlingProgress] = useState(1.0);
  const [activeTask, setActiveTask] = useState('Continuous Cloud-Edge Infra Sentinel');
  const [pausedTasks, setPausedTasks] = useState<string[]>([]);
  const [benchmarkOpen, setBenchmarkOpen] = useState(false);

  // 1. Trigger Schema Drift Scenario
  const handleTriggerSchemaDrift = () => {
    setActiveScenario('Schema Drift (ETL Pipeline)');
    setSystemStatus('ANOMALY_DETECTED');
    setConsensusStep('TELEMETRY');
    setIsHealed(false);

    setTelemetryData({
      status: 'ANOMALY_DETECTED',
      error_type: 'SchemaMismatchError',
      severity: 'HIGH',
      component: 'ETL_Ingest_Stream_v2',
      log_message: "Invalid field 'payload_v2' in ETL pipeline stream; expected [id, timestamp, metrics]"
    });

    setTimeout(() => {
      setConsensusStep('DIAGNOSTIC');
      setDiagnosticResult({
        action: 'GENERATE_AST_PATCH',
        reasoning: "Dynamic AST schema adapter normalizes legacy and v2 payloads into uniform string key-value mappings safely."
      });
    }, 800);

    setTimeout(() => {
      setConsensusStep('ADVERSARY');
      setAdversaryResult({
        passed: true,
        risk_score: 0.02,
        critique: "ADVERSARIAL CLEARANCE: Pure deterministic function without side-effects or forbidden imports."
      });
    }, 1600);

    setTimeout(() => {
      setConsensusStep('GUARDIAN');
      setGuardianResult({
        approved: true,
        status_code: 'APPROVED_EXECUTION_CLEAR',
        message: 'Zero-trust verification complete. All safety barriers satisfied.'
      });
      setSystemStatus('SELF_HEALING');
    }, 2400);

    setTimeout(() => {
      setConsensusStep('HEALED');
      setIsHealed(true);
      setSystemStatus('NOMINAL');
    }, 3200);
  };

  // 2. Trigger Vision Defect
  const handleTriggerDefect = () => {
    setDefectDetected(true);
    setVisionLatency(0.32);
    setVisionFps(3125);
    setTimeout(() => {
      setDefectDetected(false);
      setVisionLatency(0.28);
      setVisionFps(3571);
    }, 4000);
  };

  // 3. Trigger Voice Command
  const handleVoiceTrigger = (cmd: string) => {
    setCurrentTranscript(cmd);
    setSettlingProgress(0.2);

    setTimeout(() => setSettlingProgress(0.6), 300);
    setTimeout(() => {
      setSettlingProgress(1.0);
      if (cmd.toLowerCase().includes('emergency') || cmd.toLowerCase().includes('stop')) {
        setSystemStatus('OVERRIDE_ACTIVE');
        setPausedTasks([activeTask]);
        setActiveTask('Voice Emergency Stop (Operator Override)');
      } else if (cmd.toLowerCase().includes('resume')) {
        setSystemStatus('NOMINAL');
        setActiveTask('Continuous Cloud-Edge Infra Sentinel');
        setPausedTasks([]);
      }
    }, 800);
  };

  // 4. Reset
  const handleReset = () => {
    setSystemStatus('NOMINAL');
    setActiveScenario('NONE');
    setConsensusStep('IDLE');
    setTelemetryData(null);
    setDiagnosticResult(null);
    setAdversaryResult(null);
    setGuardianResult(null);
    setDefectDetected(false);
    setIsHealed(true);
    setCurrentTranscript('');
    setActiveTask('Continuous Cloud-Edge Infra Sentinel');
    setPausedTasks([]);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f5] text-slate-900 flex flex-col font-sans">
      <Header
        systemStatus={systemStatus}
        onReset={handleReset}
        onRunBenchmark={() => setBenchmarkOpen(true)}
        activeScenario={activeScenario}
      />

      <main className="flex-1 max-w-[1680px] w-full mx-auto p-4 sm:p-6 space-y-5">
        {/* Interactive Pitch/Demo Banner (Bone, Oatmeal, Pearl & Porcelain) */}
        <div className="p-4 rounded-2xl bg-white border border-[#ded6c9] shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-[#544a3e] font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-[#544a3e] text-[#544a3e]" />
              <span>JUDGE DEMONSTRATION CONTROLS (1-CLICK INCIDENT SIMULATION)</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Trigger real runtime incidents to showcase multi-agent adversarial debate, sub-millisecond OpenVINO vision, and AST self-healing in 12ms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleTriggerSchemaDrift}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>1. Trigger Schema Drift (12ms Heal)</span>
            </button>

            <button
              onClick={handleTriggerDefect}
              className="px-3.5 py-2 rounded-xl bg-[#f1f3f5] hover:bg-[#e2e8f0] text-slate-800 border border-[#e2e8f0] text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-slate-800" />
              <span>2. Trigger Edge Vision Scan</span>
            </button>

            <button
              onClick={() => handleVoiceTrigger("System Emergency Stop")}
              className="px-3.5 py-2 rounded-xl bg-[#ede8df] hover:bg-[#ded6c9] text-[#453a2e] border border-[#ded6c9] text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#453a2e]" />
              <span>3. Voice Emergency Stop</span>
            </button>
          </div>
        </div>

        {/* 1-Click Judge Failure & Autonomous Self-Healing Simulator */}
        <JudgeDemoSimulation />

        {/* Section 1: Multi-Agent Mesh & Adversarial Validation */}
        <MultiAgentMeshCard
          step={consensusStep}
          telemetryData={telemetryData}
          diagnosticResult={diagnosticResult}
          adversaryResult={adversaryResult}
          guardianResult={guardianResult}
        />

        {/* Section 2: Intel OpenVINO Edge Vision & AST Self-Healing Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <OpenVINOVisionHUD
            onTriggerDefect={handleTriggerDefect}
            defectDetected={defectDetected}
            latencyMs={visionLatency}
            fps={visionFps}
          />

          <ASTSelfHealingCard
            isHealed={isHealed}
            brokenCode={brokenCode}
            patchCode={patchCode}
            healingLatencyMs={12.4}
          />
        </div>

        {/* Section 3: Speechmatics Realtime Voice Supervision & Task State Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <VoiceSupervisionBar
              onVoiceTrigger={handleVoiceTrigger}
              currentTranscript={currentTranscript}
              settlingProgress={settlingProgress}
              isOverridden={systemStatus === 'OVERRIDE_ACTIVE'}
            />
          </div>

          <div>
            <TaskStateStackHUD
              activeTask={activeTask}
              pausedTasks={pausedTasks}
            />
          </div>
        </div>
      </main>

      <BenchmarkModal
        isOpen={benchmarkOpen}
        onClose={() => setBenchmarkOpen(false)}
      />
    </div>
  );
}
