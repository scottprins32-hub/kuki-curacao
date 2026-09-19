/** The white sticker tag that sits on every photo — the drop's label, in Kuki's caption voice. */
export default function Tag({ top, big, peel = false, className = "" }: { top: string; big: string; peel?: boolean; className?: string }) {
  return (
    <div className={`tag ${peel ? "peel" : ""} ${className}`} aria-hidden="true">
      <span className="t">{top}</span>
      <span className="b">{big}</span>
    </div>
  );
}
