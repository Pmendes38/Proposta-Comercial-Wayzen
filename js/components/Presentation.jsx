/* ===================================================================
   COMPONENTS / PRESENTATION.JSX - Apresentação com 10 Slides
   =================================================================== */

import { useState, useEffect, useMemo, useRef } from 'react';
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
import { PLANS } from '../data';

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10];

const SLIDE_TITLES = [
  'Capa',
  'Como Trabalhamos',
  'Jornada do Cliente',
  'Nosso Time',
  'Gargalos Identificados',
  'Cases & Resultados',
  'Diferenciais',
  'Cronograma',
  'Sua Empresa ao Final',
  'Investimento',
];

export default function Presentation({ cliente, diagnostico, plan, onExit, onRestart }) {
  const [slide, setSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [planAtivo, setPlanAtivo] = useState(plan);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPreparingPdf, setIsPreparingPdf] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const printStackRef = useRef(null);

  const CurrentSlide = useMemo(() => SLIDES[slide], [slide]);
  const planoSelecionado = useMemo(
    () => PLANS.find((p) => p.id === (diagnostico?.planEscolhido || planAtivo)),
    [diagnostico?.planEscolhido, planAtivo]
  );
  const whatsappDisponivel = Boolean(String(cliente?.whatsapp || '').replace(/\D/g, ''));

  const handlePrev = () => {
    setSlide((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
  };

  const handleExit = () => {
    setShowConfirmModal(true);
  };

  const handleRestart = () => {
    setSlide(0);
    if (onRestart) onRestart();
  };

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const normalizeWhatsapp = (value) => {
    const digits = String(value || '').replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length === 10 || digits.length === 11) return `55${digits}`;
    return digits;
  };

  const handleSendWhatsappCTA = () => {
    const telefone = normalizeWhatsapp(cliente?.whatsapp);
    if (!telefone) {
      window.alert('Preencha o WhatsApp do cliente na etapa de identificacao para enviar o CTA.');
      return;
    }

    const nome = cliente?.decisor ? ` ${cliente.decisor}` : '';
    const empresa = cliente?.empresa || 'sua empresa';
    const planoNome = planoSelecionado?.label || 'plano recomendado';
    const mensagem = [
      `Ola${nome}, aqui e da Wayzen.`,
      `Obrigado pelo tempo na reuniao sobre a operacao da ${empresa}.`,
      `Nossa recomendacao e seguir com o plano ${planoNome}.`,
      'Se fizer sentido para voce, posso te enviar o passo a passo de kickoff agora pelo WhatsApp.',
    ].join('\n');

    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleGeneratePdf = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
    setIsPreparingPdf(true);
  };

  const handleToggleControls = () => {
    setShowControls((prev) => !prev);
  };

  // Teclado: Setas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleExit();
      if (e.key.toLowerCase() === 'h') handleToggleControls();
      if (e.key === ' ') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide]);

  useEffect(() => {
    document.body.classList.toggle('preparing-pdf', isPreparingPdf);
    return () => document.body.classList.remove('preparing-pdf');
  }, [isPreparingPdf]);

  useEffect(() => {
    if (!isPreparingPdf) return undefined;
    let cancelled = false;

    const waitForNextPaint = () =>
      new Promise((resolve) => {
        window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
      });

    const waitForImages = async () => {
      const root = printStackRef.current;
      if (!root) return;
      const images = Array.from(root.querySelectorAll('img'));
      if (!images.length) return;

      await Promise.all(
        images.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve();
                return;
              }

              let done = false;
              const finish = () => {
                if (done) return;
                done = true;
                img.removeEventListener('load', finish);
                img.removeEventListener('error', finish);
                resolve();
              };

              img.addEventListener('load', finish, { once: true });
              img.addEventListener('error', finish, { once: true });
              window.setTimeout(finish, 1800);
            })
        )
      );
    };

    const openPrintDialog = async () => {
      await waitForNextPaint();
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // ignore font loading errors and proceed with print
        }
      }
      await waitForImages();
      if (!cancelled) {
        window.print();
      }
    };

    openPrintDialog();
    return () => {
      cancelled = true;
    };
  }, [isPreparingPdf]);

  useEffect(() => {
    const handleAfterPrint = () => setIsPreparingPdf(false);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  return (
    <div className="presentation-container">
      {/* FUNDO APRESENTAÇÃO */}
      <div className="presentation-bg no-print">
        <div className="presentation-orbs">
          <div />
          <div />
        </div>
      </div>

      {/* SLIDE ATUAL */}
      <div
        className={`slide-wrapper no-print ${showControls ? 'controls-visible' : 'controls-hidden'}`}
        style={{ bottom: showControls ? 60 : 0, transition: 'bottom .25s ease' }}
      >
        <CurrentSlide
          key={slide}
          cliente={cliente}
          diag={diagnostico}
          diagnostico={diagnostico}
          plano={planAtivo}
          plan={planAtivo}
          selectedPlan={planAtivo}
          onSelect={setPlanAtivo}
        />
      </div>

      <div className="presentation-side-nav no-print">
        <button
          type="button"
          className="presentation-side-btn presentation-side-btn-left"
          onClick={handlePrev}
          disabled={slide === 0}
          aria-label="Slide anterior"
          title="Slide anterior"
        >
          <Icon name="ChevronLeft" size={18} />
        </button>
        <button
          type="button"
          className="presentation-side-btn presentation-side-btn-right"
          onClick={handleNext}
          disabled={slide === SLIDES.length - 1}
          aria-label="Proximo slide"
          title="Proximo slide"
        >
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>

      {!showControls && (
        <button
          type="button"
          className="no-print presentation-show-controls"
          onClick={handleToggleControls}
          style={{
            position: 'absolute',
            right: 24,
            bottom: 16,
            zIndex: 120,
            padding: '8px 12px',
            background: 'rgba(0, 0, 0, .5)',
            border: '1px solid rgba(255, 255, 255, .25)',
            borderRadius: 8,
            color: 'white',
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          Mostrar controles
        </button>
      )}

      {/* BARRA DE NAVEGAÇÃO */}
      <nav
        className="presentation-nav no-print"
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
          transform: showControls ? 'translateY(0)' : 'translateY(calc(100% + 8px))',
          transition: 'transform .25s ease',
          pointerEvents: showControls ? 'auto' : 'none',
        }}
      >
        {/* BOTÃO: SAIR */}
        <button
          onClick={handleExit}
          className="nav-btn presentation-nav-exit"
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
            e.currentTarget.style.background = 'rgba(220, 0, 60, .3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(220, 0, 60, .2)';
          }}
        >
          <Icon name="X" size={14} />
          Sair
        </button>

        {/* INFORMAÇÕES E NAVEGAÇÃO DO MEIO */}
        <div
          className="presentation-nav-center"
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
              if (slide > 0) e.currentTarget.style.background = 'rgba(255, 255, 255, .3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, .2)';
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
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 800, fontSize: 14 }}>
                {String(slide + 1).padStart(2, '0')}
              </span>
              <span style={{ opacity: 0.6 }}>de</span>
              <span>{String(SLIDES.length).padStart(2, '0')}</span>
            </div>
            <span style={{ fontSize: 11, opacity: 0.7 }}>{SLIDE_TITLES[slide]}</span>
          </div>

          {/* BARRA DE PROGRESSO */}
          <div
            className="presentation-nav-progress"
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
              if (slide < SLIDES.length - 1) e.currentTarget.style.background = 'rgba(255, 255, 255, .3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, .2)';
            }}
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>

        <div className="presentation-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handleToggleControls}
            className="nav-btn"
            style={{
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, .12)',
              border: '1px solid rgba(255, 255, 255, .2)',
              color: 'white',
              borderRadius: 6,
              fontFamily: 'var(--font-b)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, .22)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, .12)';
            }}
          >
            Ocultar barra
          </button>

          <button
            onClick={handleGeneratePdf}
            className="nav-btn"
            disabled={isPreparingPdf}
            style={{
              padding: '8px 14px',
              background: isPreparingPdf ? 'rgba(255, 255, 255, .12)' : 'rgba(0, 200, 100, .2)',
              border: isPreparingPdf
                ? '1px solid rgba(255, 255, 255, .2)'
                : '1px solid rgba(0, 200, 100, .35)',
              color: isPreparingPdf ? 'rgba(255, 255, 255, .65)' : '#00c864',
              borderRadius: 6,
              fontFamily: 'var(--font-b)',
              fontSize: 12,
              fontWeight: 600,
              cursor: isPreparingPdf ? 'not-allowed' : 'pointer',
              transition: 'all .15s',
            }}
            onMouseEnter={(e) => {
              if (!isPreparingPdf) e.currentTarget.style.background = 'rgba(0, 200, 100, .28)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isPreparingPdf
                ? 'rgba(255, 255, 255, .12)'
                : 'rgba(0, 200, 100, .2)';
            }}
          >
            {isPreparingPdf ? 'Preparando PDF...' : 'Gerar PDF'}
          </button>

          <button
            onClick={handleSendWhatsappCTA}
            className="nav-btn"
            disabled={!whatsappDisponivel}
            style={{
              padding: '8px 14px',
              background: whatsappDisponivel ? 'rgba(37, 211, 102, .2)' : 'rgba(255, 255, 255, .1)',
              border: whatsappDisponivel
                ? '1px solid rgba(37, 211, 102, .35)'
                : '1px solid rgba(255, 255, 255, .16)',
              color: whatsappDisponivel ? '#25d366' : 'rgba(255, 255, 255, .5)',
              borderRadius: 6,
              fontFamily: 'var(--font-b)',
              fontSize: 12,
              fontWeight: 600,
              cursor: whatsappDisponivel ? 'pointer' : 'not-allowed',
              transition: 'all .15s',
            }}
            title={
              whatsappDisponivel
                ? 'Abrir CTA no WhatsApp do cliente'
                : 'Preencha o WhatsApp do cliente na etapa de identificacao'
            }
            onMouseEnter={(e) => {
              if (whatsappDisponivel) e.currentTarget.style.background = 'rgba(37, 211, 102, .3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = whatsappDisponivel
                ? 'rgba(37, 211, 102, .2)'
                : 'rgba(255, 255, 255, .1)';
            }}
          >
            Enviar CTA WhatsApp
          </button>

          {/* BOTÃO: TELA CHEIA */}
          <button
            onClick={handleFullscreen}
            className="nav-btn"
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, .2)',
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
              e.currentTarget.style.background = 'rgba(255, 255, 255, .3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, .2)';
            }}
          >
            <Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} size={14} />
            {isFullscreen ? 'Sair Fullscreen' : 'Fullscreen'}
          </button>

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
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              <Icon name="RotateCw" size={14} />
              Recomeçar
            </button>
          )}
        </div>
      </nav>

      {isPreparingPdf && (
        <div ref={printStackRef} className="print-show pdf-print-stack">
          {SLIDES.map((SlideComponent, idx) => (
            <section key={`pdf-slide-${idx}`} className="pdf-page">
              <SlideComponent
                cliente={cliente}
                diag={diagnostico}
                diagnostico={diagnostico}
                plano={planAtivo}
                plan={planAtivo}
                selectedPlan={planAtivo}
                onSelect={setPlanAtivo}
              />
            </section>
          ))}
        </div>
      )}

      {/* ATALHOS: MOSTRADOS NO PRIMEIRO SLIDE */}
      {slide === 0 && (
        <div
          className="no-print presentation-shortcuts"
          style={{
            position: 'absolute',
            bottom: showControls ? 120 : 24,
            right: 32,
            fontSize: 11,
            color: 'rgba(255, 255, 255, .6)',
            textAlign: 'right',
            animation: 'fadeInUp .5s ease-out .5s both',
          }}
        >
          <div style={{ marginBottom: 4 }}>→ Próximo slide</div>
          <div style={{ marginBottom: 4 }}>← Slide anterior</div>
          <div style={{ marginBottom: 4 }}>H Mostrar/ocultar barra</div>
          <div style={{ marginBottom: 4 }}>ESC Sair</div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO CUSTOMIZADO */}
      {showConfirmModal && (
        <div
          className="no-print"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, .8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn .2s ease-out',
          }}
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 12,
              padding: '32px',
              maxWidth: 400,
              boxShadow: '0 20px 60px rgba(0, 0, 0, .5)',
              animation: 'slideUp .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
                color: 'var(--text)',
                fontFamily: 'var(--font-h)',
              }}
            >
              Sair da apresentação?
            </h2>
            <p
              style={{
                fontSize: 13,
                color: 'var(--muted)',
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Você está deixando a apresentação. Qualquer alteração no plano será perdida.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{
                  padding: '10px 20px',
                  background: 'var(--divider)',
                  border: 'none',
                  borderRadius: 6,
                  color: 'var(--text)',
                  fontFamily: 'var(--font-b)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 12,
                  transition: 'all .15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--muted)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--divider)';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  if (onExit) onExit();
                }}
                style={{
                  padding: '10px 20px',
                  background: '#dc003c',
                  border: 'none',
                  borderRadius: 6,
                  color: 'white',
                  fontFamily: 'var(--font-b)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 12,
                  transition: 'all .15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#a50029';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#dc003c';
                }}
              >
                Sair
              </button>
            </div>
          </div>
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
          gap: 12px;
          flex-wrap: nowrap;
        }

        .presentation-side-nav {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 110;
          display: none;
        }

        .presentation-side-btn {
          pointer-events: auto;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(0, 0, 0, 0.38);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all .15s ease;
        }

        .presentation-side-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .presentation-side-btn:disabled {
          opacity: .35;
          cursor: not-allowed;
        }

        .presentation-side-btn-left {
          left: 14px;
        }

        .presentation-side-btn-right {
          right: 14px;
        }

        .presentation-nav-center {
          min-width: 260px;
        }

        .presentation-nav-actions {
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .presentation-show-controls {
          max-width: calc(100vw - 32px);
        }

        @media (max-width: 1200px) {
          .presentation-side-nav {
            display: block;
          }

          .presentation-nav {
            padding: 12px 16px !important;
            flex-wrap: wrap;
          }

          .presentation-nav-center {
            order: 3;
            width: 100%;
            justify-content: center !important;
            gap: 14px !important;
          }

          .presentation-nav-actions {
            flex: 1;
            justify-content: flex-end;
          }

          .presentation-nav .nav-btn {
            padding: 7px 10px !important;
            font-size: 11px !important;
          }
        }

        @media (max-width: 900px) {
          .slide-wrapper.controls-visible {
            bottom: 74px !important;
          }

          .presentation-nav {
            padding: 10px 12px !important;
            gap: 8px;
          }

          .presentation-nav-progress,
          .presentation-shortcuts {
            display: none !important;
          }

          .presentation-nav-center {
            order: 2;
            justify-content: space-between !important;
            margin-left: 0 !important;
          }

          .presentation-nav-actions {
            order: 3;
            width: 100%;
            justify-content: flex-end;
          }

          .presentation-nav .nav-btn {
            padding: 6px 8px !important;
            font-size: 10px !important;
          }
        }

        @media (max-width: 680px) {
          .presentation-side-btn {
            width: 40px;
            height: 40px;
          }

          .slide-wrapper.controls-visible {
            bottom: 84px !important;
          }

          .presentation-nav-actions .nav-btn {
            flex: 1 1 calc(50% - 8px);
            justify-content: center;
          }

          .presentation-nav-exit {
            order: 1;
          }

          .presentation-nav-center {
            order: 2;
          }

          .presentation-nav-actions {
            order: 3;
          }
        }

        .pdf-print-stack {
          background: #050008;
        }

        .pdf-page {
          min-height: 100vh;
          page-break-after: always;
          break-after: page;
        }

        .pdf-page:last-child {
          page-break-after: auto;
          break-after: auto;
        }

        @media print {
          @page {
            size: landscape;
            margin: 8mm;
          }

          :root {
            --bg: #ffffff;
            --surface: #ffffff;
            --surface2: #f7f4ff;
            --text: #1a1324;
            --muted: #5a4e73;
            --divider: rgba(90, 78, 115, 0.28);
            --accent-border: rgba(122, 44, 224, 0.35);
          }

          .presentation-container {
            position: static;
            inset: auto;
            overflow: visible;
            height: auto;
            background: #050008;
          }

          .pdf-print-stack {
            display: block !important;
          }

          .pdf-page .slide {
            position: relative;
            inset: auto;
            min-height: 100vh;
          }

          .pdf-page .slide-content {
            overflow: visible !important;
            max-height: none !important;
            background: #fff !important;
          }

          .pdf-page .orb,
          .pdf-page .slide-bg {
            display: none !important;
          }

          .pdf-page *,
          .pdf-page *::before,
          .pdf-page *::after {
            animation: none !important;
            transition: none !important;
          }

          .pdf-page .au,
          .pdf-page .au1,
          .pdf-page .au2,
          .pdf-page .au3,
          .pdf-page .au4,
          .pdf-page .ai,
          .pdf-page .al {
            opacity: 1 !important;
            transform: none !important;
          }

          .pdf-page .glow-text {
            background: none !important;
            -webkit-text-fill-color: #7a2ce0 !important;
            color: #7a2ce0 !important;
          }

          .pdf-page * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
