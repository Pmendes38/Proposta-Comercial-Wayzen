/* ===================================================================
   COMPONENTS / SLIDER.JSX - Input Range Customizado
   =================================================================== */

export default function Slider({ label, min, max, value, onChange, unit = '', hint }) {
  return (
    <div className="rg">
      <div className="rg-header">
        <span className="rg-label">{label}</span>
        <span className="rg-val">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && <div className="rg-hint">{hint}</div>}
    </div>
  );
}
