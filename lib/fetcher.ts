import useSWR from 'swr'
import getConfig from 'next/config'
import { AnimeEpisodeDataType, AnimeType } from '../types/anime'

const { publicRuntimeConfig } = getConfig()

const fetcher = (url: string) => fetch(url).then(res => res.json())

type useNewestAnimeFetcherDataType = {
  data: AnimeEpisodeDataType[]
  error: string | null
}
export const useNewestAnimeFetcher = () => {
  const { data: newestAnimeData, error: errorNewestAnimeData } = useSWR<useNewestAnimeFetcherDataType>(`${publicRuntimeConfig.apiUrl}/anime`, fetcher)

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
  const { data: animeData, error: animeError } = useSWR<useAnimeFetcherDataType>(`${publicRuntimeConfig.apiUrl}/anime/${id}`, fetcher)

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
  const { data: episodeData, error: episodeError } = useSWR<useAnimeEpisodeFetcherDataType>(`${publicRuntimeConfig.apiUrl}/anime/${id}/episode/${episode}`, fetcher)

  return {
    episodeData,
    isEpisodeLoading: !episodeError && !episodeData,
    isEpisodeError: episodeError,
  }
}
