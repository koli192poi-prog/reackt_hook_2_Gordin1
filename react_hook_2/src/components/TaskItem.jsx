import { memo } from 'react';
import { useLanguage } from '../LanguageContext.jsx';

export const TaskItem = memo(function TaskItem({ task, onToggle, onRemove, onRename }) {
  const { lang } = useLanguage();
  
  console.log('Рисуем задачу:', task.text);

  const handleRename = () => {
    const msg = lang === 'ru' ? 'Введите новое название задачи:' : 'Enter new task name:';
    const newText = prompt(msg, task.text);
    if (newText && newText.trim()) {
      onRename(task.id, newText.trim());
    }
  };

  return (
    <li className={task.done ? 'done' : ''}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={handleRename} className="edit-btn">✏️</button>
      <button onClick={() => onRemove(task.id)}>×</button>
    </li>
  );
});
