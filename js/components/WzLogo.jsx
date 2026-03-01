/* ===================================================================
   COMPONENTS / WZLOGO.JSX - Logo da Wayzen
   =================================================================== */

export default function WzLogo({ size = 40 }) {
  return (
    <div className="wz-logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src="/assets/WAYZEN LOGO DEFINITIVA.svg" alt="Wayzen" style={{ height: size, width: 'auto', display: 'block' }} />
    </div>
  );
}
