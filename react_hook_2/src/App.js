import { useReducer, useState, useMemo, useCallback } from 'react';
import { tasksReducer } from './tasksReducer.js';
import { AddTaskForm } from './components/AddTaskForm.jsx';
import { TaskList } from './components/TaskList.jsx';
import { useTheme } from './ThemeContext.jsx';
import { useLanguage } from './LanguageContext.jsx';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { LanguageToggle } from './components/LanguageToggle.jsx';

export default function App() {
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [filter, setFilter] = useState('all');


  const handleAdd = useCallback((text) => {
    dispatch({ type: 'add', task: { id: Date.now(), text, done: false } });
  }, []);

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'toggle', id });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'remove', id });
  }, []);

  const handleRename = useCallback((id, text) => {
    dispatch({ type: 'rename', id, text });
  }, []);

  
  const visibleTasks = useMemo(() => {
    if (filter === 'done') return tasks.filter((t) => t.done);
    if (filter === 'active') return tasks.filter((t) => !t.done);
    return tasks;
  }, [tasks, filter]);

  // Подсчёт выполненных задач и вычисление процентов (Задание 3)
  const doneCount = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);

  const donePercentage = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((doneCount / tasks.length) * 100);
  }, [tasks.length, doneCount]);


  const t = {
    ru: {
      title: 'Менеджер задач',
      all: 'Все',
      active: 'Активные',
      done: 'Готовые',
      total: 'Всего',
      completed: 'выполнено'
    },
    en: {
      title: 'Task Manager',
      all: 'All',
      active: 'Active',
      done: 'Done',
      total: 'Total',
      completed: 'completed'
    }
  }[lang];

  return (
    <div className={'app ' + theme}>
      <div className="card">
        <header className="top">
          <h1>{t.title}</h1>
          <div className="toggles">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>

        <AddTaskForm onAdd={handleAdd} />

        <div className="tabs">
          {[
            ['all', t.all],
            ['active', t.active],
            ['done', t.done],
          ].map(([key, label]) => (
            <button
              key={key}
              className={filter === key ? 'active' : ''}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="muted">
          {t.total}: {tasks.length}, {t.completed}: {doneCount} ({donePercentage}%)
        </p>

        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onRename={handleRename}
        />
      </div>
    </div>
  );
}