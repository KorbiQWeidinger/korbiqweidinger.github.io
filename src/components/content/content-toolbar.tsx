import { Code, Eye, PanelLeftClose, PanelRightClose } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Surface } from '@/components/ui/surface';
import { cn } from '@/utils/cn';

export type ContentViewMode = 'preview' | 'raw';

interface ContentToolbarProps {
  filename: string;
  isSidebarOpen: boolean;
  mode: ContentViewMode;
  onModeChange: (mode: ContentViewMode) => void;
  onOpenSidebar: () => void;
  onToggleSidebar: () => void;
}

export function ContentToolbar({
  filename,
  isSidebarOpen,
  mode,
  onModeChange,
  onOpenSidebar,
  onToggleSidebar,
}: ContentToolbarProps) {
  return (
    <Surface
      asChild
      variant='toolbar'
      padding='sm'
      className='grid min-h-11 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:min-h-0 sm:grid-cols-[1fr_minmax(0,auto)_1fr] sm:px-4'
    >
      <header>
        <Button
          variant='toolbarIcon'
          size='iconSm'
          onClick={onToggleSidebar}
          aria-pressed={isSidebarOpen}
          aria-label={isSidebarOpen ? 'Collapse file explorer' : 'Expand file explorer'}
          className={cn('justify-self-start', isSidebarOpen && 'bg-accent text-accent-foreground')}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className='size-3.5' />
          ) : (
            <PanelRightClose className='size-3.5' />
          )}
        </Button>

        <Button
          variant='ghost'
          size='sm'
          onClick={onOpenSidebar}
          aria-label='Open file explorer'
          className='h-7 min-w-0 max-w-full justify-self-start px-2 font-mono text-sm text-muted-foreground hover:text-foreground sm:justify-self-center'
        >
          <span className='min-w-0 truncate'>{filename}</span>
        </Button>

        <div className='flex items-center gap-1.5 justify-self-end sm:gap-2'>
          <div
            role='group'
            aria-label='View mode'
            className='flex items-center rounded-md border border-border bg-background p-0.5'
          >
            <Button
              variant='ghost'
              size='sm'
              aria-pressed={mode === 'preview'}
              onClick={() => onModeChange('preview')}
              className='h-7 px-1.5 aria-pressed:bg-accent aria-pressed:text-accent-foreground sm:px-2'
            >
              <Eye className='size-3.5' />
              <span className='sr-only sm:not-sr-only'>Preview</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              aria-pressed={mode === 'raw'}
              onClick={() => onModeChange('raw')}
              className='h-7 px-1.5 aria-pressed:bg-accent aria-pressed:text-accent-foreground sm:px-2'
            >
              <Code className='size-3.5' />
              <span className='sr-only sm:not-sr-only'>Raw</span>
            </Button>
          </div>
          <ModeToggle />
        </div>
      </header>
    </Surface>
  );
}
