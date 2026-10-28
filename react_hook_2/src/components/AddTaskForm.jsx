import { useId, useRef, useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext.jsx';

export function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const inputId = useId();
  const { lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    onAdd(clean);
    setText('');
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr">
        {lang === 'ru' ? 'Новая задача' : 'New task'}
      </label>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={lang === 'ru' ? 'Новая задача' : 'New task'}
      />
      <button>{lang === 'ru' ? 'Добавить' : 'Add'}</button>
    </form>
  );
}
