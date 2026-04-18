import React, { useState } from 'react';
import TheoryPersonalPronouns from './TheoryPersonalPronouns';
import SentenceBuilderGame from './SentenceBuilderGame';
import SentenceBuilderGame2 from './SentenceBuilderGame2';
import DialogueGame from './DialogueGame';
import DialogueGame2 from './DialogueGame2';
import PronounMatchGame from './PronounMatchGame';
import PronounQuizGame from './PronounQuizGame';
import { BookOpen, PenTool, MessageSquare, Menu, X, Brain, Target, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'theory' | 'match' | 'quiz' | 'sentences1' | 'sentences2' | 'dialogue1' | 'dialogue2'>('theory');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'theory', label: 'Theory', icon: BookOpen, color: 'text-emerald-400' },
    { id: 'match', label: 'Matching', icon: Brain, color: 'text-sky-400' },
    { id: 'quiz', label: 'Quiz', icon: Target, color: 'text-orange-400' },
    { id: 'sentences1', label: 'Builder 1', icon: PenTool, color: 'text-amber-400' },
    { id: 'sentences2', label: 'Builder 2', icon: Layers, color: 'text-yellow-400' },
    { id: 'dialogue1', label: 'Dialogue 1', icon: MessageSquare, color: 'text-rose-400' },
    { id: 'dialogue2', label: 'Dialogue 2', icon: MessageSquare, color: 'text-indigo-400' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-[100] p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:hidden text-white hover:bg-white/20 transition-all"
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Navigation Sidebar */}
      <nav className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/90 backdrop-blur-3xl border-r border-white/10 transition-transform duration-500 md:translate-x-0 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 space-y-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
              Spanish <span className="text-emerald-400">HUB</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Gor & Gayane Edition</p>
          </div>

          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setIsMenuOpen(false); }}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 font-black uppercase tracking-widest text-[11px] transition-all border-2 ${
                  activeTab === tab.id 
                  ? `bg-white/10 border-white/20 shadow-xl ${tab.color}` 
                  : 'bg-transparent border-transparent text-slate-500 hover:bg-white/5'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : 'text-slate-500'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
             <p className="text-[10px] font-black uppercase text-emerald-400 mb-2">Progress</p>
             <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-1/3" />
             </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-72 min-h-screen">
        {activeTab === 'theory' && <TheoryPersonalPronouns />}
        {activeTab === 'match' && <PronounMatchGame />}
        {activeTab === 'quiz' && <PronounQuizGame />}
        {activeTab === 'sentences1' && <SentenceBuilderGame />}
        {activeTab === 'sentences2' && <SentenceBuilderGame2 />}
        {activeTab === 'dialogue1' && <DialogueGame />}
        {activeTab === 'dialogue2' && <DialogueGame2 />}
      </main>
    </div>
  );
}
