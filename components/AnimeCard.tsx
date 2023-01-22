import dayjs from "dayjs"
import { useState } from "react"

import LinkWrapper from "./LinkWrapper"

import { AnimeEpisodeDataType } from "../types/anime"

type AnimeCardProps = {
  anime?: AnimeEpisodeDataType
  isLoading: boolean
}

const AnimeCard = ({ anime, isLoading }: AnimeCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <LinkWrapper isLinkAble={!isLoading} href={`/anime/${anime?.anime.id}`}>
      <div className="flex flex-col h-full">
        <div className={`bg-gray-800 overflow-hidden flex rounded-lg aspect-[39/58] w-full h-full ${!isImageLoaded ? "animate-pulse" : "animate-none"}`}>
          <img
            className={`transition-all object-cover duration-300 ease-in-out ${!isImageLoaded ? "opacity-0" : "opacity-100"}`}
            src={anime?.anime.cover_url}
            alt={anime?.anime.title}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex text-xs justify-between items-center">
            <span className={`text-main-white flex items-center min-w-[60%] min-h-[18px] rounded-lg truncate ${!isLoading ? "animate-none bg-none" : "animate-pulse bg-gray-800"}`}>
              {anime?.created_at && dayjs(anime?.created_at).add(-7, "hours").fromNow()}
            </span>
            <span className={`px-2 py-[1px] min-h-[18px] text-center rounded-md min-w-[30px] ${!isLoading ? "animate-none bg-secondary" : "animate-pulse bg-gray-800"}`}>
              {anime?.episode}
            </span>
          </div>

          <div className={`rounded-lg ${!isLoading ? "animate-none bg-none" : "animate-pulse bg-gray-800"}`}>
            <p className={`text-sm w-full min-h-[20px] truncate font-bold transition-all duration-300 ease-in-out ${!isLoading ? "text-white " : "text-gray-800"}`}>
              {anime?.anime.title}
            </p>
          </div>
        </div>
      </div>
    </LinkWrapper>
  )
}

export default AnimeCard