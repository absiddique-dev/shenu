import { useEffect, useRef } from "react";

export default function ShenuUI({
  listening,
  startListening,
  stopListening,
  speaking,
}) {
  const toggle = () => (listening ? stopListening() : startListening());

  const bars = [
    { h: "h-2", delay: "delay-[0ms]", color: "bg-blue-300" },
    { h: "h-4", delay: "delay-[100ms]", color: "bg-blue-400" },
    { h: "h-6", delay: "delay-[200ms]", color: "bg-blue-500" },
    { h: "h-3", delay: "delay-[300ms]", color: "bg-blue-400" },
    { h: "h-5", delay: "delay-[150ms]", color: "bg-blue-500" },
    { h: "h-7", delay: "delay-[250ms]", color: "bg-blue-600" },
    { h: "h-4", delay: "delay-[50ms]", color: "bg-blue-500" },
    { h: "h-3", delay: "delay-[0ms]", color: "bg-blue-400" },
    { h: "h-6", delay: "delay-[100ms]", color: "bg-blue-500" },
    { h: "h-4", delay: "delay-[200ms]", color: "bg-blue-400" },
    { h: "h-2", delay: "delay-[300ms]", color: "bg-blue-300" },
  ];
  const listeningRef = useRef(false);
  useEffect(() => {
    listeningRef.current = listening;
  }, [listening]);

  return (
    <div className="min-h-dvh bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-80 shadow-sm overflow-hidden">
        {/* Top bar */}
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${listening ? "bg-blue-500" : "bg-slate-300"}`}
            />
            <span className="font-mono text-xs text-slate-400 tracking-widest uppercase">
              shenu.ai
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`w-1.5 h-1.5 rounded-full ${listening ? "bg-blue-400" : "bg-slate-300"}`}
            />
            <span
              className={`font-mono text-xs transition-colors duration-300 ${listening ? "text-blue-400" : "text-slate-400"}`}
            >
              {speaking
                ? "speaking..."
                : listening
                  ? "listening..."
                  : "standby"}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col items-center">
          {/* Orb */}
          <div className="relative flex items-center justify-center mb-8">
            <div
              className={`animate-ring absolute w-24 h-24 rounded-full border transition-colors duration-500 ${listening ? "border-blue-300" : "border-slate-200"}`}
            />
            <div
              className={`animate-ring-delay absolute w-32 h-32 rounded-full border transition-colors duration-500 ${listening ? "border-blue-100" : "border-slate-100"}`}
            />
            <div
              className={`w-16 h-16 rounded-full border flex items-center justify-center relative z-10 transition-all duration-500 ${
                listening
                  ? "bg-blue-50 border-blue-300 shadow-sm shadow-blue-100"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <span className="font-mono font-medium text-2xl text-blue-500 tracking-wider">
                S
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-1">
            <div className="font-mono text-lg font-medium text-slate-800 tracking-widest">
              SHENU
            </div>
            <div className="font-mono text-xs text-slate-400 tracking-widest mt-0.5">
              VOICE AGENT v1.0
            </div>
          </div>

          {/* Terminal status line */}
          <div className="font-mono text-xs mt-3 mb-6 flex items-center gap-1 min-h-[18px]">
            <span className="text-slate-300">&gt;</span>
            <span className="text-slate-500">
              {listening ? "hmm… I'm listening" : "tap to start"}
            </span>
            {listening && (
              <span className="animate-blink text-blue-400">_</span>
            )}
          </div>

          {/* Waveform */}
          <div
            className={`flex items-center gap-0.5 h-8 mb-6 transition-opacity duration-300 ${listening ? "opacity-100" : "opacity-0"}`}
          >
            {bars.map((b, i) => (
              <div
                key={i}
                className={`wave-bar w-0.5 rounded-full ${b.h} ${b.delay} ${b.color}`}
              />
            ))}
          </div>

          {/* Mic / Stop button */}
          <button
            onClick={toggle}
            aria-label={listening ? "Stop Shenu" : "Start Shenu"}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm ${
              listening
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {listening ? (
              <div className="flex gap-1">
                <div className="w-0.5 h-4 rounded-sm bg-white" />
                <div className="w-0.5 h-4 rounded-sm bg-white" />
              </div>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="13" rx="3" fill="white" />
                <path
                  d="M5 11a7 7 0 0 0 14 0"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
                <line
                  x1="12"
                  y1="18"
                  x2="12"
                  y2="22"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1="9"
                  y1="22"
                  x2="15"
                  y2="22"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          <span className="font-mono text-xs text-slate-300 mt-4 tracking-wider">
            {listening ? "tap to stop" : "tap to speak"}
          </span>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 flex justify-between items-center">
          <span className="font-mono text-xs text-slate-300">Tezpur, AS</span>
          <span className="font-mono text-xs text-slate-300">Redrose Sid</span>
        </div>
      </div>
    </div>
  );
}
