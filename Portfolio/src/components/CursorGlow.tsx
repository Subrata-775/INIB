import { useEffect, useState } from 'react';

/** A soft glow that follows the cursor. Hidden on touch devices. */
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-200 blur-3xl transition-transform duration-200 ease-out"
      style={{
        left: pos.x,
        top: pos.y,
        background:
          'radial-gradient(circle, rgba(59,130,246,0.18), rgba(139,92,246,0.10) 40%, transparent 70%)',
      }}
    />
  );
}
