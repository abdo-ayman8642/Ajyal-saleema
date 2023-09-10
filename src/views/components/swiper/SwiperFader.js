// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'

const images = [
  '/images/banner/banner-9.jpg',
  '/images/banner/banner-7.jpg',
  '/images/banner/banner-6.jpg',
  '/images/banner/banner-10.jpg',
  '/images/banner/banner-8.jpg'
]

const SwiperFader = ({ direction }) => {
  const [opacities, setOpacities] = useState([])

  // ** Hook
  const [sliderRef] = useKeenSlider({
    slides: images.length,
    rtl: direction === 'rtl',
    detailsChanged(s) {
      const new_opacities = s.track.details.slides.map(slide => slide.portion)
      setOpacities(new_opacities)
    }
  })

  return (
    <Box ref={sliderRef} className='fader' sx={{ height: [200, 250, 395] }}>
      {images.map((src, idx) => (
        <Box key={idx} className='fader__slide' sx={{ opacity: opacities[idx] }}>
          <img src={src} alt={`slider ${idx}`} />
        </Box>
      ))}
    </Box>
  )
}

export default SwiperFader
