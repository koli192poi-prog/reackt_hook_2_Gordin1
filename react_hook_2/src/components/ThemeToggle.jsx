import { useTheme } from '../ThemeContext.jsx';
import { useLanguage } from '../LanguageContext.jsx';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { lang } = useLanguage();

  const labels = {
    ru: { light: 'Тёмная', dark: 'Светлая' },
    en: { light: 'Dark', dark: 'Light' }
  };

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {labels[lang][theme]}
    </button>
  );
}
