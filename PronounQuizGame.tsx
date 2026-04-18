import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, CheckCircle2, XCircle, Trophy, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  sentence: string;
  translation: string;
  options: string[];
  correct: string;
  explanation: string;
}

const QUESTIONS: Question[] = [
  { id: 1, sentence: "____ eres mi amigo.", translation: "Դու իմ ընկերն ես:", options: ["Yo", "Tú", "Él"], correct: "Tú", explanation: "Երկրորդ դեմք (Դու) = Tú" },
  { id: 2, sentence: "____ somos estudiantes.", translation: "Մենք ուսանողներ ենք:", options: ["Ellos", "Nosotros", "Ustedes"], correct: "Nosotros", explanation: "Առաջին դեմք հոգնակի (Մենք) = Nosotros" },
  { id: 3, sentence: "____ es María.", translation: "Նա Մարիան է:", options: ["Ella", "Él", "Yo"], correct: "Ella", explanation: "Իգական սեռ (Նա) = Ella" },
  { id: 4, sentence: "____ es el profesor.", translation: "Դուք (հարգալից) պրոֆեսորն եք:", options: ["Tú", "Usted", "Ellos"], correct: "Usted", explanation: "Հարգալից դիմելաձև (Դուք) = Usted" },
  { id: 5, sentence: "____ son mis hermanos.", translation: "Նրանք իմ եղբայրներն են:", options: ["Ellos", "Nosotros", "Vosotros"], correct: "Ellos", explanation: "Հոգնակի թիվ (Նրանք) = Ellos" },
  { id: 6, sentence: "____ somos amigas.", translation: "Մենք ընկերուհիներ ենք:", options: ["Nosotras", "Nosotros", "Ellas"], correct: "Nosotras", explanation: "Աղջիկների խումբ (Մենք) = Nosotras" },
  { id: 7, sentence: "____ sois muy amables.", translation: "Դուք (աղջիկներ) շատ բարի եք:", options: ["Vosotras", "Vosotros", "Ellas"], correct: "Vosotras", explanation: "Աղջիկների խումբ (Դուք) = Vosotras" },
];

export default function PronounQuizGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (opt: string) => {
    if (selected === QUESTIONS[current].correct) return;
    setSelected(opt);
    const isCorrect = opt === QUESTIONS[current].correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 < QUESTIONS.length) {
      setCurrent(c => c + 1);
      setSelected(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
        <div className="text-center space-y-8">
          <Trophy className="w-40 h-40 text-yellow-400 mx-auto animate-bounce" />
          <h2 className="text-6xl font-black uppercase tracking-tighter italic">Վիկտորինայի Ավարտ!</h2>
          <p className="text-3xl font-bold">Միավորներ: {score} / {QUESTIONS.length}</p>
          <button onClick={() => window.location.reload()} className="px-12 py-6 bg-sky-500 rounded-full font-black text-2xl uppercase tracking-widest">Նորից սկսել</button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[current];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-orange-400">Դերանունների <span className="text-white">Վիկտորինա</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Ընտրիր ճիշտ դերանունը</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden">
           <div className="flex justify-between items-center mb-4">
              <span className="text-sky-400 font-black tracking-widest uppercase">Հարց {current + 1}/{QUESTIONS.length}</span>
           </div>
           
           <div className="space-y-6">
              <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter text-center">{q.sentence}</h3>
              <div className="bg-white/10 p-6 rounded-[2rem] text-center border border-white/10">
                 <p className="text-2xl md:text-4xl font-bold italic text-slate-300">{q.translation}</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={`p-6 md:p-8 rounded-[2rem] font-black text-2xl md:text-4xl uppercase tracking-tighter transition-all ${
                    selected === opt 
                      ? opt === q.correct ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                      : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
           </div>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[3rem] border-4 text-center space-y-4 ${feedback === 'correct' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
               <div className="flex items-center justify-center gap-4 text-2xl font-black uppercase tracking-widest italic">
                  {feedback === 'correct' ? <CheckCircle2 /> : <XCircle />}
                  {feedback === 'correct' ? "ՃԻՇՏ Է!" : "ՍԽԱԼ Է"}
               </div>
               <p className="text-lg font-bold text-white">{q.explanation}</p>
               {feedback === 'correct' && (
                 <button onClick={next} className="mt-4 px-10 py-4 bg-white/10 rounded-full font-black uppercase tracking-widest hover:bg-white/20 border border-white/20">
                    Հաջորդը <ArrowRight className="inline" />
                 </button>
               )}
               {feedback === 'wrong' && (
                 <p className="text-sm font-bold opacity-70">Փորձիր ընտրել մեկ այլ տարբերակ:</p>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
