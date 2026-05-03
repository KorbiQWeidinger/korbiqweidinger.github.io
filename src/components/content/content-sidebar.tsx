import { type ContentFolderNode } from '@/content/content-tree';
import { ContentSidebarTree } from '@/components/content/content-sidebar-tree';
import { Surface } from '@/components/ui/surface';
import { cn } from '@/utils/cn';

interface ContentSidebarProps {
  isOpen: boolean;
  manifest: ContentFolderNode | null;
  manifestError: string | null;
  selectedPath: string | null;
  expandedFolderPaths: string[];
  onSelectPath: (path: string) => void;
  onToggleFolder: (folderPath: string, isOpen: boolean) => void;
}

export function ContentSidebar({
  isOpen,
  manifest,
  manifestError,
  selectedPath,
  expandedFolderPaths,
  onSelectPath,
  onToggleFolder,
}: ContentSidebarProps) {
  if (!isOpen) {
    return null;
  }

  let sidebarContent = <p className='text-sm text-muted-foreground'>Loading folders...</p>;

  if (manifestError) {
    sidebarContent = <p className='text-sm text-destructive'>{manifestError}</p>;
  } else if (manifest) {
    sidebarContent = (
      <ContentSidebarTree
        nodes={manifest.children}
        selectedPath={selectedPath}
        expandedFolderPaths={expandedFolderPaths}
        onSelect={onSelectPath}
        onToggleFolder={onToggleFolder}
      />
    );
  }

  return (
    <Surface
      asChild
      variant='panel'
      padding='none'
      className={cn(
        'w-full min-w-0 overflow-hidden transition-[width] duration-200 ease-out lg:w-72 lg:min-w-72 2xl:w-80 2xl:min-w-80'
      )}
    >
      <aside>
        <div className='h-full overflow-y-auto p-4'>{sidebarContent}</div>
      </aside>
    </Surface>
  );
}
