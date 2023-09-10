// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

const CardStatsCharacter = ({ data }) => {
  // ** Vars
  const { title, chipColor, chipText, src, stats, trend, cardImg } = data

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent sx={{ pb: '0 !important' }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ mb: 1.5, fontWeight: 600, whiteSpace: 'nowrap' }}>{title}</Typography>
            <CustomChip
              skin='light'
              size='small'
              label={chipText}
              color={chipColor}
              sx={{ mb: 5.5, height: 20, fontWeight: 500, fontSize: '0.75rem' }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start'
              }}
            >
              <Typography variant='h6' sx={{ mr: 1.5 }}>
                {stats || 30}
              </Typography>
              <Typography variant='body2' sx={{ color: trend === 'negative' ? 'error.main' : 'success.main' }}>
                {`اجمالي ${title}`}
              </Typography>
              <Box
                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around', pb: 3 }}
              >
                <img
                  src={cardImg}
                  alt={title}
                  height={40}
                  style={{ borderRadius: '50%', marginLeft: '-5px', border: '1px solid #fff' }}
                />
                <img
                  src={cardImg}
                  alt={title}
                  height={40}
                  style={{ borderRadius: '50%', marginLeft: '-5px', border: '1px solid #fff' }}
                />
                <img
                  src={cardImg}
                  alt={title}
                  height={40}
                  style={{ borderRadius: '50%', marginLeft: '-5px', border: '1px solid #fff' }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <img src={src} alt={title} height={134} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardStatsCharacter

CardStatsCharacter.defaultProps = {
  trend: 'positive',
  chipColor: 'primary'
}
