import { useState } from "react"
import { GiShare } from "react-icons/gi"

import Button from "./Button"
import Modal from "./Modal"


const useSharePage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const [hasCopied, setHasCopied] = useState(false)

  const url = window.location.href

  function copyToClipboard() {
    navigator.clipboard.writeText(url).then(function () {
      setHasCopied(true);
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    });

    setTimeout(() => {
      onClose();
    }, 300);
  }

  const ShareButton = () => <Button className="w-auto" onClick={() => setIsOpen(true)}><div className="flex justify-center items-center"><GiShare size="20px" /> <p className="ml-2">Bagikan</p></div></Button>
  const ShareModal = () => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <p className="font-bold mb-3">Share</p>

        <div className="space-y-3">
          <div className="space-x-3">
            <button
              className="py-1 px-5 rounded-full bg-blue-900"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")}
            >
              Facebook
            </button>

            <button
              className="py-1 px-5 rounded-full bg-green-700"
              onClick={() => window.open(`https://wa.me/?text=${url}`, "_blank")}
            >
              WhatsApp
            </button>
          </div>

          <div className="space-x-3">
            <button
              className="py-1 px-5 rounded-full bg-blue-500"
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${url}`, "_blank")}>
              Twitter
            </button>

            <button
              className="py-1 px-5 rounded-full bg-blue-800"
              onClick={() => window.open(`fb-messenger://share/?link=${url}`, "_blank")}>Messenger
            </button>
          </div>

          <div className="space-x-4">
            <button
              className="py-1 px-5 rounded-full bg-gray-600"
              onClick={() => copyToClipboard()}
            >
              {hasCopied ? "Link telah disalin" : "Salin Link"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )

  return { ShareButton, ShareModal }
}

export default useSharePage