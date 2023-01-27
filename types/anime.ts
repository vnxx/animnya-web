export type AnimeType = {
  id: number;
  title: string;
  slug: string;
  synopsis: string;
  cover_url: string;
  trailer_url: string;
  total_episodes: string;
  studio: string;
  season: string;
  release_date: string;
  episodes: AnimeEpisodeType[];
  created_at: string;
}

export type AnimeEpisodeType = {
  id: number;
  slug: string;
  episode: string;
  watches: AnimeWatchesType[];
  created_at: string;
}

export type AnimeWatchesType = {
  id: number;
  source: string;
  stream_url: string;
}

export type AnimeEpisodeDataType = Omit<AnimeEpisodeType, 'AnimeWatches'> & {
  anime: Pick<AnimeType, 'id' | 'title' | 'slug' | 'cover_url'>
}

export type AnimeHistoryType = AnimeType & {
  currentEpisodeID: number;
  watchedEpisodeIds: number;
}