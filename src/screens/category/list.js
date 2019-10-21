
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Paper, Typography, Fab} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import { goTo } from '../../shared/utils';
import { mapTransactionType } from '../../shared/domainMaps';
import * as actions from '../../redux/actions/categoryActions';
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
    if (shouldBeUpdated || lastUpdate.getTime() + 1000 * 10 < new Date().getTime()) {
      loadStart();
    }
  }, [loadStart, shouldBeUpdated, lastUpdate, items]);

  return (
    <>
      <Fab color="primary" aria-label="Add"
        className={classes.fab}
        onClick={() => goTo(props, 'categories/new')}>
        <AddIcon />
      </Fab>
      <Typography variant="h4" gutterBottom component="h2">
        Categorias
      </Typography>
      <Filter></Filter>
      <Paper className={classes.root}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sortDirection={order.by === 'name' ? order.direction : false}
              >
                <TableSortLabel
                  active={order.by === 'name'}
                  direction={order.direction}
                  onClick={event => handleOrder(updateOrder, event, order, 'name')}
                >
                  Nome
                  {order.by === 'name' ? (
                    <span className={classes.visuallyHidden}>
                      {order.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="left"
                sortDirection={order.by === 'type' ? order.direction : false}
              >
                <TableSortLabel
                  active={order.by === 'type'}
                  direction={order.direction}
                  onClick={event => handleOrder(updateOrder, event, order, 'type')}
                >
                  Tipo
                  {order.by === 'type' ? (
                    <span className={classes.visuallyHidden}>
                      {order.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                sortDirection={order.by === 'name' ? order.direction : false}
              >
                <TableSortLabel
                  active={order.by === 'priority'}
                  direction={order.direction}
                  onClick={event => handleOrder(updateOrder, event, order, 'priority')}
                >
                  Prioridade
                  {order.by === 'priority' ? (
                    <span className={classes.visuallyHidden}>
                      {order.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                sortDirection={order.by === 'userId' ? order.direction : false}
              >
                <TableSortLabel
                  active={order.by === 'group'}
                  direction={order.direction}
                  onClick={event => handleOrder(updateOrder, event, order, 'group')}
                >
                  Agrupamento
                  {order.by === 'group' ? (
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
              <TableRow hover className={classes.tableRow} key={item.id} onClick={() => goTo(props, `categories/edit/${item.id}`)}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="left">{mapTransactionType(item.type)}</TableCell>
                <TableCell align="right">{item.priority}</TableCell>
                <TableCell align="right">{!!item.groupId ?  item.group.name: ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

const mapStateToProps = state => {
  return {
    items: state.category.items,
    shouldBeUpdated: state.category.shouldBeUpdated,
    lastUpdate: state.category.lastUpdate,
    order: state.category.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStart: () => dispatch(actions.loadCategoryStart()),
    updateOrder: (order) => dispatch(actions.updateCategoryOrder(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(List)));