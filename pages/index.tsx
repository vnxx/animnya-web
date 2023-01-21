import Head from 'next/head'

import AnimeCard from '../components/AnimeCard'
import Container from '../components/Container'
import { useNewestAnimeFetcher } from '../lib/fetcher'
import { AnimeEpisodeDataType } from '../types/anime'

export default function HomePage() {
  const { newestAnimeData: data, isNewestAnimeLoading: isLoading, isNewestAnimeError: isError } = useNewestAnimeFetcher()

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Terjadi kesalahan, silahkan muat ulang halaman</h1>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Animnya</title>
      </Head>

      <section>
        <Container>
          <h2 className="font-bold text-2xl mb-5">Terbaru</h2>

          <div className="grid grid-cols-2 xl:grid-cols-5 gap-6 gap-y-8">
            {[...(!isLoading && data ? data.data : new Array(20))].map((anime: AnimeEpisodeDataType, i: any) => (
              <AnimeCard key={i} isLoading={isLoading} anime={anime} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}