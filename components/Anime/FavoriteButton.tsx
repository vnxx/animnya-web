import { useState } from "react"
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri'

import Button from "../Button"

import { AnimeType } from "../../types/anime"
import { getFavorites, isInFavorites } from "../../lib/helper"

const FavoriteButton = ({ anime }: { anime: AnimeType }) => {
  const [isFavorite, setIsFavorite] = useState(isInFavorites(anime.id))

  const toggleFavorite = () => {
    const favorites = getFavorites()
    if (isFavorite) {
      const newFavorites = favorites.filter(favorite => favorite.id !== anime.id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, anime]))
    }

    setIsFavorite(!isFavorite)
  }

  return (
    <Button className="w-auto" onClick={toggleFavorite} colorScheme={isFavorite ? 'red' : 'secondary'}>
      {isFavorite ? <RiBookmarkFill size='20px' /> : <RiBookmarkLine size='20px' />}
    </Button>
  )
}

export default FavoriteButton