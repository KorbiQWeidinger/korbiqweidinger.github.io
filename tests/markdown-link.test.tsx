import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { describe, expect, it } from 'vitest';
import { MarkdownLink } from '@/components/markdown/markdown-link';

function LocationProbe() {
  const location = useLocation();
  return <output data-testid='location'>{location.pathname}</output>;
}

function renderLink(href: string) {
  render(
    <MemoryRouter initialEntries={['/cv.md']}>
      <MarkdownLink href={href}>Link</MarkdownLink>
      <LocationProbe />
    </MemoryRouter>
  );
}

describe('MarkdownLink', () => {
  it('routes markdown links through the content browser', async () => {
    const user = userEvent.setup();
    renderLink('home.md');

    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toHaveAttribute('href', '#/home.md');

    await user.click(link);

    expect(screen.getByTestId('location')).toHaveTextContent('/home.md');
  });

  it('leaves root-relative assets as normal document links', () => {
    renderLink('/thesis/MT_ECHR_QA.pdf');

    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toHaveAttribute('href', '/thesis/MT_ECHR_QA.pdf');
    expect(screen.getByTestId('location')).toHaveTextContent('/cv.md');
  });

  it('does not force mail links into a new tab', () => {
    renderLink('mailto:korbi@example.com');

    const link = screen.getByRole('link', { name: 'Link' });

    expect(link).toHaveAttribute('href', 'mailto:korbi@example.com');
    expect(link).not.toHaveAttribute('target');
  });
});
