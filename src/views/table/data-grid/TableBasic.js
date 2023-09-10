// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'

// ** Data Import

const columns = [
  {
    minWidth: 300,
    field: 'name',
    headerName: 'الإسم'
  },
  {
    minWidth: 300,
    field: 'email',
    headerName: 'البريد الإلكتروني'
  },
  {
    width: 180,
    field: 'start_date',
    headerName: 'Date'
  },
  {
    width: 180,
    field: 'role',
    headerName: 'الوظيفة'
  },
  {
    field: 'age',
    headerName: 'السن'
  }
]

const TableBasic = ({ rows,title }) => {
  
  return (
    <Card>
      <CardHeader title = {title} />
      <Box sx={{ height: 500 }}>
        <DataGrid columns={columns} rows={rows.slice(0, 10)} setShowForm />
      </Box>
    </Card>
  )
}

export default TableBasic
