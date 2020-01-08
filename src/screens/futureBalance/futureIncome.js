import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, Input, InputLabel, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import FutureBalanceReportCalc from '../../shared/Reports/FutureBalanceReportCalc';
import FutureResults from './futureResults';

const styles = theme => ({
  form: {
    marginLeft: '30px',
    paddingBottom: '30px',
    width: '90%',
  },
  formControl: {
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginBottom: '20px'
    },
    width: '140px'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    }
  },
  subTitle: {
    paddingTop: '20px',
    paddingBottom: '30px',
    paddingLeft: '15px'
  }
});

const updateFutureBalance = (event, item, updateItem) => {
  if (event)
    event.preventDefault();

  const result = FutureBalanceReportCalc.getReport(
    parseFloat(item.currentValue),
    parseFloat(item.averageDifference),
    parseFloat(item.monthlyIncreaseRate),
    parseInt(item.numberOfYears));
  updateItem({ ...item, futureBalance: result })
};

const FutureIncome = props => {
  const { classes, monthlyIncreaseRate, currentValue, averageDifference, numberOfYears } = props;

  const [item, updateItem] = useState({
    monthlyIncreaseRate: parseFloat(monthlyIncreaseRate).toFixed(2),
    currentValue: parseFloat(currentValue).toFixed(2),
    averageDifference: parseFloat(averageDifference).toFixed(2),
    numberOfYears: parseInt(numberOfYears),
    futureBalance: FutureBalanceReportCalc.getReport(
      parseFloat(currentValue),
      parseFloat(averageDifference),
      parseFloat(monthlyIncreaseRate),
      parseInt(numberOfYears))
  });

  useEffect(() => {
    var tempItem = {
      monthlyIncreaseRate: parseFloat(monthlyIncreaseRate).toFixed(2),
      currentValue: parseFloat(currentValue).toFixed(2),
      averageDifference: parseFloat(averageDifference).toFixed(2),
      numberOfYears: parseInt(numberOfYears),
      futureBalance: FutureBalanceReportCalc.getReport(
        parseFloat(currentValue),
        parseFloat(averageDifference),
        parseFloat(monthlyIncreaseRate),
        parseInt(numberOfYears))
    };

    updateItem({ ...tempItem });
  }, [monthlyIncreaseRate, currentValue, averageDifference, numberOfYears]);

  return (
    <>
      <Typography component="h1" variant="h5" className={classes.subTitle}>
        Saldo futuro
        </Typography>
      <form className={classes.form} onSubmit={event => updateFutureBalance(event, item, updateItem)}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="currentValue">Saldo atual</InputLabel>
          <Input id="currentValue" name="currentValue" autoFocus type="number" step="0.01"
            value={item.currentValue}
            onChange={event => updateItem({ ...item, currentValue: event.target.value })} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="averageDifference">Aporte mensal</InputLabel>
          <Input id="averageDifference" name="averageDifference" type="number" step="0.01"
            value={item.averageDifference}
            onChange={event => updateItem({ ...item, averageDifference: event.target.value })} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="value">Rendimento/mes(%)</InputLabel>
          <Input id="monthlyIncreaseRate" name="monthlyIncreaseRate" type="number" step="0.01"
            value={item.monthlyIncreaseRate}
            onChange={event => updateItem({ ...item, monthlyIncreaseRate: event.target.value })} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="numberOfYears">Período (anos)</InputLabel>
          <Input id="numberOfYears" name="numberOfYears" type="number" step="1"
            value={item.numberOfYears}
            onChange={event => updateItem({ ...item, numberOfYears: event.target.value })} />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Calcular
          </Button>
      </form>
      <FutureResults result={item.futureBalance}></FutureResults>
    </>
  );
};


export default withRouter(withStyles(styles)(FutureIncome));
