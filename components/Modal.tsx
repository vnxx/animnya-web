import { useState } from "react"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}
const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <div className="flex justify-center">
      <div onClick={onClose} className={`fixed w-full h-full top-0 bg-black transition-opacity ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      <nav className={`fixed w-full z-50 xl:max-w-5xl ${isOpen ? 'bottom-0' : '-bottom-full'} border-secondary backdrop-blur-sm bg-primary/60 z-30 rounded-tr-xl rounded-tl-xl transition-all duration-300 ease-in-out`}>
        {children}
      </nav>
    </div>
  )
}

export default Modal