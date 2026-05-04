import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentType } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export interface CvHeaderData {
  name?: string;
  headline?: string;
  avatar?: string;
  location?: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

interface CvHeaderProps {
  data: CvHeaderData;
}

interface ContactLink {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  isExternal: boolean;
}

function buildContactLinks(data: CvHeaderData): ContactLink[] {
  const links: ContactLink[] = [];

  if (data.location) {
    links.push({
      href: `https://www.google.com/maps/search/${encodeURIComponent(data.location)}`,
      label: data.location,
      icon: MapPin,
      isExternal: true,
    });
  }
  if (data.email) {
    links.push({ href: `mailto:${data.email}`, label: data.email, icon: Mail, isExternal: false });
  }
  if (data.phone) {
    links.push({
      href: `tel:${data.phone.replace(/\s+/g, '')}`,
      label: data.phone,
      icon: Phone,
      isExternal: false,
    });
  }
  if (data.github) {
    links.push({
      href: data.github,
      label: data.github.replace(/^https?:\/\/(?:www\.)?github\.com\//, '').replace(/\/$/, ''),
      icon: FaGithub,
      isExternal: true,
    });
  }
  if (data.linkedin) {
    links.push({
      href: data.linkedin,
      label: 'LinkedIn',
      icon: FaLinkedin,
      isExternal: true,
    });
  }
  if (data.website) {
    links.push({
      href: data.website,
      label: data.website.replace(/^https?:\/\//, ''),
      icon: Globe,
      isExternal: true,
    });
  }

  return links;
}

export function CvHeader({ data }: CvHeaderProps) {
  const contactLinks = buildContactLinks(data);

  return (
    <header className='not-prose mb-8 flex flex-col gap-6 sm:flex-row sm:items-center'>
      {data.avatar && (
        <img
          src={data.avatar}
          alt={data.name ?? 'Avatar'}
          className='h-24 w-24 rounded-full border border-border object-cover sm:h-28 sm:w-28'
        />
      )}
      <div className='flex flex-col gap-2'>
        {data.name && (
          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{data.name}</h1>
        )}
        {data.headline && <p className='text-base text-muted-foreground'>{data.headline}</p>}
        {contactLinks.length > 0 && (
          <ul className='mt-1 flex flex-wrap gap-x-4 gap-y-1.5 text-sm'>
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className='inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary'
                  >
                    <Icon className='h-3.5 w-3.5' />
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </header>
  );
}
