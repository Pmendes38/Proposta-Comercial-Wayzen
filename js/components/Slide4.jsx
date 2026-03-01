/*
  Slide do time com painel lateral de detalhes.
  Evita card flutuante cortado no topo.
*/

import { useMemo, useState } from 'react';
import SlideShell from './SlideShell';
import { TEAM } from '../data';

export default function Slide4() {
  const [openCard, setOpenCard] = useState(null);
  const activeMember = useMemo(() => (openCard === null ? null : TEAM[openCard]), [openCard]);

  return (
    <SlideShell
      badge="Nosso time"
      title={<>Especialistas em cada <span className="glow-text">fase da jornada</span>.</>}
      subtitle="Cada membro tem funcao clara na jornada. Clique no perfil para ver os detalhes."
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(12px, 2vw, 20px)',
          marginBottom: 'clamp(12px, 2vw, 20px)',
        }}
      >
        {TEAM.map((m, i) => {
          const isSelected = openCard === i;
          return (
            <button
              key={m.nome}
              type="button"
              className="card"
              onClick={() => setOpenCard((prev) => (prev === i ? null : i))}
              style={{
                borderRadius: 16,
                textAlign: 'left',
                transition: 'border-color .2s, transform .2s',
                borderColor: isSelected ? 'var(--accent-border)' : 'var(--divider)',
                transform: isSelected ? 'translateY(-2px)' : 'none',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--surface)',
                color: 'var(--text)',
                borderWidth: 1,
                borderStyle: 'solid',
                appearance: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(400px 200px at 20% 0%,rgba(148,0,211,.10),transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(148,0,211,.14)',
                      border: '1px solid var(--accent-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 15 }}>{m.nome}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{m.cargo}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{m.bio}</div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 11,
                    color: isSelected ? 'var(--accent2)' : 'var(--muted)',
                    fontWeight: 600,
                  }}
                >
                  {isSelected ? 'Perfil selecionado' : 'Clique para ver detalhes'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeMember && (
        <div
          className="card"
          style={{
            borderRadius: 18,
            padding: 'clamp(14px, 2vw, 22px)',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(14px, 2vw, 24px)',
              alignItems: 'stretch',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 22, marginBottom: 6 }}>
                {activeMember.nome}
              </div>
              <div style={{ fontSize: 12, color: 'var(--accent2)', marginBottom: 12, fontWeight: 700 }}>
                {activeMember.cargo}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
                {activeMember.expanded}
              </div>
            </div>

            <div
              className="team-photo-placeholder"
              style={{
                marginBottom: 0,
                minHeight: 240,
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              {activeMember.foto ? (
                <img
                  src={activeMember.foto}
                  alt={activeMember.fotoAlt || activeMember.nome}
                  style={{ objectFit: 'contain', padding: 8 }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: 16 }}>
                  <div style={{ fontSize: 46, marginBottom: 10 }}>{activeMember.icon}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>
                    Adicione uma foto de {activeMember.nome.split(' ')[0]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          padding: '14px 18px',
          background: 'var(--surface)',
          border: '1px solid var(--divider)',
          borderRadius: 12,
          fontSize: 12,
          color: 'var(--muted)',
          lineHeight: 1.7,
          textAlign: 'left',
        }}
      >
        Durante os 4 sprints, um especialista da Wayzen fica alocado dentro da sua operacao
        construindo o comercial do zero. Ao final do ciclo, a Wayzen contrata e disponibiliza um
        profissional dedicado exclusivamente ao seu projeto: funcionario da Wayzen, operando na
        sua empresa. Voce nao precisa contratar, treinar nem arcar com encargos trabalhistas.
      </div>
    </SlideShell>
  );
}
