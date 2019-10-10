
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
  const userData = result[userKey];
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
    </Table>
  </Paper>;
}

function Report(props) {
  const { classes, loadStart, shouldBeUpdated, lastUpdate, result } = props;

  useEffect(() => {
    if (shouldBeUpdated || lastUpdate.getTime() + 1000 * 60 * 10 < new Date().getTime()) {
      loadStart();
    }
  }, [loadStart, shouldBeUpdated, lastUpdate, result]);

  var users = Object.keys(result);
  return (
    <>
      <Typography variant="h4" gutterBottom component="h2">
        Saldo por conta
      </Typography>
      <Filter></Filter>
      {users.map((userKey) => showUserTable(userKey, result, classes))}
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