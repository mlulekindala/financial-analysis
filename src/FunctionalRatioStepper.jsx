import React, { useState } from 'react';
import {
  Box, Button, Stepper, Step, StepLabel, TextField,
  Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Grid, Modal,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';

const ratioNames = [
  "Current Ratio",
  "Quick Ratio",
  "Debt-to-Equity",
  "Gross Margin",
  "Net Profit Margin",
  "Return on Investments (ROI)",
  "Return on Equity (ROE)"
];

const steps = ["Enter Year 1 Ratios", "Enter Year 2 Ratios", "Review & Analyze"];

export default function FinancialRatioStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [year1, setYear1] = useState({});
  const [year2, setYear2] = useState({});
  const [selectedRatio, setSelectedRatio] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleInputChange = (event, setter, currentValues) => {
    const { name, value } = event.target;
    setter({ ...currentValues, [name]: value });
  };

  const handleRowClick = (ratioName) => {
    setSelectedRatio(ratioName);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRatio(null);
  };

  const renderForm = (setter, currentValues) => (
    <Box component="form" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {ratioNames.map((label, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              label={label}
              name={label}
              fullWidth
              value={currentValues[label] || ''}
              onChange={(e) => handleInputChange(e, setter, currentValues)}
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

  const getDetailedAnalysis = (ratio, y1, y2) => {
    const n1 = parseFloat(y1);
    const n2 = parseFloat(y2);
    if (isNaN(n1) || isNaN(n2)) return 'No additional insights available.';

    switch (ratio) {
      case 'Current Ratio':
        return n2 > n1
          ? 'The company has improved its ability to pay short-term obligations.'
          : 'The company may face short-term liquidity issues.';
      case 'Quick Ratio':
        return n2 > n1
          ? 'Quick assets are more sufficient to cover liabilities.'
          : 'There’s reduced liquidity in liquid assets.';
      case 'Debt-to-Equity':
        return n2 > n1
          ? 'Increased reliance on debt financing.'
          : 'Reduced financial leverage, potentially less risk.';
      case 'Gross Margin':
        return n2 > n1
          ? 'Profitability from core operations has improved.'
          : 'COGS may be increasing or pricing pressure exists.';
      case 'Net Profit Margin':
        return n2 > n1
          ? 'Improved profitability after expenses and taxes.'
          : 'Profit margins are thinning—possible cost increases.';
      case 'Return on Investments (ROI)':
        return n2 > n1
          ? 'Assets are generating more income.'
          : 'Asset efficiency has declined.';
      case 'Return on Equity (ROE)':
        return n2 > n1
          ? 'Shareholders are receiving better returns.'
          : 'Equity returns are underperforming.';
      default:
        return 'Trend suggests performance shift; deeper review recommended.';
    }
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
                  <TableRow
                    key={index}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(name)}
                  >
                    <TableCell>{name}</TableCell>
                    <TableCell align="right">{year1[name] || '—'}</TableCell>
                    <TableCell align="right">{year2[name] || '—'}</TableCell>
                    <TableCell align="right">
                      {analyzeRatio(year1[name], year2[name])}
                    </TableCell>
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

      {/* Modal for detailed analysis */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <DialogTitle>{selectedRatio}</DialogTitle>
          <DialogContent>
            <Typography>
              <strong>Year 1:</strong> {year1[selectedRatio] || '—'}
            </Typography>
            <Typography>
              <strong>Year 2:</strong> {year2[selectedRatio] || '—'}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <strong>Analysis:</strong> {analyzeRatio(year1[selectedRatio], year2[selectedRatio])}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {getDetailedAnalysis(selectedRatio, year1[selectedRatio], year2[selectedRatio])}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </Box>
      </Modal>
    </Box>
  );
}
