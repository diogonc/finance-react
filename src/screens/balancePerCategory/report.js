
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableFooter, TableRow, Paper, Typography } from '@material-ui/core';

import { formatMoney } from '../../shared/formatters';
import * as actions from '../../redux/actions/balancePerCategoryActions';
import { updateFilters as updateTransactionFilters } from '../../redux/actions/transactionActions';
import Filter from './filter';
import GroupComponent from './groupComponent';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: '10px',
    position: 'relative',
    top: '10px'
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    cursor: 'pointer',
  },
  money: {
    fontSize: '14px',
    padding: '5px 40px 5px 16px',
    whiteSpace: 'nowrap'
  },
  groupRow: {
    cursor: 'pointer',
    fontWeight: 600,
  },
  fab: {
    zIndex: '5',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2),
      float: 'right'
    }
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
});


function Report(props) {
  const { classes, loadStart, shouldBeUpdated, lastUpdate, result } = props;

  useEffect(() => {
    if (shouldBeUpdated || lastUpdate.getTime() + 1000 * 10 < new Date().getTime()) {
      loadStart();
    }
  }, [loadStart, shouldBeUpdated, lastUpdate, result]);

  if (!result.balance)
    return <div>No data</div>;

  const months = Object.keys(result.balance);
  const creditKeys = Object.keys(result.groups.credit);
  const debitKeys = Object.keys(result.groups.debit);

  return (
    <>
      <Typography variant="h4" gutterBottom component="h2">
        Saldo por categoria
      </Typography>
      <Filter></Filter>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Saldo</TableCell>
              {months.map(month =>
                <TableCell key={month} align="right">
                  {formatMonthHeader(month)}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover className={classes.tableRow}>
              <TableCell component="th" scope="row">
                Crédito
              </TableCell>
              {months.map(month =>
                <TableCell key={month} align="right" className={classes.money}>
                  {formatMoney(result.creditBalance[month])}
                </TableCell>
              )}
            </TableRow>
            <TableRow hover className={classes.tableRow}>
              <TableCell component="th" scope="row">
                Débito
              </TableCell>
              {months.map(month =>
                <TableCell key={month} align="right" className={classes.money}>
                  {formatMoney(result.debitBalance[month])}
                </TableCell>
              )}
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow hover className={classes.tableRow}>
              <TableCell component="th" scope="row">
                Saldo Total
              </TableCell>
              {months.map(month =>
                <TableCell key={month} align="right" className={classes.money}>
                  {formatMoney(result.balance[month])}
                </TableCell>
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
      <br />
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Créditos</TableCell>
              {months.map(month =>
                <TableCell key={month} align="right">
                  {formatMonthHeader(month)}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {creditKeys.map(creditGroupKey =>
              GroupComponent(classes, result.groups.credit[creditGroupKey], months, props.updateTransactionFilters, props.history)
            )}
          </TableBody>
          <TableFooter>
            <TableRow hover className={classes.tableRow}>
              <TableCell component="th" scope="row">
                Total Créditos
              </TableCell>
              {months.map(month =>
                <TableCell key={month} align="right" className={classes.money}>
                  {formatMoney(result.creditBalance[month])}
                </TableCell>
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
      <br />
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Débitos</TableCell>
              {months.map(month =>
                <TableCell key={month} align="right">
                  {formatMonthHeader(month)}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {debitKeys.map(debitGroupKey =>
              GroupComponent(classes, result.groups.debit[debitGroupKey], months, props.updateTransactionFilters, props.history)
            )}
          </TableBody>
          <TableFooter>
            <TableRow hover className={classes.tableRow}>
              <TableCell component="th" scope="row">
                Total Débitos
              </TableCell>
              {months.map(month =>
                <TableCell key={month} align="right" className={classes.money}>
                  {formatMoney(result.debitBalance[month])}
                </TableCell>
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </>
  );
}

const mapStateToProps = state => {
  return {
    result: state.balancePerCategory.result,
    shouldBeUpdated: state.balancePerCategory.shouldBeUpdated,
    lastUpdate: state.balancePerCategory.lastUpdate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStart: () => dispatch(actions.loadBalancePerCategoryStart()),
    updateTransactionFilters: (newFilters) => dispatch(updateTransactionFilters(newFilters))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Report)));

function formatMonthHeader(month) {
  return month === 'average' ? 'Média' : month === 'total' ? 'Total' : month;
}
