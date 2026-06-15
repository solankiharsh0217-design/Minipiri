"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const validCodes: Record<string, string> = {
  'LIMEN369': 'Mario Sparacia',
  'AKIRA360': 'Salvo Landolina',
  'ANAEL369': 'Chiara Zanetti'
};

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
    <main className="antialiased selection:bg-pink-200 selection:text-pink-900">
      {/* Editorial Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 md:px-12 py-6 md:py-8 flex justify-between items-center ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 md:py-6 border-b border-pink-50' : ''}`}>
        <div className={`text-2xl md:text-3xl font-black tracking-tighter uppercase italic transition-colors duration-500 ${scrolled ? 'text-pink-950' : 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]'}`}>
          Minipiri
        </div>

        {/* Desktop Links */}
        <div className={`hidden lg:flex items-center space-x-12 font-black text-[10px] tracking-[0.4em] uppercase transition-colors duration-500 ${scrolled ? 'text-pink-950/70' : 'text-white/90'}`}>
          <a href="#event" className="hover:text-pink-600 transition-all drop-shadow-sm">L'Evento</a>
          <a href="#operators" className="hover:text-pink-600 transition-all drop-shadow-sm">Operatori</a>
          <a href="#gallery" className="hover:text-pink-600 transition-all drop-shadow-sm">Gallery</a>
          <a href="#register" className={`px-10 py-4 rounded-none transition-all ${scrolled ? 'bg-pink-950 text-white hover:bg-pink-600' : 'bg-white text-pink-950 hover:bg-pink-50 shadow-xl'}`}>
            Iscriviti
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden z-[110] p-2 transition-colors duration-500 ${scrolled || mobileMenuOpen ? 'text-pink-950' : 'text-white'}`}
        >
          <div className="w-8 h-8 flex flex-col justify-center items-end gap-1.5">
            <span className={`h-1 bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-8 rotate-45 translate-y-2.5' : 'w-8'}`}></span>
            <span className={`h-1 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-5'}`}></span>
            <span className={`h-1 bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-8 -rotate-45 -translate-y-2.5' : 'w-8'}`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-[105] transition-transform duration-700 ease-in-out lg:hidden flex flex-col justify-center items-center p-12 space-y-12 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="flex flex-col items-center space-y-8 text-center">
              <a onClick={() => setMobileMenuOpen(false)} href="#event" className="text-4xl font-black text-pink-950 uppercase italic tracking-tighter">L'Evento</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#operators" className="text-4xl font-black text-pink-950 uppercase italic tracking-tighter">Operatori</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#gallery" className="text-4xl font-black text-pink-950 uppercase italic tracking-tighter">Gallery</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#register" className="bg-pink-950 text-white px-12 py-6 text-xl font-black uppercase tracking-widest">Iscriviti</a>
           </div>
           <div className="text-[10px] font-black tracking-[0.5em] text-pink-950/20 uppercase pt-12">© 2026 MINIPIRI</div>
        </div>
      </nav>

      {/* FULL VIEWPORT EDITORIAL HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image - Full Viewport */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.jpg" 
            alt="Hero Background" 
            fill 
            priority
            className="object-cover animate-slow-zoom grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-pink-950/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 md:to-white"></div>
        </div>

        {/* Hero Content - Editorial Centered */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <div className="overflow-hidden mb-4 md:mb-6">
            <span className="block text-white text-[10px] md:text-[12px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase animate-reveal [animation-delay:0.2s]">
              27 — 29 Novembre 2026
            </span>
          </div>
          
          <div className="overflow-hidden mb-6 md:mb-8">
            <h1 className="text-6xl md:text-[12rem] font-black leading-[0.8] tracking-tighter text-white uppercase italic animate-reveal [animation-delay:0.4s]">
              Evoluzione
            </h1>
          </div>

          <div className="overflow-hidden mb-10 md:mb-12">
            <p className="text-lg md:text-3xl text-white font-medium uppercase tracking-[0.1em] md:tracking-[0.2em] animate-reveal [animation-delay:0.6s]">
              PC Location <span className="font-black italic">Minipiri</span>
            </p>
          </div>

          <div className="animate-reveal [animation-delay:0.8s] flex flex-col items-center">
            <a href="#register" className="group relative px-12 md:px-20 py-6 md:py-8 bg-white text-pink-950 font-black text-lg md:text-xl tracking-[0.3em] transition-all hover:scale-110 active:scale-95">
              PARTECIPA
            </a>
            <div className="mt-8 md:mt-12 animate-bounce opacity-50">
               <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision - Pure Editorial Section */}
      <section id="event" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="relative aspect-[3/4] overflow-hidden shadow-2xl">
            <Image src="/gallery-1.jpg" alt="Vision" fill className="object-cover grayscale" />
          </div>
          <div className="space-y-8 md:space-y-12">
            <span className="text-pink-600 font-black tracking-[0.5em] uppercase text-[10px]">L'Essenza</span>
            <h2 className="text-5xl md:text-7xl font-black text-pink-950 leading-[0.9] tracking-tighter uppercase italic">Oltre il <br/>Visibile.</h2>
            <p className="text-lg md:text-xl text-pink-900/60 leading-relaxed font-medium">
              Tre giorni dedicati alla riscoperta del proprio centro interiore. In una cornice di lusso e silenzio, i maestri ti guideranno in un percorso di trasformazione profonda.
            </p>
            <div className="pt-4 md:pt-8">
              <a href="#register" className="btn-editorial inline-block text-center w-full md:w-auto">Scopri di più</a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery - Editorial Masonry */}
      <section id="gallery" className="py-16 md:py-20 bg-pink-50/20">
        <div className="max-w-screen-2xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-stretch">
              <div className="md:col-span-4 space-y-6 flex flex-col justify-center">
                 <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-pink-950 uppercase italic leading-none">Lo <br/>Spazio.</h2>
                 <p className="text-pink-900/40 text-sm font-black tracking-widest uppercase">PC Location Minipiri</p>
              </div>
              <div className="md:col-span-8 relative aspect-video h-[400px] md:h-[600px] overflow-hidden shadow-2xl">
                 <Image src="/gallery-2.jpg" alt="The Place" fill className="object-cover" />
                 <div className="absolute inset-0 bg-pink-950/10"></div>
              </div>
           </div>
        </div>
      </section>

      {/* Operators - Portrait Style */}
      <section id="operators" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 md:mb-32 text-center md:text-left">
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-pink-950 uppercase italic leading-none">I Maestri</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
            {[
              { name: "Mario Sparacia", code: "LIMEN 369", icon: "🔵", color: "text-blue-600" },
              { name: "Salvo Landolina", code: "AKIRA 360", icon: "🟢", color: "text-green-600" },
              { name: "Chiara Zanetti", code: "ANAEL 369", icon: "🟣", color: "text-purple-600" }
            ].map((op, i) => (
              <div key={i} className="group">
                <div className="relative aspect-[3/5] overflow-hidden mb-8 md:mb-12 bg-pink-50 grayscale hover:grayscale-0 transition-all duration-700 shadow-xl group-hover:shadow-2xl">
                   <div className="absolute inset-0 flex items-center justify-center text-[8rem] md:text-[10rem] opacity-20 group-hover:scale-110 transition-transform">{op.icon}</div>
                   <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p className={`font-black text-[10px] tracking-[0.4em] mb-4 uppercase ${op.color}`}>{op.code}</p>
                <h3 className="text-3xl md:text-4xl font-black text-pink-950 uppercase tracking-tighter italic">{op.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call - Minimalist */}
      <section id="register" className="py-24 md:py-40 bg-pink-950 overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-white p-8 md:p-32 text-center shadow-[0_50px_100px_rgba(0,0,0,0.5)] md:shadow-[0_100px_150px_-50px_rgba(0,0,0,0.8)]">
            {!isSubmitted ? (
              <>
                <h2 className="text-5xl md:text-8xl font-black mb-12 md:text-8xl mb-16 tracking-tighter text-pink-950 uppercase italic leading-none">Riserva <br/>il tuo <br/>Posto.</h2>
                
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12 text-left">
                  <div className="space-y-6 md:space-y-8">
                    <input 
                      type="text" required placeholder="NOME COMPLETO"
                      value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-transparent border-b-2 border-pink-100 py-4 md:py-6 text-xl md:text-2xl font-black text-pink-950 outline-none focus:border-pink-600 transition-all placeholder:text-pink-100" 
                    />
                    <input 
                      type="email" required placeholder="EMAIL"
                      value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-transparent border-b-2 border-pink-100 py-4 md:py-6 text-xl md:text-2xl font-black text-pink-950 outline-none focus:border-pink-600 transition-all placeholder:text-pink-100" 
                    />
                    <div className="space-y-2 md:space-y-4">
                       <label className="text-[10px] font-black tracking-[0.4em] opacity-30 uppercase block">Codice Operatore</label>
                       <input 
                        type="text" required placeholder="••••••"
                        value={formData.code} onChange={(e) => handleCodeChange(e.target.value)}
                        className={`w-full bg-transparent border-b-2 py-4 md:py-6 text-3xl md:text-5xl font-black tracking-[0.2em] md:tracking-[0.4em] text-pink-950 outline-none transition-all placeholder:text-pink-100 ${
                          codeStatus.type === 'success' ? 'border-green-400 text-green-700' : codeStatus.type === 'error' ? 'border-red-400 text-red-700' : 'border-pink-100'
                        }`} 
                      />
                      {codeStatus.message && (
                        <p className={`text-[10px] font-black uppercase tracking-widest ${codeStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                          {codeStatus.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-pink-950 text-white py-6 md:py-10 text-2xl md:text-3xl font-black tracking-tighter hover:bg-pink-600 transition-all uppercase italic">
                    Conferma
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 md:py-20">
                <h3 className="text-6xl md:text-8xl font-black text-pink-950 italic mb-6 md:mb-8 uppercase leading-none tracking-tighter">Benvenuto.</h3>
                <p className="text-lg md:text-xl font-bold text-pink-900/40 uppercase tracking-widest">Controlla la tua e-mail.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-12 md:mt-20 text-[10px] font-black tracking-[0.5em] text-pink-600 hover:underline uppercase">Indietro</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-16 md:py-20 bg-white border-t border-pink-50 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
          <div className="text-3xl md:text-4xl font-black text-pink-950 tracking-tighter uppercase italic">Minipiri</div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-black tracking-[0.4em] text-pink-950 uppercase opacity-30">
             <a href="#" className="hover:opacity-100">Instagram</a>
             <a href="#" className="hover:opacity-100">Facebook</a>
             <a href="#" className="hover:opacity-100">Contact</a>
          </div>
          <p className="text-[10px] font-black tracking-[0.4em] text-pink-900/20 uppercase">© 2026 MINIPIRI</p>
        </div>
      </footer>
    </main>
  );
}
