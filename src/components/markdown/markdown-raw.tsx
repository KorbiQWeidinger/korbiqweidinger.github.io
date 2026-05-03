import { cn } from '@/utils/cn';

interface MarkdownRawProps {
  source: string;
  className?: string;
}

const URL_SPLIT_PATTERN = /(https?:\/\/[^\s)]+)/g;
const URL_TEST_PATTERN = /^https?:\/\/[^\s)]+$/;

function linkify(text: string) {
  return text.split(URL_SPLIT_PATTERN).map((part, index) => {
    if (!URL_TEST_PATTERN.test(part)) {
      return part;
    }
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
