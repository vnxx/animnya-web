
type ButtonProps = {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  colorScheme?: 'secondary' | 'red'
  className?: string
  onClick?: () => void
}
const Button = ({ children, size = 'md', colorScheme = 'secondary', className, onClick }: ButtonProps) => {
  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-4 py-2 text-lg",
    xl: "px-6 py-3 text-xl",
  }

  const colorSchemes = {
    secondary: "text-white bg-secondary xl:hover:bg-secondary-hover",
    red: "text-white bg-main-red xl:hover:bg-main-red-hover",
  }
  return (
    <button className={`flex justify-center w-full items-center font-semibold rounded-lg transition-all duration-300 ease-in-out ${colorSchemes[colorScheme]} ${sizes[size]} ${className}`} onClick={onClick}>{children}</button>
  )
}

export default Button