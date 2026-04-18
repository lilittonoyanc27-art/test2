import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, CheckCircle2, XCircle, Trophy, RefreshCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Sentence {
  id: number;
  correct: string[];
  translation: string;
}

const ADVANCED_SENTENCES: Sentence[] = [
  { id: 1, correct: ['Ustedes', 'vienen', 'de', 'la', 'tienda'], translation: 'Դուք (հոգնակի) գալիս եք խանութից:' },
  { id: 2, correct: ['¿Usted', 'va', 'al', 'trabajo?'], translation: 'Դուք (հարգալից) գնո՞ւմ եք աշխատանքի:' },
  { id: 3, correct: ['Nosotros', 'venimos', 'de', 'Madrid'], translation: 'Մենք գալիս ենք Մադրիդից:' },
  { id: 4, correct: ['Ellas', 'van', 'a', 'estudiar'], translation: 'Նրանք (աղջիկները) գնում են սովորելու:' },
  { id: 5, correct: ['Yo', 'vengo', 'de', 'la', 'clase'], translation: 'Ես գալիս եմ դասից:' },
  { id: 6, correct: ['Vosotras', 'venís', 'de', 'España'], translation: 'Դուք (աղջիկներ) գալիս եք Իսպանիայից:' },
];

export default function SentenceBuilderGame2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentIndex < ADVANCED_SENTENCES.length) {
      const words = [...ADVANCED_SENTENCES[currentIndex].correct];
      setShuffledWords(words.sort(() => Math.random() - 0.5));
      setSelectedWords([]);
      setFeedback(null);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
    }
  }, [currentIndex]);

  const handleWordClick = (word: string, index: number) => {
    if (feedback === 'correct') return;
    const newSelected = [...selectedWords, word];
    setSelectedWords(newSelected);
    const newShuffled = [...shuffledWords];
    newShuffled.splice(index, 1);
    setShuffledWords(newShuffled);

    if (newSelected.length === ADVANCED_SENTENCES[currentIndex].correct.length) {
      const isCorrect = newSelected.join(' ') === ADVANCED_SENTENCES[currentIndex].correct.join(' ');
      setFeedback(isCorrect ? 'correct' : 'wrong');
    }
  };

  const resetCurrent = () => {
    const words = [...ADVANCED_SENTENCES[currentIndex].correct];
    setShuffledWords(words.sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setFeedback(null);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center space-y-8">
          <Trophy className="w-48 h-48 text-yellow-400 mx-auto animate-bounce" />
          <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter shadow-xl">Գերազանց է!</h2>
          <p className="text-2xl text-slate-400 font-bold uppercase">Դուք անցաք բոլոր բարդ նախադասությունները</p>
          <button onClick={() => { setCurrentIndex(0); setIsFinished(false); }} className="px-12 py-6 bg-amber-500 rounded-full font-black text-2xl uppercase tracking-widest text-white shadow-2xl">Կրկնել</button>
        </div>
      </div>
    );
  }

  const current = ADVANCED_SENTENCES[currentIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-amber-500">Բարդ <span className="text-white">Նախադասություններ</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm italic">Օգտագործիր հարգալից դիմելաձևերը</p>
        </div>

        <div className="bg-slate-900/50 border border-white/10 p-10 rounded-[4rem] text-center shadow-2xl">
           <p className="text-sm font-black uppercase tracking-[0.5em] text-amber-500 mb-4">Թարգմանություն</p>
           <p className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight underline decoration-amber-500/30">{current.translation}</p>
        </div>

        <div className="min-h-[180px] p-8 bg-white/5 border-4 border-dashed border-white/10 rounded-[5rem] flex flex-wrap gap-4 justify-center items-center backdrop-blur-3xl shadow-inner">
          <AnimatePresence>
            {selectedWords.map((word, i) => (
              <motion.div key={`${word}-${i}`} initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }} className="px-8 py-5 bg-amber-600 rounded-[2rem] font-black text-2xl md:text-4xl shadow-xl border-b-8 border-amber-800">
                {word}
              </motion.div>
            ))}
          </AnimatePresence>
          {selectedWords.length === 0 && <p className="text-slate-600 font-black italic uppercase tracking-widest text-xl opacity-30">Սկսիր հավաքել...</p>}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
            {shuffledWords.map((word, i) => (
              <motion.button key={`${word}-${i}`} layout whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleWordClick(word, i)} className="px-8 py-5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-[2rem] font-black text-2xl md:text-4xl transition-all shadow-xl">
                {word}
              </motion.button>
            ))}
        </div>

        <AnimatePresence>
           {feedback && (
             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className={`p-10 rounded-[4rem] border-4 flex flex-col items-center gap-6 text-center ${feedback === 'correct' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                <div className="flex items-center gap-4 text-3xl font-black uppercase italic">
                   {feedback === 'correct' ? <CheckCircle2 className="w-10 h-10 text-emerald-500" /> : <XCircle className="w-10 h-10 text-rose-500" />}
                   {feedback === 'correct' ? "ՀԻԱՆԱԼԻ Է!" : "ՓՈՐՁԻՐ ՆՈՐԻՑ"}
                </div>
                <button onClick={feedback === 'correct' ? () => setCurrentIndex(i => i + 1) : resetCurrent} className={`px-12 py-5 rounded-full font-black text-2xl uppercase tracking-widest text-white shadow-xl ${feedback === 'correct' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                   {feedback === 'correct' ? "ՇԱՐՈՒՆԱԿԵԼ" : "ՄԱՔՐԵԼ"} <ArrowRight className="inline-block ml-2" />
                </button>
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    </div>
  );
}
