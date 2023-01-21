import { IconType } from 'react-icons'

type AnimeInfoCardProps = {
  label: string
  value: string
  icon: IconType
}
const AnimeInfoCard = ({ icon: Icon, label, value }: AnimeInfoCardProps) => (
  <div className="p-3 bg-secondary rounded-lg w-[120px] flex-none">
    <div className="h-[70px]">
      <Icon size="3em" width="w00px" />
    </div>

    <p className="text-main-white text-sm mb-1">{label}</p>
    <p className='truncate'>{value}</p>
  </div>
)

export default AnimeInfoCard