import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import { RiHome7Line } from 'react-icons/ri'
import { IoFlagOutline } from 'react-icons/io5'
import { TiWeatherCloudy } from 'react-icons/ti'
import { MdOutlineSlowMotionVideo } from 'react-icons/md'

import Button from "../../../../components/Button"
import Container from "../../../../components/Container"
import LoadingScreen from "../../../../components/LoadingScreen"
import AnimeInfoCard from "../../../../components/Anime/InfoCard"
import AnimeEpisodeCard from "../../../../components/Anime/EpisodeCard"

import { AnimeEpisodeType, AnimeType } from "../../../../types/anime"
import { useAnimeEpisodeFetcher, useAnimeFetcher } from "../../../../lib/fetcher"

export default function EpisodePage() {
  const router = useRouter()

  if (!router.query.anime_id || !router.query.episode_id) return <LoadingScreen />

  const { animeData, isAnimeLoading, isAnimeError } = useAnimeFetcher(router.query.anime_id as string)
  const { episodeData, isEpisodeLoading, isEpisodeError } = useAnimeEpisodeFetcher(router.query.anime_id as string, router.query.episode_id as string)

  const [streamingUrl, setStreamingUrl] = useState<string | null>(null)
  useEffect(() => {
    if (episodeData) setStreamingUrl(episodeData.data.watches[0].stream_url)
  }, [episodeData])

  if (isAnimeError || isEpisodeError || (!isAnimeLoading && !animeData) || (!isEpisodeLoading && !episodeData)) {
    return (
      <div>
        <h1>Ada error</h1>
      </div>
    )
  }

  if (isAnimeLoading || isEpisodeLoading) return <LoadingScreen />

  const anime = animeData?.data as AnimeType
  const episode = episodeData?.data as AnimeEpisodeType

  return (
    <>
      <Head>
        <title>{anime.title} | Animeku</title>
      </Head>

      <div className="mb-12 bg-black">
        <Container className="flex justify-center items-center xl:px-3">
          <div className="w-full space-y-6">
            {streamingUrl && (
              <iframe allowFullScreen={true} className="aspect-video w-full" src={streamingUrl} />
            )}

            <div className="flex overflow-auto space-x-4">
              {episode.watches.map((watch, i) => (
                <button key={i} onClick={() => setStreamingUrl(watch.stream_url)} className={`flex-0 px-3 py-1 text-md whitespace-nowrap ${streamingUrl !== watch.stream_url ? 'bg-secondary text-white hover:bg-white hover:text-gray-900' : 'bg-white text-gray-900 hover:bg-secondary hover:text-white'} transition duration-300 ease-in-out rounded-md flex justify-center items-center`}>{watch.source}</button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="px-0 xl:px-3">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="block xl:sticky xl:w-[40%]">
            <div className="space-y-8 bg-primary rounded-t-[30px]">
              <div className="flex w-full justify-between items-center flex-0">
                <button>Share: TODO</button>
                <button>Favorit: TODO</button>
              </div>

              <h1 className="text-2xl xl:text-4xl font-bold">Episode {episode.episode}: {anime.title}</h1>
            </div>
          </div>

          <div className="xl:w-[60%]">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-3">
                <Button colorScheme="red">TODO: Tonton</Button>
                <Button>TODO: Lanjut</Button>
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-bold">Semua Episode</h2>

                <div className="grid grid-cols-5 xl:grid-cols-6 gap-3">
                  {[...(!isAnimeLoading ? anime.episodes : new Array(4))].map((_episode: AnimeEpisodeType, i) => (
                    <AnimeEpisodeCard isActive={_episode.id === episode.id} animeID={anime.id} episode={_episode} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}