
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableFooter, TableRow, Paper, Typography, Grid } from '@material-ui/core';

import { formatMoney } from '../../shared/formatters';
import * as actions from '../../redux/actions/futureBalanceActions';
import Filter from './filter';
import FutureIncome from './futureIncome';

const styles = theme => ({
  root: {
    marginTop: '10px',
    position: 'relative',
    top: '10px',
    flexGrow: 1
  },
  table: {
    
  },
  tableRow: {
    cursor: 'pointer',
  },
  groupRow: {
    cursor: 'pointer',
    fontWeight: 600,
  },
  money: {
    fontSize: '14px',
    padding: '5px 40px 5px 16px',
    whiteSpace: 'nowrap'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  subTitle: {
    paddingTop: '20px',
    paddingLeft: '15px'
  }
});


function Report(props) {
  const { classes, loadStart, shouldBeUpdated, lastUpdate, result } = props;

  useEffect(() => {
    if (shouldBeUpdated || lastUpdate.getTime() + 1000 * 10 < new Date().getTime()) {
      loadStart();
    }
  }, [loadStart, shouldBeUpdated, lastUpdate, result]);

  if (!result.lastBalance)
    return <div>No data</div>;

  const balanceMonths = Object.keys(result.currentBalance);
  return (
    <>
      <Typography variant="h4" gutterBottom component="h2">
        Saldo Futuro
      </Typography>
      <Filter></Filter>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5" className={classes.subTitle}>
                Saldo atual
              </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Data
                    </TableCell>
                    <TableCell align="right">
                      Diferença
                    </TableCell>
                    <TableCell align="right">
                      Saldo
                  </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover className={classes.tableRow}>
                    <TableCell scope="row">
                      Saldo inicial
                      </TableCell>
                    <TableCell align="right" className={classes.money}>{formatMoney(0)}</TableCell>
                    <TableCell align="right" className={classes.money}>{formatMoney(result.previousBalance)}</TableCell>
                  </TableRow>
                  {balanceMonths.map(balanceMonth =>
                    <TableRow hover className={classes.tableRow} key={balanceMonth}>
                      <TableCell scope="row">
                        {balanceMonth}
                      </TableCell>
                      <TableCell align="right" className={classes.money}>{formatMoney(result.currentBalance[balanceMonth].difference)}</TableCell>
                      <TableCell align="right" className={classes.money}>{formatMoney(result.currentBalance[balanceMonth].balance)}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow hover className={classes.tableRow}>
                    <TableCell>
                      Média no período
                    </TableCell>
                    <TableCell align="right" className={classes.money}>{formatMoney(result.averageDifference)}</TableCell>
                    <TableCell align="right" className={classes.money}>{formatMoney(result.lastBalance)}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <FutureIncome
                monthlyIncreaseRate='0.6'
                currentValue={result.lastBalance}
                averageDifference={result.averageDifference}
                numberOfYears='10'
              ></FutureIncome>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    result: state.futureBalance.result,
    shouldBeUpdated: state.futureBalance.shouldBeUpdated,
    lastUpdate: state.futureBalance.lastUpdate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStart: () => dispatch(actions.loadFutureBalanceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Report)));
