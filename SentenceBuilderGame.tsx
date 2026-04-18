import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCcw, CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Sentence {
  id: number;
  correct: string[];
  translation: string;
}

const SENTENCES: Sentence[] = [
  { id: 1, correct: ['Yo', 'voy', 'al', 'cine'], translation: 'Ես կինո եմ գնում:' },
  { id: 2, correct: ['Ella', 'viene', 'de', 'clase'], translation: 'Նա գալիս է դասից:' },
  { id: 3, correct: ['Nosotros', 'vamos', 'a', 'la', 'tienda'], translation: 'Մենք խանութ ենք գնում:' },
  { id: 4, correct: ['Tú', 'vienes', 'conmigo'], translation: 'Դու գալիս ես ինձ հետ:' },
  { id: 5, correct: ['Ellos', 'van', 'al', 'estadio'], translation: 'Նրանք գնում են մարզադաշտ:' },
  { id: 6, correct: ['Nosotras', 'vamos', 'a', 'bailar'], translation: 'Մենք (աղջիկներ) գնում ենք պարելու:' },
];

export default function SentenceBuilderGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentIndex < SENTENCES.length) {
      const words = [...SENTENCES[currentIndex].correct];
      setShuffledWords(words.sort(() => Math.random() - 0.5));
      setSelectedWords([]);
      setFeedback(null);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [currentIndex]);

  const handleWordClick = (word: string, index: number) => {
    if (feedback === 'correct') return;
    
    const newSelected = [...selectedWords, word];
    setSelectedWords(newSelected);
    
    // Remove one instance of the word from shuffledWords
    const newShuffled = [...shuffledWords];
    newShuffled.splice(index, 1);
    setShuffledWords(newShuffled);

    // Check if the sentence is complete
    if (newSelected.length === SENTENCES[currentIndex].correct.length) {
      const isCorrect = newSelected.join(' ') === SENTENCES[currentIndex].correct.join(' ');
      setFeedback(isCorrect ? 'correct' : 'wrong');
    }
  };

  const resetCurrent = () => {
    const words = [...SENTENCES[currentIndex].correct];
    setShuffledWords(words.sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setFeedback(null);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center space-y-8">
          <Trophy className="w-40 h-40 text-yellow-400 mx-auto animate-bounce" />
          <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">Գերազանց է!</h2>
          <p className="text-2xl text-slate-400 font-bold uppercase">Դուք կառուցեցիք բոլոր նախադասությունները</p>
          <button 
            onClick={() => { setCurrentIndex(0); setIsFinished(false); }}
            className="px-12 py-6 bg-sky-500 rounded-full font-black text-2xl uppercase tracking-widest text-white hover:bg-sky-400 transition-all"
          >
            Նորից սկսել
          </button>
        </motion.div>
      </div>
    );
  }

  const current = SENTENCES[currentIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Կառուցիր <span className="text-sky-400">Նախադասությունը</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Դասավորիր բառերը ճիշտ հերթականությամբ</p>
        </div>

        {/* Translation Hub */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] text-center shadow-xl">
           <p className="text-sm font-black uppercase tracking-[0.5em] text-sky-400 mb-2">Թարգմանություն</p>
           <p className="text-3xl md:text-5xl font-black italic tracking-tighter">{current.translation}</p>
        </div>

        {/* Construction Zone */}
        <div className="min-h-[160px] p-8 bg-white/5 border-4 border-dashed border-white/10 rounded-[4rem] flex flex-wrap gap-4 justify-center items-center transition-colors">
          <AnimatePresence>
            {selectedWords.map((word, i) => (
              <motion.div
                key={`${word}-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="px-8 py-4 bg-sky-500 rounded-[1.5rem] font-black text-2xl md:text-4xl shadow-lg relative"
              >
                {word}
              </motion.div>
            ))}
          </AnimatePresence>
          {selectedWords.length === 0 && (
            <p className="text-slate-600 font-black italic uppercase tracking-widest">Ընտրեք բառերը</p>
          )}
        </div>

        {/* Word Pool */}
        <div className="flex flex-wrap gap-4 justify-center">
          <AnimatePresence>
            {shuffledWords.map((word, i) => (
              <motion.button
                layout
                key={`${word}-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => handleWordClick(word, i)}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-[1.5rem] font-black text-2xl md:text-4xl transition-all shadow-xl active:scale-95"
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Feedback & Actions */}
        <div className="flex flex-col items-center gap-8">
           <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-8 rounded-[3rem] border-4 flex flex-col items-center gap-4 text-center ${feedback === 'correct' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}
                >
                  <div className="flex items-center gap-4 text-3xl font-black uppercase italic">
                    {feedback === 'correct' ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                    {feedback === 'correct' ? "ՃԻՇՏ Է!" : "ՍԽԱԼ Է, ՓՈՐՁԻՐ ՆՈՐԻՑ"}
                  </div>
                  {feedback === 'correct' && (
                    <button 
                      onClick={() => setCurrentIndex(i => i + 1)}
                      className="px-10 py-4 bg-emerald-500 text-white rounded-full font-black text-xl uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-400"
                    >
                      Հաջորդը <ArrowRight />
                    </button>
                  )}
                  {feedback === 'wrong' && (
                     <button 
                        onClick={resetCurrent}
                        className="px-10 py-4 bg-rose-500 text-white rounded-full font-black text-xl uppercase tracking-widest flex items-center gap-2 hover:bg-rose-400"
                     >
                        Նորից <RefreshCcw />
                     </button>
                  )}
                </motion.div>
              )}
           </AnimatePresence>

           {!feedback && selectedWords.length > 0 && (
              <button 
                onClick={resetCurrent}
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-black uppercase tracking-widest italic"
              >
                <RefreshCcw className="w-5 h-5" /> Մաքրել
              </button>
           )}
        </div>
      </div>
    </div>
  );
}
