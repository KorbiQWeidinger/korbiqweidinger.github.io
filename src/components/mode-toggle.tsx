import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='toolbarIcon'
      size='iconSm'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label='Toggle theme'
    >
      <Sun className='size-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute size-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
    </Button>
  );
}
