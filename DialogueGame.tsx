import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, CheckCircle2, XCircle, ArrowRight, Trophy, RefreshCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DialogueLine {
  id: number;
  sp: string;
  arm: string;
}

const DIALOGUE_LINES: DialogueLine[] = [
  { id: 1, sp: "Hola, ¿cómo estás?", arm: "Ողջույն, ինչպե՞ս ես:" },
  { id: 2, sp: "Muy bien, gracias. ¿Y tú?", arm: "Շատ լավ, շնորհակալություն: Իսկ դո՞ւ:" },
  { id: 3, sp: "Yo también estoy bien.", arm: "Ես նույնպես լավ եմ:" },
  { id: 4, sp: "¿A dónde vas?", arm: "Ո՞ւր ես գնում:" },
  { id: 5, sp: "Voy a la tienda a comprar pan.", arm: "Գնում եմ խանութ՝ հաց գնելու:" },
];

export default function DialogueGame() {
  const [shuffledLines, setShuffledLines] = useState<DialogueLine[]>([]);
  const [orderedLines, setOrderedLines] = useState<DialogueLine[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

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
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
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
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-rose-400">Կառուցիր <span className="text-white">Երկխոսությունը</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Դասավորիր արտահայտությունները ճիշտ հերթականությամբ</p>
        </div>

        {/* Ordered Area */}
        <div className="space-y-4 min-h-[300px] p-8 bg-white/5 border-4 border-dashed border-white/10 rounded-[4rem] relative">
          <AnimatePresence>
            {orderedLines.map((line, i) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-6 rounded-[2rem] flex flex-col gap-2 shadow-xl ${i % 2 === 0 ? 'bg-sky-500/20 mr-12' : 'bg-rose-500/20 ml-12 text-right border-rose-500/20 border'}`}
              >
                <div className="flex items-center gap-3 font-black text-xl uppercase tracking-widest text-white/50">
                  <MessageSquare className="w-5 h-5" /> Խոսակցություն {i + 1}
                </div>
                <p className="text-2xl md:text-3xl font-black">{line.sp}</p>
                <p className="text-lg font-bold text-slate-400 italic">{line.arm}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {orderedLines.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-slate-600 font-black italic uppercase tracking-widest">Ընտրեք արտահայտությունները ստորև</p>
            </div>
          )}
        </div>

        {/* Shuffled Area */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {shuffledLines.map((line, i) => (
              <motion.button
                layout
                key={line.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => handleLineClick(line, i)}
                className="p-6 bg-white/10 hover:bg-white/20 border border-white/10 rounded-[2rem] text-left font-bold text-lg md:text-xl transition-all shadow-xl active:scale-95 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </div>
                {line.sp}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Feedback Area */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-10 rounded-[4rem] border-4 flex flex-col items-center gap-6 text-center shadow-2xl ${feedback === 'correct' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}
            >
              <div className="flex items-center gap-4 text-4xl font-black uppercase italic">
                {feedback === 'correct' ? <Trophy className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
                {feedback === 'correct' ? "ՀԱՂԹԱՆԱԿ!" : "ՍԽԱԼ ՀԵՐԹԱԿԱՆՈՒԹՅՈՒՆ"}
              </div>
              <p className="text-xl font-bold text-white max-w-xl">
                {feedback === 'correct' 
                  ? "Դուք հիանալի կառուցեցիք երկխոսությունը: Կապիտանը հպարտ է ձեզնով!" 
                  : "Այս հերթականությունը ճիշտ չէ: Փորձիր նորից՝ ուշադիր կարդալով իմաստը:"}
              </p>
              <button 
                onClick={reset}
                className={`px-12 py-5 rounded-full font-black text-2xl uppercase tracking-widest text-white shadow-xl transition-all ${feedback === 'correct' ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/40' : 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/40'}`}
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
