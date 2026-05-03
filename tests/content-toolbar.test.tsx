import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContentSidebar } from '@/components/content/content-sidebar';
import { ContentToolbar } from '@/components/content/content-toolbar';
import { getFilenameFromPath } from '@/content/content-tree';

function renderToolbar(overrides: Partial<React.ComponentProps<typeof ContentToolbar>> = {}) {
  const props = {
    filename: 'home.md',
    isSidebarOpen: true,
    mode: 'preview' as const,
    onModeChange: vi.fn(),
    onOpenSidebar: vi.fn(),
    onToggleSidebar: vi.fn(),
    ...overrides,
  };

  render(<ContentToolbar {...props} />);

  return props;
}

describe('ContentToolbar', () => {
  it('uses the filename button only to open the sidebar', async () => {
    const user = userEvent.setup();
    const props = renderToolbar();

    await user.click(screen.getByRole('button', { name: 'Open file explorer' }));

    expect(props.onOpenSidebar).toHaveBeenCalledOnce();
    expect(props.onToggleSidebar).not.toHaveBeenCalled();
  });

  it('uses the sidebar icon button to toggle the sidebar', async () => {
    const user = userEvent.setup();
    const props = renderToolbar();

    await user.click(screen.getByRole('button', { name: 'Collapse file explorer' }));

    expect(props.onToggleSidebar).toHaveBeenCalledOnce();
    expect(props.onOpenSidebar).not.toHaveBeenCalled();
  });

  it('uses the same explicit hover treatment for standalone toolbar icon buttons', () => {
    renderToolbar({ isSidebarOpen: false });

    const sidebarButton = screen.getByRole('button', { name: 'Expand file explorer' });
    const themeButton = screen.getByRole('button', { name: 'Toggle theme' });

    expect(sidebarButton).toHaveClass(
      'border',
      'border-border',
      'bg-transparent',
      'text-muted-foreground',
      'hover:bg-accent',
      'hover:text-foreground',
      'dark:hover:bg-accent'
    );
    expect(themeButton).toHaveClass(
      'border',
      'border-border',
      'bg-transparent',
      'text-muted-foreground',
      'hover:bg-accent',
      'hover:text-foreground',
      'dark:hover:bg-accent'
    );
    expect(sidebarButton).not.toHaveClass('dark:hover:bg-accent/50');
    expect(themeButton).not.toHaveClass('dark:hover:bg-accent/50');
    expect(sidebarButton).not.toHaveClass('bg-background');
    expect(themeButton).not.toHaveClass('bg-background');
  });

  it('hides both view mode labels on mobile', () => {
    renderToolbar();

    expect(screen.getByText('Preview')).toHaveClass('sr-only', 'sm:not-sr-only');
    expect(screen.getByText('Raw')).toHaveClass('sr-only', 'sm:not-sr-only');
  });

  it('keeps the view mode controls wired to mode changes', async () => {
    const user = userEvent.setup();
    const props = renderToolbar();

    await user.click(screen.getByRole('button', { name: 'Raw' }));

    expect(props.onModeChange).toHaveBeenCalledWith('raw');
  });
});

describe('content filenames', () => {
  it('uses an empty filename while no content file is selected yet', () => {
    expect(getFilenameFromPath(null)).toBe('');
  });
});

describe('ContentSidebar', () => {
  it('renders as a mobile-visible panel when open', () => {
    const { container } = render(
      <ContentSidebar
        isOpen
        manifest={null}
        manifestError={null}
        selectedPath={null}
        expandedFolderPaths={[]}
        onSelectPath={vi.fn()}
        onToggleFolder={vi.fn()}
      />
    );

    const sidebar = container.querySelector('aside');

    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass('w-full');
    expect(sidebar).not.toHaveClass('hidden');
  });
});
