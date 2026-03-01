/* ===================================================================
   COMPONENTS / PRESENTATION.JSX - Apresentação com 10 Slides
   =================================================================== */

import { useState, useEffect, useMemo } from 'react';
import Icon from './Icon';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';
import Slide7 from './Slide7';
import Slide8 from './Slide8';
import Slide9 from './Slide9';
import Slide10 from './Slide10';

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10];

export default function Presentation({ cliente, diagnostico, plano, onExit, onRestart }) {
  const [slide, setSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const CurrentSlide = useMemo(() => SLIDES[slide], [slide]);

  const handlePrev = () => {
    setSlide((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
  };

  const handleExit = () => {
    if (window.confirm('Sair da apresentação?')) {
      if (onExit) onExit();
    }
  };

  const handleRestart = () => {
    setSlide(0);
    if (onRestart) onRestart();
  };

  // Teclado: Setas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleExit();
      if (e.key === ' ') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide]);

  return (
    <div className="presentation-container">
      {/* FUNDO APRESENTAÇÃO */}
      <div className="presentation-bg">
        <div className="presentation-orbs">
          <div />
          <div />
        </div>
      </div>

      {/* SLIDE ATUAL */}
      <div className="slide-wrapper">
        <CurrentSlide cliente={cliente} diagnostico={diagnostico} plano={plano} />
      </div>

      {/* BARRA DE NAVEGAÇÃO */}
      <nav
        className="presentation-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
          background: 'rgba(0, 0, 0, .3)',
          backdropFilter: 'blur(10px)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        {/* BOTÃO: SAIR */}
        <button
          onClick={handleExit}
          className="nav-btn"
          style={{
            padding: '8px 16px',
            background: 'rgba(220, 0, 60, .2)',
            border: '1px solid rgba(220, 0, 60, .3)',
            color: '#dc003c',
            borderRadius: 6,
            fontFamily: 'var(--font-b)',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all .15s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(220, 0, 60, .3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(220, 0, 60, .2)';
          }}
        >
          <Icon name="X" size={14} />
          Sair
        </button>

        {/* INFORMAÇÕES E NAVEGAÇÃO DO MEIO */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flex: 1,
            justifyContent: 'center',
            color: 'white',
          }}
        >
          {/* BOTÃO: ANTERIOR */}
          <button
            onClick={handlePrev}
            disabled={slide === 0}
            className="nav-btn"
            style={{
              padding: 8,
              background: slide === 0 ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, .2)',
              border: 'none',
              color: 'white',
              borderRadius: 6,
              cursor: slide === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all .15s',
              opacity: slide === 0 ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (slide > 0) e.target.style.background = 'rgba(255, 255, 255, .3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, .2)';
            }}
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          {/* CONTADOR DE SLIDE */}
          <div
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-b)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontWeight: 800, fontSize: 14 }}>
              {String(slide + 1).padStart(2, '0')}
            </span>
            <span style={{ opacity: 0.6 }}>de</span>
            <span>{String(SLIDES.length).padStart(2, '0')}</span>
          </div>

          {/* BARRA DE PROGRESSO */}
          <div
            style={{
              width: 120,
              height: 3,
              background: 'rgba(255, 255, 255, .2)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: ((slide + 1) / SLIDES.length) * 100 + '%',
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                transition: 'width .3s',
              }}
            />
          </div>

          {/* BOTÃO: PRÓXIMO */}
          <button
            onClick={handleNext}
            disabled={slide === SLIDES.length - 1}
            className="nav-btn"
            style={{
              padding: 8,
              background:
                slide === SLIDES.length - 1 ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, .2)',
              border: 'none',
              color: 'white',
              borderRadius: 6,
              cursor: slide === SLIDES.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all .15s',
              opacity: slide === SLIDES.length - 1 ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (slide < SLIDES.length - 1) e.target.style.background = 'rgba(255, 255, 255, .3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, .2)';
            }}
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>

        {/* BOTÃO: REINICIAR (aparece no último slide) */}
        {slide === SLIDES.length - 1 && (
          <button
            onClick={handleRestart}
            className="nav-btn"
            style={{
              padding: '8px 16px',
              background: 'var(--accent)',
              border: 'none',
              color: 'white',
              borderRadius: 6,
              fontFamily: 'var(--font-b)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all .15s',
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
            }}
          >
            <Icon name="RotateCw" size={14} />
            Recomeçar
          </button>
        )}
      </nav>

      {/* ATALHOS: MOSTRADOS NO PRIMEIRO SLIDE */}
      {slide === 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            right: 32,
            fontSize: 11,
            color: 'rgba(255, 255, 255, .6)',
            textAlign: 'right',
            animation: 'fadeInUp .5s ease-out .5s both',
          }}
        >
          <div style={{ marginBottom: 4 }}>→ Próximo slide</div>
          <div style={{ marginBottom: 4 }}>← Slide anterior</div>
          <div style={{ marginBottom: 4 }}>ESC Sair</div>
        </div>
      )}

      {/* CSS para animações */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .presentation-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000;
          overflow: hidden;
          z-index: 1000;
        }

        .presentation-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 100%);
        }

        .presentation-orbs {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .presentation-orbs div {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: screen;
          opacity: 0.1;
        }

        .presentation-orbs div:first-child {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #9400d3, transparent);
          top: -200px;
          left: -200px;
          animation: float 15s ease-in-out infinite;
        }

        .presentation-orbs div:last-child {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #cc00ff, transparent);
          bottom: -150px;
          right: -150px;
          animation: float 20s ease-in-out infinite 2s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -30px); }
          50% { transform: translate(-10px, 10px); }
          75% { transform: translate(30px, 20px); }
        }

        .slide-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .presentation-nav {
          z-index: 101;
        }
      `}</style>
    </div>
  );
}
