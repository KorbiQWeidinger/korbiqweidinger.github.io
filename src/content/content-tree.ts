export interface ContentFolderNode {
  type: 'folder';
  name: string;
  children: ContentNode[];
}

export interface ContentFileNode {
  type: 'file';
  name: string;
  path: string;
}

export type ContentNode = ContentFolderNode | ContentFileNode;

export function getFirstFilePath(node: ContentNode): string | null {
  if (node.type === 'file') {
    return node.path;
  }

  for (const child of node.children) {
    const nestedPath = getFirstFilePath(child);
    if (nestedPath) {
      return nestedPath;
    }
  }

  return null;
}

export function hasFilePath(node: ContentNode, path: string): boolean {
  if (node.type === 'file') {
    return node.path === path;
  }

  return node.children.some((child) => hasFilePath(child, path));
}

export function getFolderPaths(node: ContentNode, parentPath = ''): string[] {
  if (node.type === 'file') {
    return [];
  }

  const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
  const childFolderPaths = node.children.flatMap((child) => getFolderPaths(child, currentPath));

  return [currentPath, ...childFolderPaths];
}

export function getFilenameFromPath(path: string | null): string {
  if (!path) {
    return '';
  }

  const segments = path.split('/');
  return segments.at(-1) ?? path;
}
