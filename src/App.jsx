import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';

const financialRatios = [
  { name: "Current Ratio", year1: 2.3, year2: 2.5 },
  { name: "Quick Ratio", year1: 1.8, year2: 2.0 },
  { name: "Debt-to-Equity", year1: 0.5, year2: 0.6 },
  { name: "Gross Margin", year1: "45%", year2: "47%" },
  { name: "Net Profit Margin", year1: "12%", year2: "13%" },
  { name: "Return on Assets (ROI)", year1: "8%", year2: "9%" },
  { name: "Return on Equity (ROE)", year1: "15%", year2: "17%" },
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 700, margin: 'auto', mt: 4 }}>
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Financial Ratios (Year 1 vs Year 2)
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Ratio</strong></TableCell>
              <TableCell align="right"><strong>Year 1</strong></TableCell>
              <TableCell align="right"><strong>Year 2</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financialRatios.map((ratio, index) => (
              <TableRow key={index}>
                <TableCell>{ratio.name}</TableCell>
                <TableCell align="right">{ratio.year1}</TableCell>
                <TableCell align="right">{ratio.year2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default App
