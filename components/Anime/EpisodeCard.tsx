import LinkWrapper from "../LinkWrapper";

import { AnimeEpisodeType } from "../../types/anime";

type AnimeEpisodeCardProps = {
  animeID: number
  episode: AnimeEpisodeType
  isActive?: boolean
}
const AnimeEpisodeCard = ({ animeID, episode, isActive = false }: AnimeEpisodeCardProps) => (
  <LinkWrapper href={`/anime/${animeID}/episode/${episode.id}`} isLinkAble={true}>
    <div className={`aspect-square text-lg font-bold xl:hover:bg-secondar ${!isActive ? 'bg-secondary text-white xl:hover:bg-white xl:hover:text-gray-900' : 'bg-white text-gray-900 xl:hover:bg-secondary xl:hover:text-white'} shadow-md transition duration-300 ease-in-out rounded-md flex justify-center items-center`}>{episode.episode}</div>
  </LinkWrapper>
)

export default AnimeEpisodeCard