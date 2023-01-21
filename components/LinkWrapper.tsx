import Link from "next/link"

type LinkWrapperProps = {
  children: React.ReactNode
  href: string
  isLinkAble: boolean
}

const LinkWrapper = ({ children, href, isLinkAble }: LinkWrapperProps) => {
  if (!isLinkAble) return <>{children}</>

  return (
    <Link href={href}>
      {children}
    </Link>
  )
}

export default LinkWrapper