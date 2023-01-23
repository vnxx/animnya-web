import { useEffect, useState } from "react"
import AnimeCard from "../../components/AnimeCard"
import Container from "../../components/Container"
import { getFavorites } from "../../lib/helper"
import { AnimeType } from "../../types/anime"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<AnimeType[]>([])

  useEffect(() => {
    const favorites = getFavorites()
    setFavorites(favorites)
  }, [])

  return (
    <section>
      <Container>
        <h2 className="font-bold text-2xl mb-5">Favorites</h2>
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-6 gap-y-8">
          {favorites.map((anime, i) => (
            <AnimeCard
              key={i}
              anime={{
                id: anime.id,
                title: anime.title,
                cover_url: anime.cover_url,
                created_at: anime.created_at,
              }}
              isLoading={false}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}