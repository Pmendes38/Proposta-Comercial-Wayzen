/*
  Slide com o time (hover cards) - conteúdo copiado da proposta original.
*/

import { useState } from 'react';
import SlideShell from './SlideShell';
import Icon from './Icon';
import { PLANS, SPRINTS, TEAM } from '../data';

export default function Slide4() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <SlideShell
      badge="Nosso time"
      title={<>Especialistas em cada <span className="glow-text">fase da jornada</span>.</>}
      subtitle="Cada membro tem função clara na jornada. Passe o mouse ou clique em cada perfil para saber mais."
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 16,
          marginBottom: 16,
        }}
      >
        {TEAM.map((m, i) => (
          <div
            key={i}
            className={`team-member-card ${openCard === i ? 'open' : ''}`}
            onMouseEnter={() => setOpenCard(i)}
            onMouseLeave={() => setOpenCard(null)}
            onClick={() => setOpenCard(openCard === i ? null : i)}
          >
            {/* HOVER CARD */}
            <div className="team-hover-card">
              <div className="team-photo-placeholder">
                {m.foto ? (
                  <img src={m.foto} alt={m.fotoAlt} />
                ) : (
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{m.icon}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', lineHeight: 1.5 }}>
                      Adicione uma foto<br />de {m.nome.split(' ')[0]}
                    </div>
                  </div>
                )}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-h)',
                  fontWeight: 800,
                  fontSize: 16,
                  marginBottom: 4,
                }}
              >
                {m.nome}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--accent2)',
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                {m.cargo}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
                {m.expanded}
              </div>
            </div>

            {/* CARD NORMAL */}
            <div
              className="card"
              style={{
                borderRadius: 16,
                cursor: 'pointer',
                transition: 'border-color .2s,transform .2s',
                borderColor: openCard === i ? 'var(--accent-border)' : 'var(--divider)',
                transform: openCard === i ? 'translateY(-2px)' : 'none',
                position: 'relative',
                overflow: 'hidden',
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
              <div
                style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}
              >
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
                  }}
                >
                  {m.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-h)', fontWeight: 900, fontSize: 15 }}>
                    {m.nome}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{m.cargo}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
                {m.bio}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  color: openCard === i ? 'var(--accent2)' : 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontWeight: 600,
                }}
              >
                <span>{openCard === i ? '▼' : '▶'}</span>
                <span>{openCard === i ? 'Ver menos' : 'Ver mais'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: '14px 18px',
          background: 'var(--surface)',
          border: '1px solid var(--divider)',
          borderRadius: 12,
          fontSize: 12,
          color: 'var(--muted)',
          lineHeight: 1.7,
        }}
      >
        Durante os 4 sprints, um especialista da Wayzen fica alocado dentro da sua operação
        construindo o comercial do zero. Ao final do ciclo, a Wayzen contrata e disponibiliza um
        profissional dedicado exclusivamente ao seu projeto: funcionário da Wayzen, operando na
        sua empresa. Você não precisa contratar, treinar nem arcar com encargos trabalhistas.
      </div>
    </SlideShell>
  );
}
