
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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { goTo } from '../../shared/utils';
import { mapTransactionType } from '../../shared/domainMaps';
import * as actions from '../../redux/actions/groupActions';
import FilterGroup from './filterGroup';

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
  }
});


function ListGroup(props) {
  const { classes, loadGroupStart, shouldBeUpdated, lastUpdate, items } = props;

  useEffect(() => {
    if (shouldBeUpdated || lastUpdate.getTime() + 1000 * 60 * 10 < new Date().getTime()) {
      loadGroupStart();
    }
  }, [loadGroupStart, shouldBeUpdated, lastUpdate, items]);

  return (
    <>
      <Fab color="primary" aria-label="Add"
        className={classes.fab}
        onClick={() => goTo(props, 'groups/new')}>
        <AddIcon />
      </Fab>
      <Typography variant="h4" gutterBottom component="h2">
        Agrupamentos
      </Typography>
      <FilterGroup></FilterGroup>
      <Paper className={classes.root}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Prioridade</TableCell>
              <TableCell align="right">Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow className={classes.tableRow} key={item.id} onClick={() => goTo(props, `groups/edit/${item.id}`)}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.priority}</TableCell>
                <TableCell align="right">{mapTransactionType(item.type)}</TableCell>
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
    items: state.group.items,
    shouldBeUpdated: state.group.shouldBeUpdated,
    lastUpdate: state.group.lastUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadGroupStart: () => dispatch(actions.loadGroupStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(ListGroup)));