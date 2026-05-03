import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/context/theme-provider';

describe('ModeToggle', () => {
  it('cycles through coffee, light, and dark themes', async () => {
    const user = userEvent.setup();
    const root = window.document.documentElement;

    root.classList.remove('coffee', 'light', 'dark');
    localStorage.removeItem('vite-ui-theme');

    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>
    );

    const themeButton = screen.getByRole('button', { name: 'Toggle theme' });

    expect(root).toHaveClass('coffee');

    await user.click(themeButton);
    expect(root).toHaveClass('light');
    expect(localStorage.getItem('vite-ui-theme')).toBe('light');

    await user.click(themeButton);
    expect(root).toHaveClass('dark');
    expect(localStorage.getItem('vite-ui-theme')).toBe('dark');

    await user.click(themeButton);
    expect(root).toHaveClass('coffee');
    expect(localStorage.getItem('vite-ui-theme')).toBe('coffee');
  });
});
