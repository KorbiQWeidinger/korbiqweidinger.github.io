import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { MarkdownPreview } from '@/components/markdown/markdown-preview';

function renderPreview(source: string) {
  render(
    <MemoryRouter>
      <MarkdownPreview source={source} />
    </MemoryRouter>
  );
}

describe('MarkdownPreview', () => {
  it('renders parsed created and last edited metadata', () => {
    renderPreview(
      ['---', 'created: 2026-05-03', 'lastEdited: 2026-05-04', '---', '# Hello'].join('\n')
    );

    expect(screen.getByText('Created May 3, 2026 · Edited May 4, 2026')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument();
  });
});
