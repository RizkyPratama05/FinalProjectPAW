
import React from "react";
import {MagicCard} from "../component/magicui/magic-card"; // pastikan ada filenya
import {ShinyButton} from "../component/magicui/shiny-button"; // contoh extra button
import { motion } from "framer-motion";

export default function Beranda() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/60 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold text-fuchsia-400">MagicHub</span>
          <ShinyButton>Masuk</ShinyButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold leading-tight text-white md:text-5xl"
          >
            Platform Tiket Futuristik
          </motion.h1>
          <p className="mt-3 max-w-prose text-neutral-400">
            Beli tiket konser, festival, hingga workshop. Semua ada di MagicHub ✨
          </p>

          <div className="mt-6 flex gap-4">
            <ShinyButton>Beli Tiket</ShinyButton>
            <ShinyButton className="bg-fuchsia-600 text-white hover:bg-fuchsia-500">
              Jadi Partner
            </ShinyButton>
          </div>
        </div>

        {/* Hero Card pakai Magic UI */}
        <MagicCard
          className="w-full max-w-md p-6 bg-neutral-900 border-neutral-800"
          gradientSize={300}
          gradientFrom="#7C3AED"
          gradientTo="#D946EF"
          gradientColor="rgba(255, 255, 255, 0.05)"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Event Terdekat</h2>
            <p className="text-neutral-400">Arcofest 2025 — Jakarta</p>
            <p className="text-neutral-400 mt-1">22 November 2025</p>
            <ShinyButton className="mt-4 w-full">Pesan Sekarang</ShinyButton>
          </div>
        </MagicCard>
      </section>
    </div>
  );
}
