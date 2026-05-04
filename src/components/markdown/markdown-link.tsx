import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useNavigate } from 'react-router';

type MarkdownLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const NEW_TAB_PROTOCOLS = ['http://', 'https://'];
const PASS_THROUGH_PROTOCOLS = [...NEW_TAB_PROTOCOLS, 'mailto:', 'tel:'];

function hasPassThroughProtocol(href: string) {
  return PASS_THROUGH_PROTOCOLS.some((protocol) => href.startsWith(protocol));
}

function opensInNewTab(href: string) {
  return NEW_TAB_PROTOCOLS.some((protocol) => href.startsWith(protocol));
}

function isInPageAnchor(href: string) {
  return href.startsWith('#') && !href.startsWith('#/');
}

function isMarkdownContentHref(href: string) {
  return href.startsWith('#/') || href.replace(/[?#].*$/, '').endsWith('.md');
}

function normalizeInternalHref(href: string) {
  const stripped = href.replace(/^#\//, '').replace(/^\//, '');
  return `/${stripped}`;
}

export function MarkdownLink({ href, children, onClick, ...props }: MarkdownLinkProps) {
  const navigate = useNavigate();

  if (!href) {
    return <a {...props}>{children}</a>;
  }

  if (hasPassThroughProtocol(href)) {
    return (
      <a
        href={href}
        target={opensInNewTab(href) ? '_blank' : undefined}
        rel={opensInNewTab(href) ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (isInPageAnchor(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  if (!isMarkdownContentHref(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  const internalRoute = normalizeInternalHref(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(internalRoute);
  };

  return (
    <a href={`#${internalRoute}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
