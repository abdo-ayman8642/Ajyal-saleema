// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import { IconButton } from '@mui/material'
import { CloseCircleOutline } from 'mdi-material-ui'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area

const ImpExpFile = ({ files, setFiles }) => {
  // ** State

  // ** Hook
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      '.xlsx': '.xlsx',
      '.xls': '.xls'
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const handleLinkClick = event => {
    event.preventDefault()
  }

  const handleRemoveFile = index => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const img = files.map((file, index) => (
    <Box key={index}>
      <FileDocumentOutline />
      <Typography variant=''>{file.name}</Typography>
      <IconButton
        onClick={event => {
          event.stopPropagation()
          handleRemoveFile(index)
        }}
      >
        <CloseCircleOutline />
      </IconButton>
    </Box>
  ))

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={acceptedFiles.length ? { height: 200 } : {}}>
      <input {...getInputProps()} />
      <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
        <Img width={200} alt='Upload img' src='/images/misc/upload.png' />
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
          <Typography color='textSecondary'>
            اضف ملف بيانات الطالب{' '}
            <Link href='/' onClick={handleLinkClick}>
              اضغط هنا
            </Link>{' '}
          </Typography>
        </Box>
      </Box>
      {files.length ? img : null}
    </Box>
  )
}

export default ImpExpFile
