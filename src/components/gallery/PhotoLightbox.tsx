import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { ZoomIn, Download } from 'lucide-react'

interface PhotoLightboxProps {
  images: { src: string; alt: string }[]
  startIndex: number
  isOpen: boolean
  onClose: () => void
}

export function PhotoLightbox({ images, startIndex, isOpen, onClose }: PhotoLightboxProps) {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={startIndex}
      slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      toolbar={{
        buttons: [
          <ZoomIn key="zoom" />,
          <Download key="download" />,
        ],
      }}
      styles={{
        container: { backgroundColor: 'rgba(42,30,20,0.95)' },
      }}
    />
  )
}
