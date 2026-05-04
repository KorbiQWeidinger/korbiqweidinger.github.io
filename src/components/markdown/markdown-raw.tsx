import { cn } from '@/utils/cn';
import { MarkdownLink } from '@/components/markdown/markdown-link';

interface MarkdownRawProps {
  source: string;
  className?: string;
}

const MARKDOWN_LINK_PATTERN = /\[([^\]\n]+)]\(([^)\s]+)(?:\s+["'][^)]*["'])?\)/g;

function linkify(text: string) {
  const parts = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  MARKDOWN_LINK_PATTERN.lastIndex = 0;

  while ((match = MARKDOWN_LINK_PATTERN.exec(text))) {
    const [rawLink, label, href] = match;
    const startsAsImage = match.index > 0 && text[match.index - 1] === '!';

    if (startsAsImage) {
      continue;
    }

    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <MarkdownLink
        key={`markdown-link-${match.index}-${rawLink.length}`}
        href={href}
        className='text-primary underline underline-offset-4 hover:opacity-80'
      >
        {label}
      </MarkdownLink>
    );
    lastIndex = match.index + rawLink.length;
  }

  parts.push(text.slice(lastIndex));

  return parts;
}

export function MarkdownRaw({ source, className }: MarkdownRawProps) {
  return (
    <pre
      className={cn(
        'whitespace-pre-wrap wrap-break-word font-mono text-sm leading-relaxed text-foreground',
        className
      )}
    >
      {linkify(source)}
    </pre>
  );
}
