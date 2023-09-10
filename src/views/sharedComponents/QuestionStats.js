import React, { useEffect } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useTheme } from '@emotion/react'
import { Box, Typography, Grid, CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import { fetchExamAnalysis } from 'src/store/apps/exams/actions'
import { useSelector } from 'react-redux'

function QuestionStats({ id, question }) {
  const theme = useTheme()
  const questionAnalysis = useSelector(state => state.exams?.examAnalysis)
  const loading = useSelector(state => state.exams?.examAnalysisLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExamAnalysis({ examId: id, questionId: question.id }))
  }, [id, question])

  const options = {
    legend: { show: false },
    stroke: { width: 5, colors: [theme.palette.background.paper] },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.secondary.main],
    labels: [`${new Date().getFullYear()}`, `${new Date().getFullYear() - 1}`, `${new Date().getFullYear() - 2}`],
    tooltip: {
      y: {
        formatter: val => {
          if (questionAnalysis && questionAnalysis.length > 0) {
            const percentage = (questionAnalysis[0].total_correct_answers / questionAnalysis[0].total_answers) * 100
            return `${percentage.toFixed(2)}%`
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 230
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 180
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  if (loading) {
    return (
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12}>
        <Typography variant='h6' align='center'>
          نسبة النجاح
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ReactApexcharts type='donut' height={200} options={options} series={[210, 1790]} />
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: theme.palette.primary.main, mr: 1 }}
            />
            <Typography variant='body2'>نسبة الإجابات الخاطئة</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: theme.palette.success.main, mr: 1 }}
            />
            <Typography variant='body2'>نسبة الإجابات الصحيحة</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default QuestionStats
