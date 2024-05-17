import React, { createContext, useContext, useState } from 'react'
export type ModalContextProps = {
  isModalOpen: boolean
  handleModal: () => void
}
type ModalProviderProps = {
  children?: React.ReactNode
}
export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModal = () => setIsModalOpen((prev) => !prev)

  return (
    <ModalContext.Provider
      value={{
        handleModal,
        isModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
const ModalContext = createContext<ModalContextProps | undefined>(undefined)
export function useModalContext() {
  const context = useContext(ModalContext)
  if (!context) {
    throw Error('use ModalContext')
  }
  return context
}
