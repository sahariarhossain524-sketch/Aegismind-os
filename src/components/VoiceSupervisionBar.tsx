import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Radio, Volume2, ShieldAlert, Play } from 'lucide-react';

interface VoiceSupervisionBarProps {
  onVoiceTrigger: (cmd: string) => void;
  currentTranscript: string;
  settlingProgress: number;
  isOverridden: boolean;
}

export const VoiceSupervisionBar: React.FC<VoiceSupervisionBarProps> = ({
  onVoiceTrigger,
  currentTranscript,
  settlingProgress,
  isOverridden
}) => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            interimTranscript += event.results[i][0].transcript;
          }
          if (interimTranscript.trim()) {
            onVoiceTrigger(interimTranscript.trim());
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          if (event.error === 'not-allowed') {
            setMicError('Microphone permission blocked. Please allow mic access in browser.');
          }
        };

        recognition.onend = () => {
          if (isMicActive) {
            try { recognition.start(); } catch (e) {}
          }
        };

        recognitionRef.current = recognition;
      } else {
        setMicError('Web Speech API not supported in this browser; use quick test buttons below.');
      }
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, [isMicActive, onVoiceTrigger]);

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (isMicActive) {
      recognitionRef.current.stop();
      setIsMicActive(false);
    } else {
      setMicError(null);
      try {
        recognitionRef.current.start();
        setIsMicActive(true);
      } catch (err) {
        console.error('Mic start error:', err);
      }
    }
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f5]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#ede8df] border border-[#ded6c9] flex items-center justify-center text-[#453a2e]">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-slate-900">
                SPEECHMATICS STREAMING VOICE SUPERVISION
              </h3>
              <p className="text-[10px] text-slate-500">Live operator safety override with 0.8s Settling Filter</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMic}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                isMicActive
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isMicActive ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              <span>{isMicActive ? 'MIC ACTIVE (LISTENING)' : 'START HARDWARE MIC'}</span>
            </button>
          </div>
        </div>

        {/* Settling Time Filter Bar */}
        <div className="my-3.5 p-3 rounded-xl bg-[#f1f3f5] border border-[#e2e8f0]">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1.5">
            <span className="font-semibold flex items-center gap-1 text-slate-700">
              <Volume2 className="w-3.5 h-3.5 text-slate-600" />
              Settling Time Filter (0.8s lock)
            </span>
            <span className="font-bold text-slate-900">{Math.round(settlingProgress * 100)}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#e2e8f0] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-200 rounded-full ${
                settlingProgress >= 1 ? 'bg-slate-900' : 'bg-slate-600'
              }`}
              style={{ width: `${settlingProgress * 100}%` }}
            />
          </div>
          <div className="mt-2 text-xs font-mono text-slate-700 bg-white border border-[#e2e8f0] rounded-lg px-2.5 py-1.5 truncate">
            <span className="text-slate-400 font-semibold mr-1.5">Transcript:</span>
            {currentTranscript ? (
              <span className="text-slate-900 font-bold">{currentTranscript}</span>
            ) : (
              <span className="text-slate-400 italic">"Say 'Emergency stop' or click test buttons below"</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Test Buttons (Porcelain & Bone) */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#f1f3f5]">
        <button
          onClick={() => onVoiceTrigger("System Emergency Stop")}
          className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Test "System Emergency Stop"</span>
        </button>

        <button
          onClick={() => onVoiceTrigger("System Resume Operations")}
          className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] bg-[#f1f3f5] hover:bg-[#e2e8f0] text-slate-800 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Play className="w-3.5 h-3.5 text-slate-800 fill-slate-800" />
          <span>Test "System Resume"</span>
        </button>

        {micError && (
          <span className="text-[10px] text-rose-600 font-medium ml-2">{micError}</span>
        )}
      </div>
    </div>
  );
};
