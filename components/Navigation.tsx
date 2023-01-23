import Link from "next/link"
import { AiFillHome } from "react-icons/ai"
import { RiBookmarkFill } from "react-icons/ri"
import { ImSearch } from "react-icons/im"

const Navigation = () => (
  <nav
    id="navbar"
    className="fixed left-0 flex justify-center items-center bottom-4 w-full z-30 transition-all duration-300 ease-in-out text-white"
  >
    <div
      className="flex justify-between w-[250px] p-3 rounded-full border border-secondary backdrop-blur-sm bg-primary/60 shadow-md px-4"
    >
      <Link href="/">
        <button className="p-1 fill-current rounded-full">
          <AiFillHome size="25px" />
        </button>
      </Link>

      <Link href="/anime/search">
        <button className="p-1 fill-current rounded-full">
          <ImSearch size="25px" />
        </button>
      </Link>

      <Link href="/anime/favorites">
        <button className="p-1 fill-current rounded-full">
          <RiBookmarkFill size="25px" />
        </button>
      </Link>
    </div>
  </nav>
)

export default Navigation