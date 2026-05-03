import { Code, Eye, PanelLeftClose, PanelRightClose } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Surface } from '@/components/ui/surface';
import { cn } from '@/utils/cn';

export type ContentViewMode = 'preview' | 'raw';

const toolbarIconButtonClass =
  'h-7 w-7 border border-border bg-transparent px-0 text-muted-foreground hover:bg-accent hover:text-foreground dark:hover:bg-accent';

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
      className='relative grid min-h-11 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:min-h-0 sm:px-4'
    >
      <header>
        <Button
          variant='ghost'
          size='sm'
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Collapse file explorer' : 'Expand file explorer'}
          className={cn(
            'z-10',
            toolbarIconButtonClass,
            isSidebarOpen && 'bg-accent text-accent-foreground'
          )}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className='size-3.5' />
          ) : (
            <PanelRightClose className='size-3.5' />
          )}
        </Button>

        <div className='pointer-events-none absolute left-1/2 top-1/2 z-0 flex max-w-[calc(100%-13rem)] -translate-x-1/2 -translate-y-1/2 justify-center sm:max-w-[calc(100%-22rem)]'>
          <Button
            variant='ghost'
            size='sm'
            onClick={onOpenSidebar}
            aria-label='Open file explorer'
            className='pointer-events-auto h-7 min-w-0 max-w-full px-2 font-mono text-sm text-muted-foreground hover:text-foreground'
          >
            <span className='min-w-0 truncate'>{filename}</span>
          </Button>
        </div>

        <div className='z-10 col-start-3 flex items-center gap-1.5 sm:gap-2'>
          <div
            role='group'
            aria-label='View mode'
            className='flex items-center rounded-md border border-border bg-background p-0.5'
          >
            <Button
              variant='ghost'
              size='sm'
              aria-label='Preview'
              aria-pressed={mode === 'preview'}
              onClick={() => onModeChange('preview')}
              className={cn(
                'h-7 px-1.5 sm:px-2',
                mode === 'preview' && 'bg-accent text-accent-foreground'
              )}
            >
              <Eye className='size-3.5' />
              <span className='hidden sm:inline'>Preview</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              aria-label='Raw'
              aria-pressed={mode === 'raw'}
              onClick={() => onModeChange('raw')}
              className={cn(
                'h-7 px-1.5 sm:px-2',
                mode === 'raw' && 'bg-accent text-accent-foreground'
              )}
            >
              <Code className='size-3.5' />
              <span className='hidden sm:inline'>Raw</span>
            </Button>
          </div>
          <ModeToggle className={toolbarIconButtonClass} />
        </div>
      </header>
    </Surface>
  );
}
