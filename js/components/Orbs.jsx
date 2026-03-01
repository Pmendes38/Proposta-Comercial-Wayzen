/* ===================================================================
   COMPONENTS / ORBS.JSX - Efeitos Visuais de Background
   =================================================================== */

export default function Orbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        className="orb"
        style={{
          width: 520,
          height: 520,
          background: 'radial-gradient(circle, rgba(148, 0, 211, .18), transparent 70%)',
          top: -120,
          right: -120,
        }}
      />
      <div
        className="orb"
        style={{
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(204, 0, 255, .10), transparent 70%)',
          bottom: 110,
          left: -60,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(100, 60, 140, .05) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 60, 140, .05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
