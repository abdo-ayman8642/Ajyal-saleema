import React from 'react'
import { Button, Tooltip } from '@mui/material'
import XLSX from 'xlsx'
import ExcelJS from 'exceljs'
import GetAppIcon from '@mui/icons-material/GetApp'

const ExportToExcelButton = ({ filters }) => {
  function exportToExcel() {
    const data = filters?.reduce((result, item) => {
      result[item.header] = item.number || 0
      return result
    }, {})
    const dataArr = [data]
    const headersArray = filters.map(item => item.header)

    console.log(headersArray)
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Data')

    worksheet.columns = headersArray.map(header => {
      return { header, key: header }
    })

    dataArr.forEach(rowData => {
      worksheet.addRow(rowData)
    })

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'data.xlsx'
      a.click()

      // Clean up
      URL.revokeObjectURL(url)
    })
  }

  return (
    <Tooltip title='Export Filters To Excel Sheet'>
      <Button color='inherit' onClick={exportToExcel} startIcon={<GetAppIcon />}></Button>
    </Tooltip>
  )
}

export default ExportToExcelButton
