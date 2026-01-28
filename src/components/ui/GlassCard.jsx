// src/components/ui/GlassCard.jsx
export const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-neutral-200/50 ${className}`}>
    {children}
  </div>
);
