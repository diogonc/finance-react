import React from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { formatMoney } from '../../shared/formatters';

const styles = theme => ({
  form: {
    marginLeft: '30px',
    paddingBottom: '30px',
    width: '90%',
  },
  formControl: {
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '20px'
    },
    width: '140px'
  },
  money: {
    fontSize: '14px',
    padding: '5px 40px 5px 16px',
    whiteSpace: 'nowrap'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  subTitle: {
    paddingTop: '20px',
    paddingBottom: '30px',
    paddingLeft: '15px'
  }
});

const FutureIncome = props => {
  const { result, classes } = props;

  if (!result || !result.futureBalance)
    return null;

  const dateKeys = Object.keys(result.futureBalance);

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.subTitle}>
        Previsão
              </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              Data
                    </TableCell>
            <TableCell align="right">
              Rendimento/Mês
                    </TableCell>
            <TableCell align="right">
              Aporte/Mês
                    </TableCell>
            <TableCell align="right">
              Saldo
                  </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dateKeys.map(dateKey =>
            <TableRow hover className={classes.tableRow} key={dateKey}>
              <TableCell scope="row">
                {dateKey}
              </TableCell>
              <TableCell align="right" className={classes.money}>{formatMoney(result.futureBalance[dateKey].difference)}</TableCell>
              <TableCell align="right" className={classes.money}>{formatMoney(result.averageDifference)}</TableCell>
              <TableCell align="right" className={classes.money}>{formatMoney(result.futureBalance[dateKey].balance)}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};


export default withStyles(styles)(FutureIncome);