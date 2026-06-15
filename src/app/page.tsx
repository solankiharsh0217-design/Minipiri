"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Menu, X, ArrowRight } from "lucide-react";

const validCodes: Record<string, string> = {
  'LIMEN369': 'Mario Sparacia',
  'AKIRA360': 'Salvo Landolina',
  'ANAEL369': 'Chiara Zanetti'
};

const operators = [
  { name: "Mario Sparacia", code: "LIMEN 369", color: "blue", img: "/gallery-1.jpg" },
  { name: "Salvo Landolina", code: "AKIRA 360", color: "green", img: "/hero-bg.jpg" },
  { name: "Chiara Zanetti", code: "ANAEL 369", color: "purple", img: "/gallery-2.jpg" }
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", code: "" });
  const [codeStatus, setCodeStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCodeChange = (val: string) => {
    const code = val.toUpperCase().replace(/\s/g, '');
    setFormData(prev => ({ ...prev, code }));

    if (validCodes[code]) {
      setCodeStatus({ type: 'success', message: `✓ Codice valido: Operatore ${validCodes[code]}` });
    } else if (code.length >= 8) {
      setCodeStatus({ type: 'error', message: "Codice non valido. Controlla e riprova." });
    } else {
      setCodeStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validCodes[formData.code]) {
      setCodeStatus({ type: 'error', message: "Codice non valido." });
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <main className="relative selection:bg-pink-200 selection:text-pink-900 bg-white">
      {/* PROFESSIONAL NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-4 md:py-6 flex justify-between items-center ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-2xl md:text-3xl font-black tracking-tighter uppercase italic transition-colors ${scrolled ? 'text-pink-950' : 'text-white'}`}
        >
          Minipiri
        </motion.div>

        <div className="hidden lg:flex items-center space-x-12">
          {['L\'Evento', 'Operatori', 'Location'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase().replace("l'", "")}`}
              whileHover={{ scale: 1.05 }}
              className={`text-[11px] font-bold tracking-[0.3em] uppercase transition-colors ${scrolled ? 'text-pink-950/70' : 'text-white/90'} hover:text-pink-600`}
            >
              {item}
            </motion.a>
          ))}
          <motion.a 
            href="#register" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 font-black text-[11px] uppercase tracking-widest rounded-full transition-all ${scrolled ? 'bg-pink-600 text-white shadow-pink-200/50' : 'bg-white text-pink-950'} shadow-xl`}
          >
            Iscriviti
          </motion.a>
        </div>

        <button onClick={() => setMobileMenuOpen(true)} className={`lg:hidden ${scrolled ? 'text-pink-950' : 'text-white'}`}>
          <Menu className="w-8 h-8" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-pink-950 z-[200] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-white text-2xl font-black italic uppercase">Minipiri</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white"><X className="w-10 h-10" /></button>
            </div>
            <div className="flex flex-col space-y-8">
              {['L\'Evento', 'Operatori', 'Location', 'Iscriviti'].map((item) => (
                <a 
                  key={item}
                  onClick={() => setMobileMenuOpen(false)}
                  href={`#${item.toLowerCase().replace("l'", "").replace("i", "r")}`}
                  className="text-5xl font-black text-white uppercase italic tracking-tighter"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="text-white/20 font-bold tracking-widest text-[10px]">© 2026 MINIPIRI</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ULTRA-IMPACT HERO */}
      <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image src="/hero-bg.jpg" alt="Hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-pink-950/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/20 to-pink-950/80"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <span className="text-white text-[12px] font-black tracking-[0.5em] uppercase bg-pink-600/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              27 — 29 Novembre 2026
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-6xl md:text-[11rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic mb-8 drop-shadow-2xl"
          >
            Evoluzione
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xl md:text-3xl text-white/80 font-medium uppercase tracking-[0.2em] mb-12"
          >
            PC Location <span className="text-white font-black italic">Minipiri</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <a href="#register" className="group bg-white text-pink-950 px-16 py-8 rounded-full text-2xl font-black transition-all hover:scale-110 active:scale-95 flex items-center space-x-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <span>PRENOTA IL TUO POSTO</span>
              <ArrowRight className="w-8 h-8 transition-transform group-hover:translate-x-2" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
        >
          <ChevronDown className="w-10 h-10" />
        </motion.div>
      </section>

      {/* THE EVENT SECTION */}
      <section id="evento" className="py-32 md:py-52 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <Image src="/gallery-1.jpg" alt="Experience" fill className="object-cover" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <span className="text-pink-600 font-black tracking-[0.4em] uppercase text-sm">L'Essenza del Viaggio</span>
              <h2 className="text-6xl md:text-8xl font-black text-pink-950 leading-[0.9] tracking-tighter uppercase italic">Oltre Ogni <br/>Confine.</h2>
              <p className="text-xl text-pink-950/60 leading-relaxed font-medium max-w-lg">
                Non è solo un evento, è una metamorfosi. Tre giorni per rompere gli schemi e ritrovare la tua forza originaria in una location esclusiva pensata per il tuo risveglio.
              </p>
              <ul className="space-y-4">
                {['Meditazione Profonda', 'Workshop Evolutivi', 'Connessione Autentica'].map((item) => (
                  <li key={item} className="flex items-center space-x-4 text-pink-950 font-bold text-lg">
                    <CheckCircle className="text-pink-600 w-6 h-6" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OPERATORS SECTION - CLEAN & PROFESSIONAL */}
      <section id="operatori" className="py-32 md:py-52 bg-pink-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-pink-950 uppercase italic leading-none">I Maestri</h2>
            <p className="mt-8 text-pink-950/40 font-bold tracking-[0.3em] uppercase">Le Tue Guide In Questo Viaggio</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {operators.map((op, i) => (
              <motion.div 
                key={op.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[3rem] p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-4"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-8">
                  <Image src={op.img} alt={op.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="space-y-2">
                  <span className={`text-[10px] font-black tracking-widest uppercase text-${op.color}-600`}>{op.code}</span>
                  <h3 className="text-3xl font-black text-pink-950 uppercase italic tracking-tighter">{op.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION SECTION - REPLACED LO SPAZIO */}
      <section id="location" className="py-32 md:py-52 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-pink-950 uppercase italic leading-none">La <br/>Location</h2>
            <p className="text-xl md:text-2xl text-pink-950/50 font-bold uppercase tracking-widest">PC Location Minipiri</p>
          </div>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative h-[60vh] md:h-[80vh] rounded-[4rem] overflow-hidden shadow-2xl"
          >
            <Image src="/gallery-2.jpg" alt="Location" fill className="object-cover" />
            <div className="absolute inset-0 bg-pink-950/10"></div>
          </motion.div>
        </div>
      </section>

      {/* REGISTRATION - HIGH CONVERSION */}
      <section id="register" className="py-32 md:py-52 bg-pink-950 relative overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full border-[100px] border-white/5 rounded-full opacity-50"
        />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 md:p-32 rounded-[4rem] shadow-2xl text-center"
          >
            {!isSubmitted ? (
              <>
                <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter text-pink-950 uppercase italic leading-none">Inizia Ora.</h2>
                
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid md:grid-cols-2 gap-10 text-left">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-[0.3em] opacity-30 uppercase ml-6">Nome Completo</label>
                      <input 
                        type="text" required placeholder="Inserisci il tuo nome"
                        value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-pink-50 px-10 py-8 rounded-full font-bold text-pink-950 outline-none ring-2 ring-transparent focus:ring-pink-600 transition-all" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-[0.3em] opacity-30 uppercase ml-6">E-mail</label>
                      <input 
                        type="email" required placeholder="latua@email.it"
                        value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-pink-50 px-10 py-8 rounded-full font-bold text-pink-950 outline-none ring-2 ring-transparent focus:ring-pink-600 transition-all" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-left">
                    <label className="text-[10px] font-black tracking-[0.3em] opacity-30 uppercase ml-6">Codice Operatore Riservato</label>
                    <input 
                      type="text" required placeholder="XXXXXX"
                      value={formData.code} onChange={(e) => handleCodeChange(e.target.value)}
                      className={`w-full bg-pink-50 px-10 py-10 rounded-full text-4xl md:text-6xl font-black text-center tracking-[0.3em] outline-none ring-4 transition-all ${
                        codeStatus.type === 'success' ? 'ring-green-400 text-green-700' : codeStatus.type === 'error' ? 'ring-red-400 text-red-700' : 'ring-pink-100'
                      }`} 
                    />
                    {codeStatus.message && (
                      <p className={`text-center font-black uppercase text-[12px] tracking-widest mt-6 ${codeStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                        {codeStatus.message}
                      </p>
                    )}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-pink-600 text-white py-10 rounded-full text-3xl font-black shadow-2xl shadow-pink-200/50 uppercase italic tracking-tighter"
                  >
                    Conferma Iscrizione
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 text-center"
              >
                <div className="w-40 h-40 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10">
                  <CheckCircle className="w-24 h-24" />
                </div>
                <h3 className="text-7xl font-black text-pink-950 italic mb-6 uppercase tracking-tighter leading-none">Benvenuto.</h3>
                <p className="text-2xl font-bold text-pink-950/40 uppercase tracking-widest">Ti Aspettiamo a Novembre.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-16 text-[10px] font-black tracking-[0.5em] text-pink-600 hover:underline uppercase">Iscrivi qualcun altro</button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="py-20 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-4xl font-black text-pink-950 italic uppercase tracking-tighter">Minipiri</div>
          <div className="flex justify-center space-x-12 text-[10px] font-black uppercase tracking-[0.4em] text-pink-950/40">
            <a href="#" className="hover:text-pink-600">Instagram</a>
            <a href="#" className="hover:text-pink-600">Facebook</a>
            <a href="#" className="hover:text-pink-600">Privacy</a>
          </div>
          <p className="text-[10px] font-bold text-pink-950/10 tracking-[0.5em] uppercase">© 2026 EVENTO EVOLUTIVO — TUTTI I DIRITTI RISERVATI</p>
        </div>
      </footer>
    </main>
  );
}
