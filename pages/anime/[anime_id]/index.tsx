import Head from "next/head"
import { useRouter } from "next/router"
import { RiHome7Line } from 'react-icons/ri'
import { IoFlagOutline } from 'react-icons/io5'
import { TiWeatherCloudy } from 'react-icons/ti'
import { MdOutlineSlowMotionVideo } from 'react-icons/md'

import Button from "../../../components/Button"
import Container from "../../../components/Container"
import AnimeInfoCard from "../../../components/Anime/InfoCard"
import ExpandedText from "../../../components/Anime/ExpandedText"
import AnimeEpisodeCard from "../../../components/Anime/EpisodeCard"

import { useAnimeFetcher } from "../../../lib/fetcher"
import { AnimeEpisodeType, AnimeType } from "../../../types/anime"

export default function AnimePage() {
  const router = useRouter()
  if (!router.query.anime_id) return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  )

  const { animeData: data, isAnimeLoading: isLoading, isAnimeError: isError } = useAnimeFetcher(router.query.anime_id as string)

  if (isError || (!isLoading && !data)) {
    return (
      <div>
        <h1>Ada error</h1>
      </div>
    )
  }

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  )

  const anime = data?.data as AnimeType

  return (
    <>
      <Head>
        <title>{anime.title} | Animeku</title>
      </Head>

      <div className="mb-12 bg-black">
        <Container className="flex justify-center items-center px-0 xl:px-6">
          {anime.trailer_url && (
            <iframe className="aspect-video w-full" src={anime.trailer_url} />
          )}
        </Container>
      </div>

      <Container className="px-0 xl:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="block xl:sticky xl:w-[40%]">
            <div className="space-y-8 bg-primary rounded-t-[30px]">
              <div className="flex w-full justify-between items-center flex-0">
                <button>Share: TODO</button>
                <button>Favorit: TODO</button>
              </div>

              <h1 className="text-2xl font-bold">{anime.title}</h1>

              <ExpandedText text={anime.synopsis} />
            </div>
          </div>

          <div className="xl:w-[60%]">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-3">
                <Button colorScheme="red">TODO: Tonton</Button>
                <Button>TODO: Lanjut</Button>
              </div>

              <div className="flex bg-primary overflow-auto space-x-4">
                <AnimeInfoCard value={anime.studio} label="Studio" icon={RiHome7Line} />
                <AnimeInfoCard value={anime.total_episodes} label="Total Episode" icon={MdOutlineSlowMotionVideo} />
                <AnimeInfoCard value={anime.release_date} label="Rilis" icon={IoFlagOutline} />
                <AnimeInfoCard value={anime.season} label="Season" icon={TiWeatherCloudy} />
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-bold">Semua Episode</h2>

                <div className="grid grid-cols-5 xl:grid-cols-6 gap-3">
                  {[...(!isLoading ? anime.episodes : new Array(4))].map((episode: AnimeEpisodeType, i) => (
                    <AnimeEpisodeCard key={i} animeID={anime.id} episode={episode} />
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