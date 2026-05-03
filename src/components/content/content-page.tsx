import { useCallback, useMemo } from 'react';
import { ContentSidebar } from '@/components/content/content-sidebar';
import { ContentToolbar } from '@/components/content/content-toolbar';
import type { ContentViewMode } from '@/components/content/content-toolbar';
import { MarkdownPreview } from '@/components/markdown/markdown-preview';
import { MarkdownRaw } from '@/components/markdown/markdown-raw';
import { Surface } from '@/components/ui/surface';
import { getFolderPaths } from '@/content/content-tree';
import { useContentBrowser } from '@/hooks/use-content-browser';
import { useLocalStorageState } from '@/hooks/use-local-storage-state';

interface ContentPageProps {
  initialFilePath: string;
}

const VIEW_MODE_STORAGE_KEY = 'content-browser:view-mode';
const SIDEBAR_OPEN_STORAGE_KEY = 'content-browser:sidebar-open';
const SIDEBAR_FOLDERS_STORAGE_KEY = 'content-browser:expanded-folders';

function isContentViewMode(value: unknown): value is ContentViewMode {
  return value === 'preview' || value === 'raw';
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isStringArrayOrNull(value: unknown): value is string[] | null {
  return (
    value === null || (Array.isArray(value) && value.every((item) => typeof item === 'string'))
  );
}

export function ContentPage({ initialFilePath }: ContentPageProps) {
  const [mode, setMode] = useLocalStorageState<ContentViewMode>(
    VIEW_MODE_STORAGE_KEY,
    'preview',
    isContentViewMode
  );
  const [sidebarOpen, setSidebarOpen] = useLocalStorageState(
    SIDEBAR_OPEN_STORAGE_KEY,
    true,
    isBoolean
  );
  const [expandedFolderPaths, setExpandedFolderPaths] = useLocalStorageState<string[] | null>(
    SIDEBAR_FOLDERS_STORAGE_KEY,
    null,
    isStringArrayOrNull
  );

  const {
    filename,
    manifest,
    manifestError,
    selectedPath,
    selectPath,
    source,
    sourceError,
    isLoadingSource,
  } = useContentBrowser({ initialFilePath });

  const defaultExpandedFolderPaths = useMemo(
    () => (manifest ? manifest.children.flatMap((node) => getFolderPaths(node)) : []),
    [manifest]
  );
  const visibleExpandedFolderPaths = expandedFolderPaths ?? defaultExpandedFolderPaths;

  const handleToggleFolder = useCallback(
    (folderPath: string, isOpen: boolean) => {
      setExpandedFolderPaths((currentFolderPaths) => {
        const nextFolderPaths = new Set(currentFolderPaths ?? defaultExpandedFolderPaths);

        if (isOpen) {
          nextFolderPaths.add(folderPath);
        } else {
          nextFolderPaths.delete(folderPath);
        }

        return [...nextFolderPaths].sort();
      });
    },
    [defaultExpandedFolderPaths, setExpandedFolderPaths]
  );

  let content = <MarkdownRaw source={source} />;

  if (isLoadingSource) {
    content = <></>;
  } else if (sourceError) {
    content = <p className='text-sm text-destructive'>{sourceError}</p>;
  } else if (mode === 'preview') {
    content = <MarkdownPreview source={source} />;
  }

  return (
    <div className='flex min-h-screen flex-col gap-2 bg-background p-2 text-foreground sm:gap-3 sm:p-3'>
      <ContentToolbar
        filename={filename}
        isSidebarOpen={sidebarOpen}
        mode={mode}
        onModeChange={setMode}
        onOpenSidebar={() => setSidebarOpen(true)}
        onToggleSidebar={() => setSidebarOpen((isOpen) => !isOpen)}
      />
      <div className='flex min-h-0 flex-1 flex-col gap-2 overflow-hidden sm:gap-3 lg:flex-row'>
        <ContentSidebar
          isOpen={sidebarOpen}
          manifest={manifest}
          manifestError={manifestError}
          selectedPath={selectedPath}
          expandedFolderPaths={visibleExpandedFolderPaths}
          onSelectPath={selectPath}
          onToggleFolder={handleToggleFolder}
        />

        <Surface
          asChild
          variant='content'
          padding='content'
          className='w-full flex-1 overflow-y-auto'
        >
          <main>{content}</main>
        </Surface>
      </div>
    </div>
  );
}
