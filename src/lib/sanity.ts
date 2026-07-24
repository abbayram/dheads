import { createClient } from '@sanity/client';
import { fallbackSculptures } from '../data/sculptures.js';
import { fallbackEvents } from '../data/events.js';
import type { DickheadsEvent, Sculpture } from '../types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-07-01',
      useCdn: true,
      perspective: 'published'
    })
  : null;

const sculptureQuery = `*[_type == "sculpture"] | order(orderRank asc, _createdAt desc) {
  _id,
  "slug": slug.current,
  code,
  title,
  year,
  status,
  collection,
  summaryDe,
  summaryEn,
  statementDe,
  statementEn,
  materialDe,
  materialEn,
  dimensions,
  colour,
  accent,
  variant,
  featured,
  "mainImage": mainImage.asset->url,
  "images": gallery[]{
    alt,
    "url": asset->url
  },
  "modelUrl": modelGlb.asset->url
}`;

const eventQuery = `*[_type == "event"] | order(sortDate asc, _createdAt desc) {
  _id,
  title,
  venue,
  dateLabelDe,
  dateLabelEn,
  status,
  textDe,
  textEn,
  link
}`;

const localSculptures = fallbackSculptures as unknown as Sculpture[];
const localEvents = fallbackEvents as unknown as DickheadsEvent[];

function completeSculpture(item: Partial<Sculpture>, index: number): Sculpture {
  const fallback = localSculptures[index % localSculptures.length];
  return {
    ...fallback,
    ...item,
    colour: item.colour || fallback.colour,
    accent: item.accent || fallback.accent,
    variant: item.variant || fallback.variant,
    images: item.images || []
  };
}

export async function getSculptures(): Promise<Sculpture[]> {
  if (!client) return localSculptures;

  try {
    const items = await client.fetch<Sculpture[]>(sculptureQuery);
    return items?.length ? items.map(completeSculpture) : localSculptures;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[dickheads] Sanity unavailable; using local objects.', message);
    return localSculptures;
  }
}

export async function getEvents(): Promise<DickheadsEvent[]> {
  if (!client) return localEvents;

  try {
    const items = await client.fetch<DickheadsEvent[]>(eventQuery);
    return items?.length ? items : localEvents;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[dickheads] Sanity unavailable; using local events.', message);
    return localEvents;
  }
}

export async function getSculpture(slug: string): Promise<Sculpture | undefined> {
  const items = await getSculptures();
  return items.find((item) => item.slug === slug);
}

export const cmsConnected = Boolean(client);
