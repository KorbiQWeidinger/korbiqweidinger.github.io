import { FileDown, Folder, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ContentNode } from '@/content/content-tree';
import { cn } from '@/utils/cn';

interface ContentSidebarTreeProps {
  nodes: ContentNode[];
  selectedPath: string | null;
  expandedFolderPaths: string[];
  onSelect: (path: string) => void;
  onToggleFolder: (folderPath: string, isOpen: boolean) => void;
  depth?: number;
  parentPath?: string;
}

export function ContentSidebarTree({
  nodes,
  selectedPath,
  expandedFolderPaths,
  onSelect,
  onToggleFolder,
  depth = 0,
  parentPath = '',
}: ContentSidebarTreeProps) {
  return (
    <ul className='space-y-1'>
      {nodes.map((node) => {
        if (node.type === 'folder') {
          const folderPath = parentPath ? `${parentPath}/${node.name}` : node.name;
          const isOpen = expandedFolderPaths.includes(folderPath);

          return (
            <li key={folderPath}>
              <details
                open={isOpen}
                className='group'
                onToggle={(event) => onToggleFolder(folderPath, event.currentTarget.open)}
              >
                <summary className='flex cursor-pointer list-none items-center gap-2 rounded px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground'>
                  <Folder className='size-4 group-open:hidden' />
                  <FolderOpen className='hidden size-4 group-open:block' />
                  <span>{node.name}</span>
                </summary>
                <div className='pl-3 pt-1'>
                  <ContentSidebarTree
                    nodes={node.children}
                    selectedPath={selectedPath}
                    expandedFolderPaths={expandedFolderPaths}
                    onSelect={onSelect}
                    onToggleFolder={onToggleFolder}
                    depth={depth + 1}
                    parentPath={folderPath}
                  />
                </div>
              </details>
            </li>
          );
        }

        return (
          <li key={node.path}>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => onSelect(node.path)}
              className={cn(
                'h-auto w-full justify-start px-2 py-1.5 text-left font-mono text-sm',
                selectedPath === node.path ? 'bg-accent text-accent-foreground' : 'text-foreground'
              )}
            >
              <FileDown className='size-4 shrink-0' />
              <span className='truncate'>{node.name}</span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
