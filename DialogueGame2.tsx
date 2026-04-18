import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, CheckCircle2, XCircle, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DialogueLine {
  id: number;
  sp: string;
  arm: string;
}

const DIALOGUE_LINES: DialogueLine[] = [
  { id: 1, sp: "¿Usted viene a la fiesta mañana?", arm: "Դուք (հարգալից) գալի՞ս եք վաղվա փառատոնին:" },
  { id: 2, sp: "Sí, yo voy con mis amigos.", arm: "Այո, ես գնում եմ իմ ընկերների հետ:" },
  { id: 3, sp: "¿Vienen ellos también?", arm: "Նրանք նույնպե՞ս գալիս են:" },
  { id: 4, sp: "No, ellos no pueden venir.", arm: "Ոչ, նրանք չեն կարող գալ:" },
  { id: 5, sp: "Qué lástima, los esperamos pronto.", arm: "Ինչ ափսոս, շուտով նրանց կսպասենք:" },
];

export default function DialogueGame2() {
  const [shuffledLines, setShuffledLines] = useState<DialogueLine[]>([]);
  const [orderedLines, setOrderedLines] = useState<DialogueLine[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    setShuffledLines([...DIALOGUE_LINES].sort(() => Math.random() - 0.5));
  }, []);

  const handleLineClick = (line: DialogueLine, index: number) => {
    if (feedback === 'correct') return;
    
    const newOrdered = [...orderedLines, line];
    setOrderedLines(newOrdered);
    
    const newShuffled = [...shuffledLines];
    newShuffled.splice(index, 1);
    setShuffledLines(newShuffled);

    if (newOrdered.length === DIALOGUE_LINES.length) {
      const isCorrect = newOrdered.every((line, i) => line.id === DIALOGUE_LINES[i].id);
      if (isCorrect) {
        setFeedback('correct');
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      } else {
        setFeedback('wrong');
      }
    }
  };

  const reset = () => {
    setShuffledLines([...DIALOGUE_LINES].sort(() => Math.random() - 0.5));
    setOrderedLines([]);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-indigo-400">Երկխոսություն <span className="text-white">#2</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Վերականգնիր հարգալից և ընկերական խոսակցությունը</p>
        </div>

        <div className="space-y-4 min-h-[300px] p-8 bg-white/5 border-4 border-dashed border-white/10 rounded-[3rem]">
          <AnimatePresence>
            {orderedLines.map((line, i) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-[2rem] flex flex-col gap-2 shadow-xl ${i % 2 === 0 ? 'bg-indigo-500/20 mr-12 border-l-4 border-indigo-500' : 'bg-slate-800/50 ml-12 text-right border-r-4 border-slate-600'}`}
              >
                <p className="text-2xl md:text-3xl font-black text-white">{line.sp}</p>
                <p className="text-lg font-bold text-slate-400 italic">{line.arm}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {shuffledLines.map((line, i) => (
              <motion.button
                layout
                key={line.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => handleLineClick(line, i)}
                className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] text-left font-bold text-lg md:text-xl transition-all hover:scale-[1.02] flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-5 h-5 text-indigo-400" />
                </div>
                <span>{line.sp}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={`p-10 rounded-[4rem] border-4 flex flex-col items-center gap-6 text-center shadow-2xl ${feedback === 'correct' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
              <div className="text-4xl font-black uppercase italic tracking-widest">
                {feedback === 'correct' ? <Trophy className="w-16 h-16 text-yellow-500 mb-4 mx-auto" /> : <XCircle className="w-16 h-16 text-rose-500 mb-4 mx-auto" />}
                {feedback === 'correct' ? "ՀԱՆՃԱՐԵՂ Է!" : "ՍԽԱԼ Է"}
              </div>
              <button 
                onClick={reset}
                className={`px-12 py-5 rounded-full font-black text-2xl uppercase tracking-widest text-white shadow-xl transition-all ${feedback === 'correct' ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-rose-500 hover:bg-rose-400'}`}
              >
                {feedback === 'correct' ? "ՍԿՍԵԼ ՆՈՐԻՑ" : "ՓՈՐՁԵԼ ԿՐԿԻՆ"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
