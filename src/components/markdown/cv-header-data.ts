import type { CvHeaderData } from '@/components/markdown/cv-header';

export function toCvHeaderData(data: Record<string, string>): CvHeaderData | null {
  if (!data.name || !data.headline) {
    return null;
  }
  return {
    name: data.name,
    headline: data.headline,
    avatar: data.avatar,
    location: data.location,
    email: data.email,
    phone: data.phone,
    github: data.github,
    linkedin: data.linkedin,
    website: data.website,
  };
}
