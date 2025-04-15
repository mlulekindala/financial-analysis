import React, { useState } from 'react';
import {
  Box, Button, Stepper, Step, StepLabel, TextField,
  Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Grid
} from '@mui/material';

const ratioNames = [
  "Current Ratio",
  "Quick Ratio",
  "Debt-to-Equity",
  "Gross Margin",
  "Net Profit Margin",
  "Return on Investment (ROI)",
  "Return on Equity (ROE)"
];

const steps = ["Enter Year 1 Ratios", "Enter Year 2 Ratios", "Review & Analyze"];

export default function FinancialRatioStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [year1, setYear1] = useState({});
  const [year2, setYear2] = useState({});

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleInputChange = (event, yearSetter, currentValues) => {
    const { name, value } = event.target;
    yearSetter({ ...currentValues, [name]: value });
  };

  const renderForm = (yearSetter, currentValues) => (
    <Box component="form" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {ratioNames.map((label, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              label={label}
              name={label}
              fullWidth
              value={currentValues[label] || ''}
              onChange={(e) => handleInputChange(e, yearSetter, currentValues)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const analyzeRatio = (y1, y2) => {
    if (y1 === '' || y2 === '') return 'N/A';
    const n1 = parseFloat(y1);
    const n2 = parseFloat(y2);
    if (isNaN(n1) || isNaN(n2)) return 'N/A';
    if (n2 > n1) return 'Improved';
    if (n2 < n1) return 'Declined';
    return 'No Change';
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Financial Ratios Comparison
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && renderForm(setYear1, year1)}
        {activeStep === 1 && renderForm(setYear2, year2)}
        {activeStep === 2 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Ratio</strong></TableCell>
                  <TableCell align="right"><strong>Year 1</strong></TableCell>
                  <TableCell align="right"><strong>Year 2</strong></TableCell>
                  <TableCell align="right"><strong>Analysis</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ratioNames.map((name, index) => (
                  <TableRow key={index}>
                    <TableCell>{name}</TableCell>
                    <TableCell align="right">{year1[name] || '—'}</TableCell>
                    <TableCell align="right">{year2[name] || '—'}</TableCell>
                    <TableCell align="right">{analyzeRatio(year1[name], year2[name])}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
