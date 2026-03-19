'use client';

import Link from 'next/link';
import Background from '../Background/Background';

export function Hero() {
  return (
    <section className="hero bg-base-100 min-h-[70vh] relative overflow-hidden">

      {/* Background Animated Blur Effects */}
      <Background />

      <div className="hero-content text-center relative z-10 flex-col py-20">
        {/* Title */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-base-content leading-[1.1] mb-6 tracking-tight">
            Bem vindo ao&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Blog Aulas
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="py-6 text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed font-sans">
            Explore os artigos e discussões criadas por professores e alunos para a sua <span className="text-accent">jornada educacional</span>.
          </p>

          {/* Call to Action */}
          <Link
            href="#artigos"
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform"
          >
            Comece a Explorar
          </Link>
        </div>
      </div>
    </section>
  );
}
