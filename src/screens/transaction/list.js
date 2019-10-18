
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableFooter, TableRow, TableSortLabel, Paper, Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { goTo } from '../../shared/utils';
import { formatBrDate, formatMoney } from '../../shared/formatters';
import * as actions from '../../redux/actions/transactionActions';
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

const handleOrder = (updateOrder, event, order, selectedOrder) => {
  event.preventDefault();
  const isAsc = order.by === selectedOrder && order.direction === 'asc';
  var direction = isAsc ? 'desc' : 'asc';
  updateOrder({ by: selectedOrder, direction });
};

function List(props) {
  const { classes, loadStart, shouldBeUpdated, lastUpdate, items, order, updateOrder } = props;

  useEffect(() => {
    if (shouldBeUpdated || lastUpdate.getTime() + 1000 * 60 * 10 < new Date().getTime()) {
      loadStart();
    }
  }, [loadStart, shouldBeUpdated, lastUpdate, items]);

  const total = items.reduce((total, transaction) => {
    if (transaction.category.type === 'credit' || transaction.category.type === 'credit-transfer')
      return total + transaction.value;
    else
      return total - transaction.value;
  }, 0)

  return (
    <>
      <Fab color="primary" aria-label="Add"
        className={classes.fab}
        onClick={() => goTo(props, 'transactions/new')}>
        <AddIcon />
      </Fab>
      <Typography variant="h4" gutterBottom component="h2">
        Transações
      </Typography>
      <Filter></Filter>
      <Paper className={classes.root}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sortDirection={order.by === 'account' ? order.direction : false}
              >
                <TableSortLabel
                  active={order.by === 'account'}
                  direction={order.direction}
                  onClick={event => handleOrder(updateOrder, event, order, 'account')}
                >
                  Conta
                  {order.by === 'account' ? (
                    <span className={classes.visuallyHidden}>
                      {order.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="left"
                sortDirection={order.by === 'category' ? order.direction : false}
              >
                <TableSortLabel
                  active={order.by === 'category'}
                  direction={order.direction}
                  onClick={event => handleOrder(updateOrder, event, order, 'category')}
                >
                  Category
                  {order.by === 'category' ? (
                    <span className={classes.visuallyHidden}>
                      {order.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="left"
                sortDirection={order.by === 'description' ? order.direction : false}
              >
                <TableSortLabel
                  active={order.by === 'description'}
                  direction={order.direction}
                  onClick={event => handleOrder(updateOrder, event, order, 'description')}
                >
                  Descrição
                  {order.by === 'description' ? (
                    <span className={classes.visuallyHidden}>
                      {order.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="left"
                sortDirection={order.by === 'date' ? order.direction : false}
              >
                <TableSortLabel
                  active={order.by === 'date'}
                  direction={order.direction}
                  onClick={event => handleOrder(updateOrder, event, order, 'date')}
                >
                  Data
                  {order.by === 'date' ? (
                    <span className={classes.visuallyHidden}>
                      {order.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                sortDirection={order.by === 'value' ? order.direction : false}
              >
                <TableSortLabel
                  active={order.by === 'value'}
                  direction={order.direction}
                  onClick={event => handleOrder(updateOrder, event, order, 'value')}
                >
                  Valor
                  {order.by === 'value' ? (
                    <span className={classes.visuallyHidden}>
                      {order.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow hover className={classes.tableRow} key={item.id} onClick={() => goTo(props, `transactions/edit/${item.id}`)}>
                <TableCell component="th" scope="row">
                  {item.financeAccount.name}
                </TableCell>
                <TableCell align="left">{item.category.name}</TableCell>
                <TableCell align="left">{item.description}</TableCell>
                <TableCell align="left">{formatBrDate(item.date)}</TableCell>
                <TableCell align="right">{((item.category.type === 'debit' || item.category.type === 'debit-transfer') ? '-' : '') + formatMoney(item.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                Total
              </TableCell>
              <TableCell align="right">
                {formatMoney(total)}
              </TableCell>
            </TableRow>
          </TableFooter>

        </Table>
      </Paper>
    </>
  );
}

const mapStateToProps = state => {
  return {
    items: state.transaction.items,
    shouldBeUpdated: state.transaction.shouldBeUpdated,
    lastUpdate: state.transaction.lastUpdate,
    order: state.transaction.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStart: () => dispatch(actions.loadTransactionStart()),
    updateOrder: (order) => dispatch(actions.updateTransactionOrder(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(List)));