import type { MarkdownDates as MarkdownDatesData } from '@/utils/parse-frontmatter';

interface MarkdownDatesProps {
  dates: MarkdownDatesData;
}

const DATE_FORMATTER = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});

function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}

export function MarkdownDates({ dates }: MarkdownDatesProps) {
  const items = [
    dates.created ? `Created ${formatDate(dates.created)}` : null,
    dates.lastEdited ? `Edited ${formatDate(dates.lastEdited)}` : null,
  ].filter(Boolean);

  if (items.length === 0) {
    return null;
  }

  return (
    <p className='not-prose mb-6 text-xs font-medium uppercase text-muted-foreground'>
      {items.join(' · ')}
    </p>
  );
}
