import { Fragment } from 'react';
import { cn } from '@/utils/cn';

interface MarkdownRawProps {
  source: string;
  className?: string;
}

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

function linkify(text: string) {
  const parts = text.split(URL_PATTERN);
  return parts.map((part, index) => {
    if (URL_PATTERN.test(part)) {
      URL_PATTERN.lastIndex = 0;
      return (
        <a
          key={index}
          href={part}
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary underline underline-offset-4 hover:opacity-80'
        >
          {part}
        </a>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
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
