import { describe, expect, it } from 'vitest';
import { parseFrontmatter } from '@/utils/parse-frontmatter';

describe('parseFrontmatter', () => {
  it('returns the source as content when no frontmatter is present', () => {
    const source = '# Hello\n\nBody.';
    const result = parseFrontmatter(source);
    expect(result.data).toEqual({});
    expect(result.dates).toEqual({});
    expect(result.content).toBe(source);
  });

  it('parses key/value pairs and strips them from the content', () => {
    const source = ['---', 'name: Korbi', 'headline: Engineer', '---', '', 'Body text.'].join('\n');
    const result = parseFrontmatter(source);
    expect(result.data).toEqual({ name: 'Korbi', headline: 'Engineer' });
    expect(result.content.trim()).toBe('Body text.');
  });

  it('strips matching surrounding quotes from values', () => {
    const source = ['---', "phone: '+49 172 8861529'", 'label: "Senior"', '---', 'Body.'].join(
      '\n'
    );
    const result = parseFrontmatter(source);
    expect(result.data.phone).toBe('+49 172 8861529');
    expect(result.data.label).toBe('Senior');
  });

  it('keeps the rest of a value when it contains colons', () => {
    const source = ['---', 'github: https://github.com/foo', '---', ''].join('\n');
    const result = parseFrontmatter(source);
    expect(result.data.github).toBe('https://github.com/foo');
  });

  it('parses valid ISO date metadata', () => {
    const source = ['---', 'created: 2026-05-03', 'lastEdited: 2026-05-04', '---', 'Body.'].join(
      '\n'
    );
    const result = parseFrontmatter(source);

    expect(result.dates.created?.toISOString()).toBe('2026-05-03T00:00:00.000Z');
    expect(result.dates.lastEdited?.toISOString()).toBe('2026-05-04T00:00:00.000Z');
  });

  it('ignores invalid date metadata', () => {
    const source = ['---', 'created: 2026-02-31', 'lastEdited: soon', '---', 'Body.'].join('\n');
    const result = parseFrontmatter(source);

    expect(result.dates).toEqual({ created: undefined, lastEdited: undefined });
  });
});
