import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CvHeader } from '@/components/markdown/cv-header';

describe('CvHeader', () => {
  it('uses compact labels for GitHub and LinkedIn profile links', () => {
    render(
      <CvHeader
        data={{
          name: 'Korbi',
          headline: 'Engineer',
          github: 'https://github.com/KorbiQWeidinger',
          linkedin: 'https://de.linkedin.com/in/korbinian-weidinger-524b63229',
        }}
      />
    );

    expect(screen.getByRole('link', { name: /KorbiQWeidinger/ })).toHaveAttribute(
      'href',
      'https://github.com/KorbiQWeidinger'
    );
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
      'href',
      'https://de.linkedin.com/in/korbinian-weidinger-524b63229'
    );
    expect(screen.queryByText('github.com/KorbiQWeidinger')).not.toBeInTheDocument();
    expect(
      screen.queryByText('de.linkedin.com/in/korbinian-weidinger-524b63229')
    ).not.toBeInTheDocument();
  });
});
