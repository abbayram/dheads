export type ObjectStatus = 'available' | 'held' | 'acquired';

export interface SculptureImage {
  alt?: string;
  url: string;
}

export interface Sculpture {
  _id: string;
  slug: string;
  code: string;
  title: string;
  year: number;
  status: ObjectStatus;
  collection: string;
  summaryDe: string;
  summaryEn: string;
  statementDe: string;
  statementEn: string;
  materialDe: string;
  materialEn: string;
  dimensions: string;
  colour: string;
  accent: string;
  variant: number;
  featured: boolean;
  images: SculptureImage[];
  mainImage: string | null;
  modelUrl: string | null;
}

export interface DickheadsEvent {
  _id: string;
  title: string;
  venue: string;
  dateLabelDe: string;
  dateLabelEn: string;
  status: 'upcoming' | 'request' | 'past';
  textDe: string;
  textEn: string;
  link: string | null;
}
