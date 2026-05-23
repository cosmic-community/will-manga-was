export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export type TeamType = 'Good Team' | 'Bad Team';
export type MangaStatus = 'Volume 1' | 'Volume 2' | 'Complete';

export interface Character extends CosmicObject {
  type: 'characters';
  metadata: {
    name?: string;
    description?: string;
    team?: { key: string; value: string } | string;
    character_image?: {
      url: string;
      imgix_url: string;
    };
    abilities?: string;
    fate?: string;
  };
}

export interface Manga extends CosmicObject {
  type: 'mangas';
  metadata: {
    title?: string;
    volume_number?: number;
    synopsis?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    total_pages?: number;
    status?: { key: string; value: string } | string;
    featured_characters?: Character[];
  };
}

export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    page_number?: number;
    manga?: Manga;
    page_image?: {
      url: string;
      imgix_url: string;
    };
    scene_description?: string;
    characters_in_scene?: Character[];
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}