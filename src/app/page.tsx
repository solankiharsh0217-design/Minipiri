"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Menu, X, ArrowRight, Star } from "lucide-react";
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
  { 
    name: "Chiara Zanetti", 
    code: "ANAEL 369", 
    color: "purple", 
    img: "/gallery-1.jpg",
    desc: "Armonia e luce. Chiara incarna la perfetta integrazione tra rigore professionale, lavoro sull'energia sottile e un accompagnamento trasformativo dolce ma potente verso la nuova consapevolezza."
  },
  { 
    name: "Mario Sparacia", 
    code: "LIMEN 369", 
    color: "blue", 
    img: "/hero-bg.jpg",
    desc: "Una presenza autorevole ed empatica. Mario offre una guida profonda e centrata, creando uno spazio di assoluta sicurezza dove poter esplorare le memorie dell'anima con fiducia e saggezza."
  },
  { 
    name: "Salvo Landolina", 
    code: "AKIRA 360", 
    color: "green", 
    img: "/gallery-2.png",
    desc: "Il custode del radicamento. Attraverso la sua forte connessione spirituale e una profonda sensibilità olistica, Salvo ti aiuterà ad ancorare l'energia e a ritrovare il contatto con l'essenza terrestre."
  }
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", code: "", discount: "" });
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
    <main className="relative selection:bg-pink-200 selection:text-pink-900 bg-white overflow-hidden">
      {/* HIGH-END NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 md:px-12 py-4 md:py-6 flex justify-between items-center ${scrolled ? 'bg-white/95 backdrop-blur-2xl shadow-lg border-b border-pink-50' : 'bg-transparent'}`}>
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-2xl md:text-3xl font-black tracking-tighter uppercase italic transition-all duration-500 ${scrolled ? 'text-pink-950' : 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]'}`}
        >
          Alchimisti
        </motion.a>

        <div className="hidden lg:flex items-center space-x-10">
          {['Il Percorso', 'Agenda', 'I Maestri', 'Location'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase().replace(" ", "").replace("l'", "")}`}
              whileHover={{ scale: 1.1, color: "#DB2777" }}
              className={`text-[12px] font-black tracking-[0.4em] uppercase transition-all duration-500 ${scrolled ? 'text-pink-950/80' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]'}`}
            >
              {item}
            </motion.a>
          ))}
          <motion.a 
            href="#register" 
            whileHover={{ scale: 1.05, backgroundColor: "#9D174D" }}
            whileTap={{ scale: 0.95 }}
            className={`px-10 py-4 font-black text-[12px] uppercase tracking-widest rounded-full transition-all duration-500 ${scrolled ? 'bg-pink-950 text-white shadow-xl' : 'bg-white text-pink-950 shadow-2xl'}`}
          >
            Iscriviti
          </motion.a>
        </div>

        <button onClick={() => setMobileMenuOpen(true)} className={`lg:hidden p-2 rounded-full transition-all duration-500 ${scrolled ? 'text-pink-950 bg-pink-50' : 'text-white bg-black/20 backdrop-blur-md shadow-lg'}`}>
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
              {['Il Percorso', 'Agenda', 'I Maestri', 'Location', 'Iscriviti'].map((item) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  href={`#${item.toLowerCase().replace(" ", "").replace("l'", "").replace("i", "r")}`}
                  className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter hover:text-pink-400 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="text-white/20 font-black tracking-[0.5em] text-[10px] uppercase">PC Location Minipiri — 2026</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GSAP PARALLAX HERO */}
      <section ref={heroRef} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0 z-0">
          <Image src="/hero-bg.jpg" alt="Hero" fill className="object-cover scale-110" priority />
          <div className="absolute inset-0 bg-pink-950/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pink-950/90"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 flex flex-col items-center gap-4"
          >
            <span className="text-white text-[10px] md:text-[12px] font-black tracking-[0.6em] uppercase bg-pink-600 px-6 py-2 md:px-8 md:py-3 rounded-full shadow-2xl">
              27 — 29 Novembre 2026
            </span>
            <span className="text-white/80 text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase">
              IPNOSI REGRESSIVA ALCHEMICA BASE
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
            className="text-6xl md:text-[11rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic mb-8 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            Evoluzione
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-2xl text-white/80 font-medium leading-relaxed max-w-3xl mx-auto mb-12 px-4"
          >
            Un viaggio dell'anima strutturato per risvegliare il tuo potenziale, arricchendoti sia professionalmente come operatore, sia nel tuo intimo percorso di crescita personale.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-xl md:text-3xl text-white/70 font-bold uppercase tracking-[0.3em] mb-12"
          >
            PC Location <span className="text-white font-black italic">Minipiri</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <a href="#register" className="group inline-flex items-center space-x-6 bg-white text-pink-950 px-12 md:px-16 py-6 md:py-8 rounded-full text-lg md:text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <span>PRENOTA IL TUO POSTO</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown className="w-10 h-10 md:w-12 md:h-12" />
        </motion.div>
      </section>

      {/* IL PERCORSO SECTION */}
      <section id="ilpercorso" className="py-32 md:py-52 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="relative aspect-square rounded-[4rem] md:rounded-[5rem] overflow-hidden shadow-2xl reveal-text">
              <Image src="/gallery-1.jpg" alt="Il Percorso" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 to-transparent"></div>
            </div>
            <div className="space-y-8 md:space-y-12 reveal-text">
              <span className="text-pink-600 font-black tracking-[0.5em] uppercase text-xs">Spazio Sacro</span>
              <h2 className="text-6xl md:text-8xl font-black text-pink-950 leading-[0.8] tracking-tighter uppercase italic">Il <br/>Percorso.</h2>
              <p className="text-xl md:text-2xl text-pink-950/70 leading-relaxed font-medium">
                Benvenuto in uno spazio sacro di esplorazione e guarigione. L'Ipnosi Regressiva Alchemica non è solo una tecnica, ma un'arte spirituale che unisce la profondità dell'inconscio alla luce della pura consapevolezza.
              </p>
              <p className="text-lg text-pink-950/60 leading-relaxed">
                Durante questo evento di tre giorni, sarai guidato attraverso dimensioni interiori inesplorate, imparando a trasmutare le antiche memorie in oro spirituale. Un'occasione irrinunciabile per elevare la propria vibrazione e acquisire strumenti concreti per accompagnare gli altri nel loro risveglio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET & VANTAGGI - GRID SECTION */}
      <section className="py-32 md:py-40 bg-pink-50/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div className="reveal-text bg-white p-12 md:p-16 rounded-[4rem] shadow-xl">
            <h3 className="text-4xl md:text-5xl font-black text-pink-950 uppercase italic tracking-tighter mb-10">A Chi È Rivolto</h3>
            <ul className="space-y-6">
              {[
                "Operatori olistici e del benessere in cerca di nuovi strumenti.",
                "Terapeuti che desiderano integrare un approccio spirituale.",
                "Ricercatori spirituali pronti a esplorare i misteri dell'anima.",
                "Chiunque senta la profonda chiamata alla propria trasformazione personale.",
                "Arricchimento del proprio bagaglio professionale con competenze esclusive."
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-4">
                  <Star className="text-pink-600 w-6 h-6 flex-shrink-0 mt-1 fill-pink-600/20" />
                  <span className="text-pink-950/80 font-bold text-lg leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="reveal-text bg-pink-950 text-white p-12 md:p-16 rounded-[4rem] shadow-2xl">
            <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-10">I Vantaggi</h3>
            <ul className="space-y-8">
              {[
                "Profonda connessione con il proprio Sé Superiore e la propria intuizione.",
                "Liberazione da blocchi energetici e schemi ripetitivi.",
                "Espansione della coscienza in un ambiente protetto e amorevole."
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-4">
                  <CheckCircle className="text-pink-400 w-6 h-6 flex-shrink-0 mt-1" />
                  <span className="text-white/90 font-bold text-xl leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* AGENDA SECTION */}
      <section id="agenda" className="py-32 md:py-52 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 md:mb-32 reveal-text">
            <span className="text-pink-600 font-black tracking-[0.5em] uppercase text-xs mb-4 block">Il Programma</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-pink-950 uppercase italic leading-none">Agenda Dei 3 Giorni</h2>
          </div>

          <div className="space-y-16 md:space-y-24 max-w-4xl mx-auto">
            {[
              {
                day: "27 Nov",
                title: "Radicamento e Fondamenta",
                desc: "Introduzione all'alchimia interiore, preparazione energetica, principi base dell'induzione ipnotica e radicamento dell'operatore."
              },
              {
                day: "28 Nov",
                title: "Il Viaggio e la Trasmutazione",
                desc: "Tecniche di esplorazione profonda, accesso alle memorie, scioglimento dei nodi energetici e pratiche di regressione guidata."
              },
              {
                day: "29 Nov",
                title: "Integrazione e Rinascita",
                desc: "Risveglio spirituale, rielaborazione dell'esperienza, etica dell'accompagnamento e chiusura del cerchio alchemico."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12 reveal-text border-b border-pink-100 pb-16 last:border-0">
                <div className="md:w-1/3">
                  <div className="inline-block bg-pink-50 text-pink-600 font-black text-2xl px-6 py-3 rounded-2xl tracking-widest uppercase">
                    {item.day}
                  </div>
                </div>
                <div className="md:w-2/3 space-y-4">
                  <h3 className="text-3xl md:text-4xl font-black text-pink-950 uppercase tracking-tighter italic">{item.title}</h3>
                  <p className="text-lg text-pink-950/60 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATORS - PROFESSIONAL PORTRAIT GALLERY */}
      <section id="imaestri" className="py-32 md:py-52 bg-pink-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 md:mb-32 reveal-text">
            <span className="text-pink-600 font-black tracking-[0.5em] uppercase text-xs mb-4 block">I Tuoi Facilitatori</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-pink-950 uppercase italic leading-none">I Maestri</h2>
            <p className="mt-8 text-pink-950/50 font-bold max-w-2xl mx-auto">Verrai accompagnato da professionisti esperti, che uniranno le loro competenze per garantirti un'esperienza completa e trasformativa.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {operators.map((op, i) => (
              <motion.div 
                key={op.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[3rem] p-8 shadow-xl flex flex-col items-center text-center hover:-translate-y-4 transition-transform duration-500"
              >
                <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full mb-8 shadow-inner border-4 border-pink-50">
                  <Image src={op.img} alt={op.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="space-y-4">
                  <span className={`text-[10px] font-black tracking-[0.4em] uppercase text-pink-600`}>{op.code}</span>
                  <h3 className="text-3xl font-black text-pink-950 uppercase italic tracking-tighter">{op.name}</h3>
                  <p className="text-sm text-pink-950/60 leading-relaxed font-medium">{op.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION - IMPACTFUL VISUAL */}
      <section id="location" className="py-32 md:py-52 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8 reveal-text">
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-pink-950 uppercase italic leading-none">La <br/>Dimora.</h2>
            <div className="text-left md:text-right">
               <p className="text-xl md:text-2xl text-pink-600 font-black uppercase tracking-[0.3em] mb-4">PC Location Minipiri</p>
               <div className="w-16 h-1 bg-pink-200 md:ml-auto"></div>
            </div>
          </div>
          <div className="relative h-[50vh] md:h-[80vh] rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] reveal-text">
            <Image src="/gallery-2.png" alt="Location" fill className="object-cover transition-transform duration-[5s] hover:scale-105" />
            <div className="absolute inset-0 bg-pink-950/5 mix-blend-multiply"></div>
          </div>
        </div>
      </section>

      {/* REGISTRATION - HIGH PRESTIGE */}
      <section id="register" className="py-32 md:py-52 bg-pink-950 relative overflow-hidden">
        {/* Animated Background Circles */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] md:w-[150%] aspect-square border-[1px] border-white/5 rounded-full"
        />
        
        <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-24 rounded-[3rem] md:rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)]"
          >
            {!isSubmitted ? (
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-pink-950 uppercase italic leading-none">Unisciti <br/>A Noi.</h2>
                  <p className="text-pink-900/40 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">Rispondi al richiamo della tua anima.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-[0.3em] opacity-40 uppercase ml-6">Nome Completo *</label>
                      <input 
                        type="text" required placeholder="Inserisci il tuo nome"
                        value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-pink-50/50 px-8 py-5 rounded-full font-bold text-lg text-pink-950 outline-none ring-2 ring-transparent focus:ring-pink-600 transition-all placeholder:opacity-30" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-[0.3em] opacity-40 uppercase ml-6">Indirizzo E-mail *</label>
                      <input 
                        type="email" required placeholder="latua@email.it"
                        value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-pink-50/50 px-8 py-5 rounded-full font-bold text-lg text-pink-950 outline-none ring-2 ring-transparent focus:ring-pink-600 transition-all placeholder:opacity-30" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-[0.3em] opacity-40 uppercase ml-6">Codice Operatore *</label>
                      <input 
                        type="text" required placeholder="••••••"
                        value={formData.code} onChange={(e) => handleCodeChange(e.target.value)}
                        className={`w-full bg-pink-50 px-8 py-5 rounded-full text-2xl font-black text-center tracking-[0.4em] outline-none ring-2 transition-all ${
                          codeStatus.type === 'success' ? 'ring-green-400 text-green-700 bg-green-50' : codeStatus.type === 'error' ? 'ring-red-400 text-red-700 bg-red-50' : 'ring-pink-100'
                        }`} 
                      />
                      {codeStatus.message && (
                        <p className={`text-center font-black uppercase text-[10px] tracking-widest mt-4 ${codeStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                          {codeStatus.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-[0.3em] opacity-40 uppercase ml-6">Codice Sconto (Opzionale)</label>
                      <input 
                        type="text" placeholder="Es. PROMO26"
                        value={formData.discount} onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                        className="w-full bg-pink-50/50 px-8 py-5 rounded-full font-bold text-lg text-center text-pink-950 outline-none ring-2 ring-transparent focus:ring-pink-400 transition-all uppercase placeholder:opacity-30" 
                      />
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "#9D174D" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-pink-600 text-white mt-12 py-8 rounded-full text-2xl font-black shadow-[0_20px_40px_rgba(219,39,119,0.3)] uppercase italic tracking-tighter"
                  >
                    Prenota Il Tuo Posto
                  </motion.button>

                  <div className="pt-10 text-center">
                    <p className="text-[10px] text-pink-950/40 leading-relaxed max-w-2xl mx-auto">
                      <span className="font-black uppercase block mb-2">Disclaimer</span>
                      Il percorso "Ipnosi Regressiva Alchemica base" ha finalità esclusivamente formative, olistiche e di crescita personale e spirituale. Non sostituisce in alcun modo una diagnosi o un trattamento medico, psichiatrico o psicoterapeutico. Per patologie specifiche si consiglia di consultare sempre il proprio medico curante.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-16 md:py-24 text-center"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <CheckCircle className="w-16 h-16 md:w-20 md:h-20" />
                </div>
                <h3 className="text-6xl md:text-7xl font-black text-pink-950 italic mb-8 uppercase tracking-tighter leading-none">Ti Aspettiamo.</h3>
                <p className="text-xl md:text-2xl font-bold text-pink-950/30 uppercase tracking-[0.4em]">Controlla La Tua Mail.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-16 text-[10px] font-black tracking-[0.5em] text-pink-600 hover:underline uppercase">Torna Indietro</button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="py-24 md:py-32 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-4xl font-black text-pink-950 italic uppercase tracking-tighter">Alchimisti</div>
          <div className="w-16 h-[1px] bg-pink-100 mx-auto"></div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[10px] font-black uppercase tracking-[0.4em] text-pink-950/40">
            <a href="#" className="hover:text-pink-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Facebook</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Privacy</a>
          </div>
          <p className="text-[9px] font-bold text-pink-950/20 tracking-[0.8em] uppercase">© 2026 ALCHIMISTI — TUTTI I DIRITTI RISERVATI</p>
        </div>
      </footer>
    </main>
  );
}