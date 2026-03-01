/* ===================================================================
   COMPONENTS / FIELD.JSX - Campo de Formulário Reutilizável
   =================================================================== */

export default function Field({ label, hint, children }) {
  return (
    <div className="fg">
      {label && <label className="fl">{label}</label>}
      {children}
      {hint && (
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{hint}</div>
      )}
    </div>
  );
}
