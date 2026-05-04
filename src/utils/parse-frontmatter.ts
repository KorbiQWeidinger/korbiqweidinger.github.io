export interface ParsedMarkdown {
  data: Record<string, string>;
  dates: MarkdownDates;
  content: string;
}

export interface MarkdownDates {
  created?: Date;
  lastEdited?: Date;
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function unquote(value: string) {
  if (value.length >= 2) {
    const first = value[0];
    const last = value[value.length - 1];
    if ((first === '"' || first === "'") && first === last) {
      return value.slice(1, -1);
    }
  }
  return value;
}

function parseBlock(block: string): Record<string, string> {
  const data: Record<string, string> = {};
  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) {
      continue;
    }
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    if (key) {
      data[key] = unquote(value);
    }
  }
  return data;
}

function parseIsoDate(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  const match = value.match(ISO_DATE_PATTERN);
  if (!match) {
    return undefined;
  }

  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  if (
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() !== Number(month) - 1 ||
    date.getUTCDate() !== Number(day)
  ) {
    return undefined;
  }

  return date;
}

function parseDates(data: Record<string, string>): MarkdownDates {
  return {
    created: parseIsoDate(data.created),
    lastEdited: parseIsoDate(data.lastEdited),
  };
}

export function parseFrontmatter(source: string): ParsedMarkdown {
  const match = source.match(FRONTMATTER_PATTERN);
  if (!match) {
    return { data: {}, dates: {}, content: source };
  }
  const data = parseBlock(match[1]);
  return {
    data,
    dates: parseDates(data),
    content: source.slice(match[0].length),
  };
}
