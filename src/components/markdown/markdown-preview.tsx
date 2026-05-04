import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CvHeader } from '@/components/markdown/cv-header';
import { toCvHeaderData } from '@/components/markdown/cv-header-data';
import { MarkdownDates } from '@/components/markdown/markdown-dates';
import { MarkdownLink } from '@/components/markdown/markdown-link';
import { parseFrontmatter } from '@/utils/parse-frontmatter';
import { cn } from '@/utils/cn';

interface MarkdownPreviewProps {
  source: string;
  className?: string;
}

export function MarkdownPreview({ source, className }: MarkdownPreviewProps) {
  const { data, dates, content } = useMemo(() => parseFrontmatter(source), [source]);
  const cvHeaderData = useMemo(() => toCvHeaderData(data), [data]);

  return (
    <article
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        'prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:underline',
        className
      )}
    >
      {cvHeaderData && <CvHeader data={cvHeaderData} />}
      <MarkdownDates dates={dates} />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: MarkdownLink,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
