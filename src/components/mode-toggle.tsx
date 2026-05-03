import { Coffee, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Theme } from '@/context/theme-context';
import { useTheme } from '@/hooks/use-theme';

const THEME_ORDER: Theme[] = ['coffee', 'light', 'dark'];

function getNextTheme(theme: Theme): Theme {
  const currentIndex = THEME_ORDER.indexOf(theme);
  return THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = getNextTheme(theme);

  return (
    <Button
      variant='toolbarIcon'
      size='iconSm'
      onClick={() => setTheme(nextTheme)}
      aria-label='Toggle theme'
    >
      {theme === 'coffee' && <Coffee className='size-3.5' />}
      {theme === 'light' && <Sun className='size-3.5' />}
      {theme === 'dark' && <Moon className='size-3.5' />}
    </Button>
  );
}
