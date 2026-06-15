"use client";

import { useState } from "react";
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
    <main className="antialiased selection:bg-pink-200 selection:text-pink-900 bg-[#FDF2F8]">
      {/* Premium Floating Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl">
        <div className="glass-card px-10 py-5 rounded-[2.5rem] flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-white/60">
          <div className="text-3xl font-black text-pink-700 tracking-tighter uppercase italic">Minipiri</div>
          <div className="hidden lg:flex items-center space-x-12 font-black text-[10px] tracking-[0.3em] text-pink-950/50 uppercase">
            <a href="#event" className="hover:text-pink-600 transition-all hover:tracking-[0.4em]">L'Evento</a>
            <a href="#operators" className="hover:text-pink-600 transition-all hover:tracking-[0.4em]">Operatori</a>
            <a href="#gallery" className="hover:text-pink-600 transition-all hover:tracking-[0.4em]">Gallery</a>
            <a href="#register" className="bg-pink-600 text-white px-10 py-4 rounded-2xl shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all">Iscriviti</a>
          </div>
        </div>
      </nav>

      {/* AMAZING HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.jpg" 
            alt="Hero Background" 
            fill 
            priority
            className="object-cover scale-110 blur-sm opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/40 via-white to-yellow-50/30"></div>
          
          {/* Animated Light Leaks */}
          <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-pink-200/20 rounded-full blur-[120px] animate-light-leak"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-yellow-100/20 rounded-full blur-[120px] animate-light-leak" style={{animationDelay: '-5s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Hero Content */}
          <div className="text-left">
            <div className="inline-flex items-center space-x-3 px-6 py-3 mb-10 text-[10px] font-black tracking-[0.4em] text-white uppercase bg-pink-600 rounded-full shadow-[0_10px_30px_rgba(219,39,119,0.3)] animate-bounce-slow">
              <span>27 — 29 NOVEMBRE</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter text-pink-950">
              IL TUO <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-yellow-600 italic">RISVEGLIO</span> <br/>
              INTERIORE.
            </h1>
            
            <div className="flex items-center space-x-6 mb-12">
              <div className="w-20 h-[2px] bg-pink-200"></div>
              <p className="text-xl md:text-2xl text-pink-900/40 font-bold uppercase tracking-widest leading-none">
                PC Location <span className="text-pink-600">Minipiri</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <a href="#register" className="group relative bg-pink-950 text-white px-14 py-8 rounded-[2rem] text-xl font-black overflow-hidden transition-all hover:scale-105 shadow-2xl">
                <span className="relative z-10">PARTECIPA ORA</span>
                <div className="absolute inset-0 bg-pink-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500"></div>
              </a>
              <a href="#event" className="px-14 py-8 rounded-[2rem] text-xl font-black border-2 border-pink-100 text-pink-900 hover:bg-pink-50 transition-all">
                SCOPRI DI PIÙ
              </a>
            </div>
          </div>

          {/* Hero Visual Focal Point */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square animate-float">
              {/* Decorative Rings */}
              <div className="absolute inset-0 border-2 border-pink-100 rounded-full scale-110 opacity-50"></div>
              <div className="absolute inset-0 border-2 border-pink-50 rounded-full scale-125 opacity-30 animate-pulse"></div>
              
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] transform rotate-3 hover:rotate-0 transition-all duration-700">
                <Image 
                  src="/hero-bg.jpg" 
                  alt="MINIPIRI Location" 
                  fill 
                  className="object-cover scale-125 hover:scale-100 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/40 to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 glass-card p-10 rounded-[3rem] shadow-2xl animate-bounce-slow">
                <p className="text-5xl font-black text-pink-600 leading-none mb-2">3</p>
                <p className="text-[10px] font-black tracking-widest text-pink-900/40 uppercase">Giorni di<br/>Trasformazione</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase text-pink-950">SCROLL</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-pink-950 to-transparent"></div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-32">
            <div>
              <span className="text-pink-600 font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">01 / Atmosfera</span>
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] text-pink-950">SPIRITO <br/><span className="text-pink-200 italic">MAGICO</span></h2>
            </div>
            <p className="text-2xl text-pink-900/50 font-medium leading-relaxed max-w-md">Un luogo dove il tempo si ferma e l'anima ricomincia a respirare.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[900px]">
            <div className="md:col-span-7 relative rounded-[4rem] overflow-hidden group shadow-2xl">
              <Image src="/gallery-1.jpg" alt="Atmosfera 1" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="md:col-span-5 grid grid-rows-2 gap-8">
              <div className="relative rounded-[3rem] overflow-hidden group shadow-xl">
                <Image src="/gallery-2.jpg" alt="Atmosfera 2" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <div className="bg-pink-600 rounded-[3rem] p-16 flex flex-col justify-center text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-4xl font-black mb-6 leading-tight uppercase tracking-tighter italic">PC Location <br/>Minipiri</h3>
                  <p className="text-pink-100 text-lg font-bold leading-relaxed opacity-80">L'eccellenza dell'ospitalità incontra la profondità dell'esperienza evolutiva.</p>
                </div>
                <div className="absolute -bottom-10 -right-10 text-[15rem] font-black italic opacity-10 group-hover:scale-110 transition-transform">!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operators Section */}
      <section id="operators" className="py-40 bg-[#FDF2F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <span className="text-pink-600 font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">02 / Guide</span>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] text-pink-950 uppercase italic">Maestri</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-20">
            {[
              { name: "Mario Sparacia", code: "LIMEN 369", color: "bg-blue-600", icon: "🔵" },
              { name: "Salvo Landolina", code: "AKIRA 360", color: "bg-green-600", icon: "🟢" },
              { name: "Chiara Zanetti", code: "ANAEL 369", color: "bg-purple-600", icon: "🟣" }
            ].map((op, i) => (
              <div key={i} className="group relative">
                <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-6 group-hover:rotate-2">
                  <div className="absolute inset-0 bg-pink-100 flex items-center justify-center">
                    <span className="text-[12rem] opacity-10 group-hover:opacity-30 transition-all grayscale group-hover:grayscale-0">{op.icon}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-12">
                    <div className={`${op.color} w-12 h-1 mb-6 rounded-full group-hover:w-full transition-all duration-700`}></div>
                    <p className="text-white/40 font-black text-xs tracking-[0.3em] uppercase mb-4">{op.code}</p>
                    <h3 className="text-4xl font-black text-white leading-none uppercase tracking-tighter italic">{op.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION SECTION */}
      <section id="register" className="py-40 relative bg-pink-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20 scale-150 blur-xl">
          <Image src="/hero-bg.jpg" alt="Register BG" fill className="object-cover" />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-white p-12 md:p-24 rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-20">
                  <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-pink-950 uppercase italic leading-none">Inizia il <br/><span className="text-pink-600">Viaggio</span></h2>
                  <p className="text-pink-900/40 font-black tracking-widest uppercase text-sm">Posti strettamente limitati</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-900/30 ml-8">Nome Completo</label>
                      <input 
                        type="text" required value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-10 py-8 rounded-[2.5rem] bg-pink-50/50 border-none ring-2 ring-pink-100 focus:ring-pink-600 focus:bg-white transition-all text-xl font-bold text-pink-950 outline-none" 
                        placeholder="MARIO ROSSI" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-900/30 ml-8">E-mail</label>
                      <input 
                        type="email" required value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-10 py-8 rounded-[2.5rem] bg-pink-50/50 border-none ring-2 ring-pink-100 focus:ring-pink-600 focus:bg-white transition-all text-xl font-bold text-pink-950 outline-none" 
                        placeholder="EMAIL@ESEMPIO.IT" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-900/30 text-center block">Codice Operatore Riservato</label>
                    <input 
                      type="text" required value={formData.code}
                      onChange={(e) => handleCodeChange(e.target.value)}
                      className={`w-full px-10 py-10 rounded-[2.5rem] border-none ring-4 text-4xl font-black tracking-[0.5em] text-center uppercase transition-all ${
                        codeStatus.type === 'success' ? 'ring-green-400 bg-green-50 text-green-900' : codeStatus.type === 'error' ? 'ring-red-400 bg-red-50 text-red-900' : 'ring-pink-100 bg-pink-50/50 text-pink-950'
                      } outline-none`} 
                      placeholder="••••••" 
                    />
                    {codeStatus.message && (
                      <p className={`text-xs mt-6 text-center font-black uppercase tracking-[0.2em] ${codeStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                        {codeStatus.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="w-full bg-pink-600 text-white py-10 rounded-[2.5rem] text-3xl font-black shadow-[0_30px_60px_rgba(219,39,119,0.4)] hover:scale-[1.02] active:scale-95 transition-all mt-10 uppercase italic tracking-tighter">
                    CONFERMA ORA
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-40 h-40 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-12 shadow-inner">
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-7xl font-black mb-8 tracking-tighter text-pink-950 uppercase italic">ECCELLENTE!</h3>
                <p className="text-2xl text-pink-900/40 font-bold max-w-sm mx-auto leading-tight uppercase">Ci vediamo a <br/>Novembre.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-16 text-pink-600 font-black uppercase tracking-[0.3em] text-[10px] hover:underline">NUOVA ISCRIZIONE</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-32 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-5xl font-black text-pink-950 mb-10 tracking-tighter uppercase italic">Minipiri</div>
          <div className="w-10 h-1 bg-pink-100 mx-auto mb-10"></div>
          <p className="text-pink-900/20 font-black text-[10px] tracking-[0.8em] uppercase">© 2026 EVENTO EVOLUTIVO — TUTTI I DIRITTI RISERVATI</p>
        </div>
      </footer>
    </main>
  );
}
