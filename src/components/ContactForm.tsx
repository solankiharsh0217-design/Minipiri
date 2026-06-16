"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = new FormData();
    form.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "M7LEXbASqH8SCpm");
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    form.append("botcheck", "");
    form.append("form_name", "Alchimisti Contact Form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setErrorMsg(data.message || "Submission failed");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Network error");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 md:py-52 bg-pink-950 relative overflow-hidden">
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
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-pink-950 uppercase italic leading-none">Parlaci.</h2>
              <p className="text-pink-900/40 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">Siamo qui per rispondere a ogni tua domanda.</p>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-16 md:py-24 text-center"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <CheckCircle className="w-16 h-16 md:w-20 md:h-20" />
                </div>
                <h3 className="text-6xl md:text-7xl font-black text-pink-950 italic mb-8 uppercase tracking-tighter leading-none">Grazie!</h3>
                <p className="text-xl md:text-2xl font-bold text-pink-950/30 uppercase tracking-[0.4em]">Messaggio Inviato.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

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

                <div className="space-y-4 text-left">
                  <label className="text-[10px] font-black tracking-[0.3em] opacity-40 uppercase ml-6">Messaggio *</label>
                  <textarea
                    required placeholder="Scrivi il tuo messaggio qui..."
                    rows={5}
                    value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-pink-50/50 px-8 py-5 rounded-3xl font-bold text-lg text-pink-950 outline-none ring-2 ring-transparent focus:ring-pink-600 transition-all placeholder:opacity-30 resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center justify-center gap-3 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-bold">{errorMsg || "Qualcosa è andato storto. Riprova."}</span>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#9D174D" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-pink-600 text-white mt-8 py-8 rounded-full text-2xl font-black shadow-[0_20px_40px_rgba(219,39,119,0.3)] uppercase italic tracking-tighter disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Invio…" : "Invia Messaggio"}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
