import { createBucketClient } from '@cosmicjs/sdk'
import { Manga, Character, Page, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getAllMangas(): Promise<Manga[]> {
  try {
    const response = await cosmic.objects.find({ type: 'mangas' }).depth(1);
    const mangas = response.objects as Manga[];
    return mangas.sort((a, b) => {
      const aNum = a.metadata?.volume_number || 0;
      const bNum = b.metadata?.volume_number || 0;
      return aNum - bNum;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch mangas');
  }
}

export async function getMangaBySlug(slug: string): Promise<Manga | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'mangas', slug }).depth(1);
    return response.object as Manga;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch manga');
  }
}

export async function getAllCharacters(): Promise<Character[]> {
  try {
    const response = await cosmic.objects.find({ type: 'characters' }).depth(1);
    return response.objects as Character[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch characters');
  }
}

export async function getCharacterBySlug(slug: string): Promise<Character | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'characters', slug }).depth(1);
    return response.object as Character;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch character');
  }
}

export async function getPagesByManga(mangaId: string): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pages', 'metadata.manga': mangaId })
      .depth(1);
    const pages = response.objects as Page[];
    return pages.sort((a, b) => {
      const aNum = a.metadata?.page_number || 0;
      const bNum = b.metadata?.page_number || 0;
      return aNum - bNum;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch pages');
  }
}

export async function getAllPages(): Promise<Page[]> {
  try {
    const response = await cosmic.objects.find({ type: 'pages' }).depth(1);
    return response.objects as Page[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch pages');
  }
}