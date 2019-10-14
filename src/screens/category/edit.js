import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormControl, Input, InputLabel, Typography, Select, MenuItem } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import * as actions from '../../redux/actions/categoryActions';
import * as groupActions from '../../redux/actions/groupActions';

const styles = theme => ({
  form: {
    maxWidth: '350px',
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
});

const fillItem = (props) => {
  let item = { id: 0, priority: 1, name: '', type: 'debit', groupId: null };
  let id = parseInt(props.match.params.id);
  if (!!id) {
    const itemFound = props.items.find(item => item.id === id);
    if (!!itemFound) {
      item = itemFound;
    }
    else {
      id = 0;
    }
  }
  return item;
}

const submitForm = (event, props, item, saveAndAddNewItem) => {
  event.preventDefault();
  if (item.id) {
    props.update(item, '/categories');
  } else {
    if (saveAndAddNewItem) {
      props.add(item, null, {
        id: 0,
        name: '',
        groupId: item.groupId,
        priority: item.priority,
        type: item.type
      });
    } else {
      props.add(item, '/categories');
    }
  }
};

const deleteAction = (props, id) => {
  props.delete(id, '/categories');
};

const goToList = (props) => {
  props.history.push('/categories');
};

const Edit = props => {
  const { classes, redirectUrl, groups, loadGroups } = props;
  let initialData = fillItem(props);

  const [item, updateItem] = useState({ ...initialData });

  if (initialData.id !== item.id) {
    updateItem({ ...initialData });
  }

  useEffect(() => {
    if (!!redirectUrl) {
      props.history.push(redirectUrl);
    }
    if (item.id === 0 && !!props.defaultValue) {
      updateItem(props.defaultValue);
    }
    if (groups.length === 0) {
      loadGroups();
    }

  }, [redirectUrl, props.history, props.defaultValue, item.id, loadGroups, groups.length]);


  const optionalButton = !!item.id ?
    (
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={event => deleteAction(props, item.id)}
      >
        Excluir
    </Button>)
    :
    (
      <Button
        type="button"
        variant="contained"
        className={classes.button}
        onClick={event => submitForm(event, props, item, true, updateItem)}
      >
        Salvar e novo
          </Button>
    );

  const groupOptions = groups.map(group => <MenuItem key={group.id} value={group.id}>{`${group.name}`}</MenuItem>);

  return (
    <>
      <Typography component="h1" variant="h5">
        Categoria
        </Typography>
      <form className={classes.form} onSubmit={event => submitForm(event, props, item, false, updateItem)}>
        <input type="hidden" name="id" value={item.id} />
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="email">Nome</InputLabel>
          <Input id="name" name="name" autoFocus
            value={item.name}
            onChange={event => updateItem({ ...item, name: event.target.value })} />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="priority">Prioridade</InputLabel>
          <Input name="priority" type="number" step="1" id="priority"
            value={item.priority}
            onChange={event => updateItem({ ...item, priority: event.target.value })} />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="type">Tipo</InputLabel>
          <Select
            value={item.type}
            onChange={event => updateItem({ ...item, type: event.target.value })}
          >
            <MenuItem value='credit'>Crédito</MenuItem>
            <MenuItem value='credit-transfer'>Transferência de crédito</MenuItem>
            <MenuItem value='debit'>Débito</MenuItem>
            <MenuItem value='debit-transfer'>Transferência de débito</MenuItem>
          </Select>
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="groupId">Agrupamento</InputLabel>
          <Select
            value={!!item.groupId ? item.groupId : 0}
            onChange={event => updateItem({ ...item, groupId: event.target.value })}
          >
            {groupOptions}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Salvar
          </Button>
        {optionalButton}
        <Button
          type="button"
          variant="contained"
          className={classes.button}
          onClick={() => goToList(props)}
        >
          Voltar
          </Button>
      </form>
    </>
  );
};

const mapStateToProps = state => {
  return {
    items: state.category.items,
    redirectUrl: state.category.redirectUrl,
    defaultValue: state.category.defaultValue,
    groups: state.group.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: (item, redirectUrl) => dispatch(actions.updateCategory(item, redirectUrl)),
    add: (item, redirectUrl, defaultValue) => dispatch(actions.addCategory(item, redirectUrl, defaultValue)),
    delete: (id, redirectUrl) => dispatch(actions.deleteCategory(id, redirectUrl)),
    loadGroups: () => dispatch(groupActions.loadGroupStart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Edit)));
