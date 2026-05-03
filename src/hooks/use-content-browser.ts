import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  type ContentFolderNode,
  getFilenameFromPath,
  getFirstFilePath,
  hasFilePath,
} from '@/content/content-tree';

const CONTENTS_BASE_PATH = '/contents';
const CONTENTS_MANIFEST_PATH = `${CONTENTS_BASE_PATH}/index.json`;

interface UseContentBrowserOptions {
  initialFilePath: string;
}

interface SourceResult {
  path: string | null;
  source: string;
  error: string | null;
}

function getFilePathFromBrowserPath(pathname: string) {
  // HashRouter exposes "/#/notes/about.md" as the route pathname "/notes/about.md".
  const normalizedPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  if (!normalizedPath) {
    return null;
  }

  try {
    return decodeURI(normalizedPath);
  } catch {
    return normalizedPath;
  }
}

function getBrowserPathFromFilePath(path: string) {
  return `/${path.split('/').map(encodeURIComponent).join('/')}`;
}

export function useContentBrowser({ initialFilePath }: UseContentBrowserOptions) {
  const location = useLocation();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState<ContentFolderNode | null>(null);
  const [manifestError, setManifestError] = useState<string | null>(null);
  const [sourceResult, setSourceResult] = useState<SourceResult>({
    path: null,
    source: '',
    error: null,
  });

  const browserFilePath = useMemo(
    () => getFilePathFromBrowserPath(location.pathname),
    [location.pathname]
  );

  const selectedPath = useMemo(() => {
    if (!manifest) {
      return null;
    }

    if (browserFilePath && hasFilePath(manifest, browserFilePath)) {
      return browserFilePath;
    }

    if (hasFilePath(manifest, initialFilePath)) {
      return initialFilePath;
    }

    return getFirstFilePath(manifest);
  }, [browserFilePath, initialFilePath, manifest]);

  const filename = useMemo(() => getFilenameFromPath(selectedPath), [selectedPath]);
  const emptySelectionError = manifest && !selectedPath ? 'No markdown file selected.' : null;
  // Keep the loaded source keyed by path so the old file never flashes while a new one loads.
  const source = selectedPath === sourceResult.path ? sourceResult.source : '';
  const sourceError =
    emptySelectionError ?? (selectedPath === sourceResult.path ? sourceResult.error : null);
  const isLoadingSource = emptySelectionError
    ? false
    : !sourceResult.error &&
      (!manifest || (Boolean(selectedPath) && selectedPath !== sourceResult.path));

  const selectPath = useCallback(
    (path: string) => {
      navigate(getBrowserPathFromFilePath(path));
    },
    [navigate]
  );

  useEffect(() => {
    let active = true;

    fetch(CONTENTS_MANIFEST_PATH)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Could not load content manifest (${response.status})`);
        }
        return (await response.json()) as ContentFolderNode;
      })
      .then((data) => {
        if (!active) {
          return;
        }
        setManifest(data);
        setManifestError(null);
      })
      .catch((error) => {
        if (!active) {
          return;
        }
        const errorMessage =
          error instanceof Error ? error.message : 'Could not load content manifest.';

        setManifestError(errorMessage);
        setSourceResult({
          path: null,
          source: '',
          error: errorMessage,
        });
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!manifest || !selectedPath) {
      return;
    }

    if (browserFilePath !== selectedPath) {
      navigate(getBrowserPathFromFilePath(selectedPath), {
        replace: true,
      });
    }
  }, [browserFilePath, manifest, navigate, selectedPath]);

  useEffect(() => {
    if (!manifest || !selectedPath) {
      return;
    }

    let active = true;

    fetch(`${CONTENTS_BASE_PATH}/${selectedPath}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load ${selectedPath} (${response.status})`);
        }
        return response.text();
      })
      .then((markdownSource) => {
        if (!active) {
          return;
        }
        setSourceResult({
          path: selectedPath,
          source: markdownSource,
          error: null,
        });
      })
      .catch((error) => {
        if (!active) {
          return;
        }
        setSourceResult({
          path: selectedPath,
          source: '',
          error: error instanceof Error ? error.message : 'Could not load markdown source.',
        });
      });

    return () => {
      active = false;
    };
  }, [manifest, selectedPath]);

  return {
    filename,
    manifest,
    manifestError,
    selectedPath,
    selectPath,
    source,
    sourceError,
    isLoadingSource,
  };
}
