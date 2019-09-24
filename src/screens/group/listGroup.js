
import React, { useEffect, useState } from 'react';
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
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { goTo } from '../../shared/utils';
import { mapTransactionType } from '../../shared/domainMaps';
import * as actions from '../../redux/actions/groupActions';
import { FormControl } from '@material-ui/core';

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
  searchIcon: {
    margin: theme.spacing(2),
    float: 'left',
    cursor: 'pointer',
    minHeight: '30px',
    [theme.breakpoints.down('sm')]: {
      float: 'none'
    }
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      margin: '0',
    }
  },
  formControl: {
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '20px'
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
});

function submitSearch(event, searchFilters, updateFilters) {
  event.preventDefault();
  updateFilters(searchFilters);
};

function resetFilters(event, updateFilters, updateSearchFilters) {
  event.preventDefault();
  const searchFilters = { name: '', type: 'all' };
  updateSearchFilters(searchFilters);
  updateFilters(searchFilters);
}

function ListGroup(props) {
  const { classes, loadGroupStart, shouldBeUpdated, lastUpdate, items, showFilters, filterFields } = props;

  const [searchFilters, updateSearchFilters] = useState({ ...filterFields });

  useEffect(() => {
    if (shouldBeUpdated || lastUpdate.getTime() + 1000 * 60 * 10 < new Date().getTime()) {
      loadGroupStart();
    }
  }, [loadGroupStart, shouldBeUpdated, lastUpdate, items]);


  const filterForm = showFilters ?
    <form className={classes.form} onSubmit={event => submitSearch(event, searchFilters, props.updateFilters)}>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label} htmlFor="email">Nome</InputLabel>
        <Input id="name" name="name" className={classes.field} autoFocus
          value={searchFilters.name}
          onChange={event => updateSearchFilters({ ...searchFilters, name: event.target.value })} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label} htmlFor="type">Tipo</InputLabel>
        <Select
          className={classes.field}
          value={searchFilters.type}
          onChange={event => updateSearchFilters({ ...searchFilters, type: event.target.value })}
        >
          <MenuItem value='all'>Todos</MenuItem>
          <MenuItem value='credit'>Crédito</MenuItem>
          <MenuItem value='debit'>Débito</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >Filtrar</Button>
      <Button
        type="button"
        variant="contained"
        color="default"
        className={classes.button}
        onClick={event => resetFilters(event, props.updateFilters, updateSearchFilters)}
      >Limpar filtro</Button>
    </form>
    : null;

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
      <SearchIcon className={classes.searchIcon}
        onClick={props.toogleFilters}
      ></SearchIcon>
      {filterForm}
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
    lastUpdate: state.group.lastUpdate,
    filterFields: state.group.filterFields,
    showFilters: state.group.showFilters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadGroupStart: () => dispatch(actions.loadGroupStart()),
    updateFilters: (filterFields) => dispatch(actions.updateFilters(filterFields)),
    toogleFilters: () => dispatch(actions.toogleFilters())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(ListGroup)));