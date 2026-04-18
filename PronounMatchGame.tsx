import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, CheckCircle2, XCircle, Trophy, RefreshCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Pair {
  id: number;
  sp: string;
  arm: string;
}

const PRONOUNS_PAIRS: Pair[] = [
  { id: 1, sp: 'Yo', arm: 'Ես' },
  { id: 2, sp: 'Tú', arm: 'Դու' },
  { id: 3, sp: 'Él', arm: 'Նա (տղա)' },
  { id: 4, sp: 'Ella', arm: 'Նա (աղջիկ)' },
  { id: 5, sp: 'Usted', arm: 'Դուք (հարգալից)' },
  { id: 6, sp: 'Nosotros', arm: 'Մենք (արական)' },
  { id: 7, sp: 'Nosotras', arm: 'Մենք (իգական)' },
  { id: 8, sp: 'Vosotros', arm: 'Դուք (արական)' },
  { id: 9, sp: 'Vosotras', arm: 'Դուք (իգական)' },
  { id: 10, sp: 'Ustedes', arm: 'Դուք (հարգալից)' },
];

export default function PronounMatchGame() {
  const [items, setItems] = useState<{ id: number; text: string; side: 'sp' | 'arm' }[]>([]);
  const [selected, setSelected] = useState<{ id: number; text: string; side: 'sp' | 'arm' }[]>([]);
  const [matches, setMatches] = useState<number[]>([]);
  const [wrongEffect, setWrongEffect] = useState<boolean>(false);

  useEffect(() => {
    const spSide = PRONOUNS_PAIRS.map(p => ({ id: p.id, text: p.sp, side: 'sp' as const }));
    const armSide = PRONOUNS_PAIRS.map(p => ({ id: p.id, text: p.arm, side: 'arm' as const }));
    setItems([...spSide, ...armSide].sort(() => Math.random() - 0.5));
  }, []);

  const handleClick = (item: { id: number; text: string; side: 'sp' | 'arm' }) => {
    if (matches.includes(item.id)) return;
    if (selected.length === 1 && selected[0].side === item.side) {
       setSelected([item]);
       return;
    }

    const newSelected = [...selected, item];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      if (newSelected[0].id === newSelected[1].id) {
        setMatches([...matches, newSelected[0].id]);
        setSelected([]);
        if (matches.length + 1 === PRONOUNS_PAIRS.length) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        setWrongEffect(true);
        setTimeout(() => {
          setSelected([]);
          setWrongEffect(false);
        }, 1000);
      }
    }
  };

  const isCompleted = matches.length === PRONOUNS_PAIRS.length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-emerald-400">Գուշակիր <span className="text-white">Զույգը</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Միացրու իսպաներեն և հայերեն դերանունները</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const isMatched = matches.includes(item.id);
            const isSelected = selected.some(s => s.text === item.text);
            return (
              <motion.button
                key={`${item.text}-${i}`}
                onClick={() => handleClick(item)}
                className={`p-6 md:p-8 rounded-[2rem] font-black text-xl md:text-2xl transition-all shadow-xl active:scale-95 border-2 ${
                  isMatched 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 opacity-50 cursor-default' 
                    : isSelected 
                    ? 'bg-sky-500 border-sky-400 text-white scale-105 shadow-sky-500/40' 
                    : wrongEffect && isSelected
                    ? 'bg-rose-600 border-rose-500 text-white animate-shake'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                {item.text}
              </motion.button>
            );
          })}
        </div>

        {isCompleted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
             <Trophy className="w-24 h-24 text-yellow-400 animate-bounce" />
             <p className="text-3xl font-black uppercase text-emerald-400">Հիանալի է!</p>
             <button onClick={() => window.location.reload()} className="px-10 py-4 bg-sky-500 rounded-full font-black uppercase tracking-widest hover:bg-sky-400">Նորից սկսել</button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
