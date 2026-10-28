export function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'add': {
      return [...tasks, action.task];
    }
    case 'toggle': {
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );
    }
    case 'remove': {
      return tasks.filter((task) => task.id !== action.id);
    }
    case 'clearDone': {
      return tasks.filter((task) => !task.done);
    }
    case 'clearAll': {
      return [];
    }
    case 'addMany': {
      return [...tasks, ...action.tasks];
    }
    case 'rename': {
      return tasks.map((task) =>
        task.id === action.id ? { ...task, text: action.text } : task
      );
    }
    default: {
      throw new Error('Неизвестное действие: ' + action.type);
    }
  }
}
