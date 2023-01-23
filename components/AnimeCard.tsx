import dayjs from "dayjs"
import { useState } from "react"

import LinkWrapper from "./LinkWrapper"

type AnimeCardProps = {
  anime?: {
    id: number
    episode_id?: number,
    cover_url: string
    title: string
    created_at?: string
    episode?: string
  }
  isLoading: boolean
}

const AnimeCard = ({ anime, isLoading }: AnimeCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <LinkWrapper isLinkAble={!isLoading} href={`/anime/${anime?.id}`}>
      <div className="flex flex-col h-full">
        <div className={`bg-gray-800 overflow-hidden flex rounded-lg aspect-[39/58] w-full h-full ${!isImageLoaded ? "animate-pulse" : "animate-none"}`}>
          <img
            className={`transition-all object-cover duration-300 ease-in-out ${!isImageLoaded ? "opacity-0" : "opacity-100"}`}
            src={anime?.cover_url}
            alt={anime?.title}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        <div className="mt-3 space-y-1">
          {(isLoading || anime?.created_at || anime?.episode) && (
            <div className="flex text-xs justify-between items-center">
              {(isLoading || anime?.created_at) && (
                <span className={`text-main-white flex items-center min-w-[60%] min-h-[18px] rounded-lg truncate ${!isLoading ? "animate-none bg-none" : "animate-pulse bg-gray-800"}`}>
                  {anime?.created_at && dayjs(anime?.created_at).add(-7, "hours").fromNow()}
                </span>
              )}

              {(isLoading || anime?.episode) && (
                <span className={`px-2 py-[1px] min-h-[18px] text-center rounded-md min-w-[30px] ${!isLoading ? "animate-none bg-secondary" : "animate-pulse bg-gray-800"}`}>
                  {anime?.episode}
                </span>
              )}
            </div>
          )}

          <div className={`rounded-lg ${!isLoading ? "animate-none bg-none" : "animate-pulse bg-gray-800"}`}>
            <p className={`text-sm w-full min-h-[20px] truncate font-bold transition-all duration-300 ease-in-out ${!isLoading ? "text-white " : "text-gray-800"}`}>
              {anime?.title}
            </p>
          </div>
        </div>
      </div>
    </LinkWrapper>
  )
}

export default AnimeCard