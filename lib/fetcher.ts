import { type } from 'os'
import useSWR from 'swr'
import { AnimeEpisodeDataType, AnimeType } from '../types/anime'

const fetcher = (url: string) => fetch(url).then(res => res.json())

type useNewestAnimeFetcherDataType = {
  data: AnimeEpisodeDataType[]
  error: string | null
}
export const useNewestAnimeFetcher = () => {
  const { data: newestAnimeData, error: errorNewestAnimeData } = useSWR<useNewestAnimeFetcherDataType>(`${process.env.NEXT_PUBLIC_ANIMNYA_API_URL}/anime`, fetcher)

  return {
    newestAnimeData,
    isNewestAnimeLoading: !errorNewestAnimeData && !newestAnimeData,
    isNewestAnimeError: errorNewestAnimeData,
  }
}

type useAnimeFetcherDataType = {
  data: AnimeType
  error: string | null
}
export const useAnimeFetcher = (id: string) => {
  const { data: animeData, error: animeError } = useSWR<useAnimeFetcherDataType>(`${process.env.NEXT_PUBLIC_ANIMNYA_API_URL}/anime/${id}`, fetcher)

  return {
    animeData,
    isAnimeLoading: !animeError && !animeData,
    isAnimeError: animeError,
  }
}

type useAnimeEpisodeFetcherDataType = {
  data: AnimeEpisodeDataType
  error: string | null
}
export const useAnimeEpisodeFetcher = (id: string, episode: string) => {
  const { data: episodeData, error: episodeError } = useSWR<useAnimeEpisodeFetcherDataType>(`${process.env.NEXT_PUBLIC_ANIMNYA_API_URL}/anime/${id}/episode/${episode}`, fetcher)

  return {
    episodeData,
    isEpisodeLoading: !episodeError && !episodeData,
    isEpisodeError: episodeError,
  }
}