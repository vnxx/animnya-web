import { useEffect, useRef, useState } from "react"

type ExpandedTextProps = {
  text: string
}
const ExpandedText = ({ text }: ExpandedTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (ref.current) {
      setIsTruncated(ref.current.scrollHeight > ref.current.clientHeight)
    }
  }, [])

  return (
    <div className="relative overflow-hidden transition-all ease-in-out duration-150">
      <div
        ref={ref}
        className={`transition-all ease-in-out ${isExpanded ? 'max-h-full' : 'max-h-[120px]'}`}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {isTruncated && (
        <div style={{ backgroundImage: "linear-gradient(to bottom, transparent 10%, #090925 90%)" }} className={`${isExpanded ? 'block' : 'absolute h-[55px]'}  bottom-0 w-full flex justify-center items-end`}>
          <button onClick={handleToggle} className="mb-1 text-md w-full">{isExpanded ? 'Tutup' : 'Baca semua'}</button>
        </div>
      )}
    </div>
  )
}

export default ExpandedText