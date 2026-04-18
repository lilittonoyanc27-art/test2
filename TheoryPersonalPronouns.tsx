import React from 'react';
import { motion } from 'motion/react';
import { User, Users, Info } from 'lucide-react';

const PRONOUNS = [
  { sp: 'Yo', arm: 'Ես', desc: 'Առաջին դեմք, եզակի թիվ' },
  { sp: 'Tú', arm: 'Դու', desc: 'Երկրորդ դեմք, եզակի թիվ (ընկերական)' },
  { sp: 'Él', arm: 'Նա (տղա)', desc: 'Երրորդ դեմք, արական սեռ' },
  { sp: 'Ella', arm: 'Նա (աղջիկ)', desc: 'Երրորդ դեմք, իգական սեռ' },
  { sp: 'Usted', arm: 'Դուք (քաղաքավարի)', desc: 'Երրորդ դեմք, եզակի թիվ (հարգալից)' },
  { sp: 'Nosotros', arm: 'Մենք (տղաներ)', desc: 'Առաջին դեմք, հոգնակի, արական' },
  { sp: 'Nosotras', arm: 'Մենք (աղջիկներ)', desc: 'Առաջին դեմք, հոգնակի, իգական' },
  { sp: 'Vosotros', arm: 'Դուք (ընկերական, տղաներ)', desc: 'Երկրորդ դեմք, հոգնակի, արական (Իսպանիա)' },
  { sp: 'Vosotras', arm: 'Դուք (ընկերական, աղջիկներ)', desc: 'Երկրորդ դեմք, հոգնակի, իգական (Իսպանիա)' },
  { sp: 'Ellos', arm: 'Նրանք (տղաներ)', desc: 'Երրորդ դեմք, հոգնակի, արական' },
  { sp: 'Ellas', arm: 'Նրանք (աղջիկներ)', desc: 'Երրորդ դեմք, հոգնակի, իգական' },
  { sp: 'Ustedes', arm: 'Դուք (հոգնակի)', desc: 'Երրորդ դեմք, հոգնակի (հարգալից կամ ընդհանուր)' },
];

export default function TheoryPersonalPronouns() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-white font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-sky-400">
            Անձնական <br/> <span className="text-white">Դերանուններ</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest italic">Pronombres Personales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRONOUNS.map((p, i) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={p.sp}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center gap-6 group hover:bg-white/10 transition-all shadow-xl"
            >
              <div className="p-4 bg-sky-500/20 rounded-2xl group-hover:bg-sky-500 transition-colors">
                {p.sp === 'Yo' || p.sp === 'Tú' || p.sp === 'Él' || p.sp === 'Ella' ? <User className="w-8 h-8 text-sky-400 group-hover:text-white" /> : <Users className="w-8 h-8 text-sky-400 group-hover:text-white" />}
              </div>
              <div>
                <h3 className="text-4xl font-black text-white">{p.sp}</h3>
                <p className="text-2xl font-bold text-sky-400">{p.arm}</p>
                <p className="text-sm text-slate-500 font-medium italic mt-1">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-8 bg-sky-500/10 border-2 border-dashed border-sky-400/30 rounded-[3rem] space-y-4">
          <div className="flex items-center gap-3 text-sky-400">
            <Info className="w-6 h-6" />
            <span className="text-xl font-black uppercase tracking-widest">Կարևոր է իմանալ</span>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            Իսպաներենում դերանունները հաճախ բաց են թողնվում, քանի որ բայի վերջավորությունն արդեն ցույց է տալիս, թե ով է կատարում գործողությունը: Օրինակ՝ <br/>
            <strong className="text-white">"Yo voy"</strong>-ի փոխարեն կարելի է ասել պարզապես <strong className="text-white">"Voy"</strong>:
          </p>
        </div>
      </motion.div>
    </div>
  );
}
