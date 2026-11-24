import { useEffect, useState } from 'react';

/** Cycles through an array of strings with a typing/erasing effect. */
export function useTypingEffect(words: string[], opts?: { typeSpeed?: number; deleteSpeed?: number; pause?: number }) {
  const { typeSpeed = 90, deleteSpeed = 45, pause = 1600 } = opts ?? {};
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}
