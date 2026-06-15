"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Menu, X, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const validCodes: Record<string, string> = {
  'LIMEN369': 'Mario Sparacia',
  'AKIRA360': 'Salvo Landolina',
  'ANAEL369': 'Chiara Zanetti'
};

const operators = [
  { name: "Mario Sparacia", code: "LIMEN 369", color: "blue", img: "/gallery-1.jpg" },
  { name: "Salvo Landolina", code: "AKIRA 360", color: "green", img: "/hero-bg.jpg" },
  { name: "Chiara Zanetti", code: "ANAEL 369", color: "purple", img: "/gallery-2.png" }
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", code: "" });
  const [codeStatus, setCodeStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Navigation Scroll State
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // 3. GSAP Parallax Effect for Hero
    gsap.to(parallaxRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 200,
      scale: 1.1
    });

    // 4. GSAP Stagger Reveal for Sections
    gsap.utils.toArray(".reveal-text").forEach((text: any) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
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
      {/* HIGH-END NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 md:px-12 py-4 md:py-6 flex justify-between items-center ${scrolled ? 'bg-white/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)]' : 'bg-transparent'}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-2xl md:text-4xl font-black tracking-tighter uppercase italic transition-colors duration-500 ${scrolled ? 'text-pink-950' : 'text-white'}`}
        >
          Alchimisti
        </motion.div>

        <div className="hidden lg:flex items-center space-x-12">
          {['L\'Evento', 'Operatori', 'Location'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase().replace("l'", "")}`}
              whileHover={{ scale: 1.1, color: "#DB2777" }}
              className={`text-[12px] font-black tracking-[0.4em] uppercase transition-all ${scrolled ? 'text-pink-950/70' : 'text-white/90'}`}
            >
              {item}
            </motion.a>
          ))}
          <motion.a 
            href="#register" 
            whileHover={{ scale: 1.05, backgroundColor: "#9D174D" }}
            whileTap={{ scale: 0.95 }}
            className={`px-10 py-4 font-black text-[12px] uppercase tracking-widest rounded-full transition-all ${scrolled ? 'bg-pink-600 text-white' : 'bg-white text-pink-950'} shadow-2xl`}
          >
            Iscriviti Ora
          </motion.a>
        </div>

        <button onClick={() => setMobileMenuOpen(true)} className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-pink-950 bg-pink-50' : 'text-white bg-white/10'}`}>
          <Menu className="w-8 h-8" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="fixed inset-0 bg-pink-950/98 backdrop-blur-3xl z-[200] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-white text-3xl font-black italic uppercase tracking-tighter">Alchimisti</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2 bg-white/10 rounded-full"><X className="w-10 h-10" /></button>
            </div>
            <div className="flex flex-col space-y-6">
              {['L\'Evento', 'Operatori', 'Location', 'Iscriviti'].map((item) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  href={`#${item.toLowerCase().replace("l'", "").replace("i", "r")}`}
                  className="text-6xl font-black text-white uppercase italic tracking-tighter hover:text-pink-400 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="text-white/20 font-black tracking-[0.5em] text-[10px] uppercase">PC Location Alchimisti — 2026</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GSAP PARALLAX HERO */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0 z-0">
          <Image src="/hero-bg.jpg" alt="Hero" fill className="object-cover scale-110" priority />
          <div className="absolute inset-0 bg-pink-950/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pink-950/90"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <span className="text-white text-[12px] font-black tracking-[0.6em] uppercase bg-pink-600 px-8 py-3 rounded-full shadow-2xl">
              27 — 29 Novembre 2026
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
            className="text-7xl md:text-[13rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic mb-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            Evoluzione
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-2xl md:text-4xl text-white/70 font-bold uppercase tracking-[0.3em] mb-16"
          >
            PC Location <span className="text-white font-black italic">Alchimisti</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <a href="#register" className="group inline-flex items-center space-x-6 bg-white text-pink-950 px-16 py-8 rounded-full text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <span>SCOPRI IL TUO POTERE</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight className="w-8 h-8" />
              </motion.div>
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown className="w-12 h-12" />
        </motion.div>
      </section>

      {/* GSAP REVEAL SECTION */}
      <section id="evento" className="py-40 md:py-64 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="relative aspect-square rounded-[5rem] overflow-hidden shadow-2xl reveal-text">
              <Image src="/gallery-1.jpg" alt="Experience" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 to-transparent"></div>
            </div>
            <div className="space-y-12 reveal-text">
              <span className="text-pink-600 font-black tracking-[0.5em] uppercase text-xs">Un'Esperienza Unica</span>
              <h2 className="text-7xl md:text-9xl font-black text-pink-950 leading-[0.8] tracking-tighter uppercase italic">Oltre Ogni <br/>Confine.</h2>
              <p className="text-2xl text-pink-950/60 leading-relaxed font-bold">
                Non è solo un weekend. È il punto di svolta. Tre giorni immersi nella natura e nel lusso, guidati da chi ha già percorso la strada.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                {['Meditazione', 'Metamorfosi', 'Risveglio', 'Connessione'].map((item) => (
                  <div key={item} className="flex items-center space-x-4">
                    <CheckCircle className="text-pink-600 w-8 h-8" />
                    <span className="text-pink-950 font-black uppercase text-sm tracking-widest">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATORS - PROFESSIONAL PORTRAIT GALLERY */}
      <section id="operatori" className="py-40 md:py-64 bg-pink-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32 reveal-text">
            <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter text-pink-950 uppercase italic leading-none">I Maestri</h2>
            <p className="mt-10 text-pink-950/30 font-black tracking-[0.5em] uppercase text-sm">Le Eccellenze Del Benessere</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-20">
            {operators.map((op, i) => (
              <motion.div 
                key={op.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[4rem] mb-10 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-4">
                  <Image src={op.img} alt={op.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-950/90 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-12 left-12 right-12">
                    <span className={`text-[11px] font-black tracking-[0.4em] uppercase text-white/50 mb-3 block`}>{op.code}</span>
                    <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{op.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION - IMPACTFUL VISUAL */}
      <section id="location" className="py-40 md:py-64 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10 reveal-text">
            <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter text-pink-950 uppercase italic leading-none">La <br/>Dimora.</h2>
            <div className="text-right">
               <p className="text-2xl text-pink-600 font-black uppercase tracking-[0.3em] mb-4">PC Location Alchimisti</p>
               <div className="w-20 h-1 bg-pink-200 ml-auto"></div>
            </div>
          </div>
          <div className="relative h-[60vh] md:h-[90vh] rounded-[5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] reveal-text">
            <Image src="/gallery-2.png" alt="Location" fill className="object-cover transition-transform duration-[5s] hover:scale-110" />
            <div className="absolute inset-0 bg-pink-950/10 mix-blend-multiply"></div>
          </div>
        </div>
      </section>

      {/* REGISTRATION - HIGH PRESTIGE */}
      <section id="register" className="py-40 md:py-64 bg-pink-950 relative overflow-hidden">
        {/* Animated Background Circles */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square border-[1px] border-white/5 rounded-full"
        />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-20 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)]"
          >
            {!isSubmitted ? (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-pink-950 uppercase italic leading-none">Unisciti <br/>A Noi.</h2>
                  <p className="text-pink-900/30 font-black tracking-[0.5em] uppercase text-[10px]">Richiesta Di Iscrizione Riservata</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-[0.3em] opacity-30 uppercase ml-6">Nome Completo</label>
                      <input 
                        type="text" required placeholder="Il tuo nome"
                        value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-pink-50/50 px-8 py-6 rounded-full font-bold text-lg text-pink-950 outline-none ring-2 ring-transparent focus:ring-pink-600 transition-all placeholder:opacity-20" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-[0.3em] opacity-30 uppercase ml-6">E-mail</label>
                      <input 
                        type="email" required placeholder="latua@email.it"
                        value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-pink-50/50 px-8 py-6 rounded-full font-bold text-lg text-pink-950 outline-none ring-2 ring-transparent focus:ring-pink-600 transition-all placeholder:opacity-20" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-center">
                    <label className="text-[10px] font-black tracking-[0.3em] opacity-30 uppercase">Codice Invito</label>
                    <input 
                      type="text" required placeholder="••••••"
                      value={formData.code} onChange={(e) => handleCodeChange(e.target.value)}
                      className={`w-full bg-pink-50 px-8 py-8 rounded-full text-4xl md:text-6xl font-black text-center tracking-[0.3em] outline-none ring-4 transition-all ${
                        codeStatus.type === 'success' ? 'ring-green-400 text-green-700' : codeStatus.type === 'error' ? 'ring-red-400 text-red-700' : 'ring-pink-100'
                      }`} 
                    />
                    {codeStatus.message && (
                      <p className={`text-center font-black uppercase text-[11px] tracking-widest mt-6 ${codeStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                        {codeStatus.message}
                      </p>
                    )}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "#9D174D" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-pink-600 text-white py-8 rounded-full text-2xl font-black shadow-xl shadow-pink-200/50 uppercase italic tracking-tighter"
                  >
                    Conferma
                  </motion.button>
                </form>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-24 text-center"
              >
                <div className="w-48 h-48 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-12 shadow-inner">
                  <CheckCircle className="w-24 h-24" />
                </div>
                <h3 className="text-8xl font-black text-pink-950 italic mb-10 uppercase tracking-tighter leading-none">Ti Aspettiamo.</h3>
                <p className="text-3xl font-black text-pink-950/20 uppercase tracking-[0.5em]">Controlla La Tua Mail.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-20 text-[11px] font-black tracking-[0.8em] text-pink-600 hover:underline uppercase">Torna Indietro</button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="py-32 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-5xl font-black text-pink-950 italic uppercase tracking-tighter">Alchimisti</div>
          <div className="w-20 h-[1px] bg-pink-100 mx-auto"></div>
          <div className="flex justify-center space-x-20 text-[11px] font-black uppercase tracking-[0.5em] text-pink-950/30">
            <a href="#" className="hover:text-pink-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Facebook</a>
            <a href="#" className="hover:text-pink-600 transition-colors">WhatsApp</a>
          </div>
          <p className="text-[10px] font-black text-pink-950/10 tracking-[1em] uppercase">© 2026 EVENTO EVOLUTIVO — TUTTI I DIRITTI RISERVATI</p>
        </div>
      </footer>
    </main>
  );
}
