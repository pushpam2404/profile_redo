export function SectionLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <span className="label" data-section-label>
      ({String(n).padStart(2, '0')}) {children}
    </span>
  );
}
