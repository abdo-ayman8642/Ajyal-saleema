// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'

const SwiperDefault = ({ direction }) => {
  // ** Hook
  const [ref] = useKeenSlider({
    rtl: direction === 'rtl'
  })

  return (
    <Box ref={ref} className='keen-slider'>
      <Box className='keen-slider__slide'>
        <img src='/images/banner/banner-1.jpg' alt='swiper 1' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banner/banner-2.jpg' alt='swiper 2' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banner/banner-3.jpg' alt='swiper 3' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banner/banner-4.jpg' alt='swiper 4' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banner/banner-5.jpg' alt='swiper 5' />
      </Box>
    </Box>
  )
}

export default SwiperDefault
