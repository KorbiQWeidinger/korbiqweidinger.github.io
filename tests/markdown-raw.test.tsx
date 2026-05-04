import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { MarkdownRaw } from '@/components/markdown/markdown-raw';

function renderRaw(source: string) {
  render(
    <MemoryRouter>
      <MarkdownRaw source={source} />
    </MemoryRouter>
  );
}

describe('MarkdownRaw', () => {
  it('renders inline markdown links as preview-style link labels', () => {
    renderRaw(
      ['## Links', '', '- [CV](cv.md)', '- [GitHub](https://github.com/KorbiQWeidinger)'].join('\n')
    );

    expect(screen.getByText((_content, element) => element?.tagName === 'PRE')).toHaveTextContent(
      '## Links'
    );
    expect(screen.getByRole('link', { name: 'CV' })).toHaveAttribute('href', '#/cv.md');
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/KorbiQWeidinger'
    );
    expect(screen.queryByText('[CV](cv.md)')).not.toBeInTheDocument();
    expect(
      screen.queryByText('[GitHub](https://github.com/KorbiQWeidinger)')
    ).not.toBeInTheDocument();
  });

  it('leaves bare urls as raw text', () => {
    renderRaw('https://github.com/KorbiQWeidinger');

    expect(screen.getByText('https://github.com/KorbiQWeidinger')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
