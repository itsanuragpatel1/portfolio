export const SectionLabel = ({ number, text }) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="text-blue-600 font-mono text-xs font-bold tracking-[0.3em]">{number}</span>
    <div className="h-[1px] w-8 bg-neutral-200"></div>
    <span className="text-neutral-400 font-mono text-[10px] uppercase tracking-[0.3em]">{text}</span>
  </div>
);