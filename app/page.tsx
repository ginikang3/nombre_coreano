"use client";

import { useState } from 'react';
import { convertLatinToKorean } from '../lib/converter';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(convertLatinToKorean(input));
  };

  const handleReset = () => {
    setInput('');
    setResult('');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 space-y-8 border border-gray-100">
        
        {/* Header 섹션: 대비를 높여 정보 계층 분리 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-[900] text-slate-900 tracking-tight">
            Conversor
          </h1>
          <p className="text-slate-500 font-semibold text-sm tracking-wide uppercase">
            Latino <span className="text-blue-500 mx-1">→</span> Coreano
          </p>
        </div>

        <form onSubmit={handleConvert} className="space-y-5">
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej: Heli, Maria..."
              className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-xl text-black font-medium placeholder:text-slate-300 shadow-sm"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-[2.5] bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-blue-600 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] text-lg"
            >
              Convertir
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-slate-100 text-slate-600 font-bold py-5 rounded-2xl hover:bg-slate-200 transition-all active:scale-[0.98] text-lg"
            >
              Reset
            </button>
          </div>
        </form>

        {/* 결과 섹션: 카드 내부의 카드로 디자인하여 주목도 강화 */}
        <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-10 text-center space-y-3 shadow-xl">
          {/* 배경 장식 (생략 가능) */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          
          <p className="text-blue-400 text-[0.65rem] font-black tracking-[0.2em] uppercase">
            Pronunciación
          </p>
          <div className="text-6xl font-black text-white tracking-tighter min-h-[1em] transition-all">
            {result || " "}
          </div>
        </div>

        {/* Footer 섹션: 깔끔한 마무리 */}
        <div className="pt-2 text-center">
          <p className="text-slate-300 text-[10px] font-bold tracking-widest uppercase">
            Next.js 14 • Latin-Korean Engine
          </p>
        </div>
      </div>
    </main>
  );
}