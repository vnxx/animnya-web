import React from "react"

type ContainerProps = {
  children: React.ReactNode
  className?: string
}
const Container = ({ children, className }: ContainerProps) => (
  <div className={`max-w-5xl m-auto relative px-3 ${className}`}>
    {children}
  </div>
)


export default Container