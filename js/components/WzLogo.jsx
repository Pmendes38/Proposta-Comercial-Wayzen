/* ===================================================================
   COMPONENTS / WZLOGO.JSX - Logo da Wayzen
   =================================================================== */

export default function WzLogo({ size = 24 }) {
  return (
    <div className="wz-logo">
      <div className="wz-icon" style={{ width: size, height: size, borderRadius: Math.round(size * 0.25) }}>
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 14 14" fill="none">
          <path
            d="M2 4L5.5 10L7 7L8.5 10L12 4"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-h)',
          fontWeight: 800,
          fontSize: size * 0.7,
          color: 'var(--text)',
          letterSpacing: '-.03em',
        }}
      >
        Wayzen
      </span>
    </div>
  );
}
