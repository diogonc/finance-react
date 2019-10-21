
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableFooter, TableRow, Paper, Typography} from '@material-ui/core';

import { formatMoney } from '../../shared/formatters';
import * as actions from '../../redux/actions/balancePerAccountActions';
import Filter from './filter';

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

function showUserTable(userKey, result, classes) {
  const userData = result.users[userKey];
  const accountKeys = Object.keys(userData.accounts);
  return <Paper className={classes.root} key={userKey}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>
            {userData.user.name}
          </TableCell>
          <TableCell align="right">
            Saldo
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accountKeys.map(accountKey =>
          <TableRow hover className={classes.tableRow} key={accountKey}>
            <TableCell component="th" scope="row">
              {userData.accounts[accountKey].account.name}
            </TableCell>
            <TableCell align="right">{formatMoney(userData.accounts[accountKey].total)}</TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow hover className={classes.tableRow}>
          <TableCell>
            Total
          </TableCell>
          <TableCell align="right">{formatMoney(userData.total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </Paper>;
}

function Report(props) {
  const { classes, loadStart, shouldBeUpdated, lastUpdate, result } = props;

  useEffect(() => {
    if (shouldBeUpdated || lastUpdate.getTime() + 1000 * 10  < new Date().getTime()) {
      loadStart();
    }
  }, [loadStart, shouldBeUpdated, lastUpdate, result]);
  if (!result.users)
    return <div>No data</div>;
  var users = Object.keys(result.users);
  return (
    <>
      <Typography variant="h4" gutterBottom component="h2">
        Saldo por conta
      </Typography>
      <Filter></Filter>
      {users.map((userKey) => showUserTable(userKey, result, classes))}

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                Todos Responsáveis
              </TableCell>
              <TableCell align="right">
                Saldo
          </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover className={classes.tableRow}>
              <TableCell component="th" scope="row">
                Total
              </TableCell>
              <TableCell align="right">{formatMoney(result.total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

const mapStateToProps = state => {
  return {
    result: state.balancePerAccount.result,
    shouldBeUpdated: state.balancePerAccount.shouldBeUpdated,
    lastUpdate: state.balancePerAccount.lastUpdate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStart: () => dispatch(actions.loadBalancePerAccountStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Report)));