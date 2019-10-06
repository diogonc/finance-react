import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import * as actions from '../../redux/actions/financeAccountActions';

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
  let item = { id: 0, priority: 1, name: '', userId: props.currentUserId };
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
    props.update(item, '/accounts');
  } else {
    if (saveAndAddNewItem) {
      props.add(item, null, {
        id: 0,
        name: '',
        userId: props.currentUserId,
        priority: item.priority
      });
    } else {
      props.add(item, saveAndAddNewItem ? null : '/accounts');
    }
  }
};

const deleteAction = (props, id) => {
  props.delete(id, '/accounts');
};

const goToList = (props) => {
  props.history.push('/accounts');
};

const Edit = props => {
  const { classes, redirectUrl, users } = props;
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
  }, [redirectUrl, props.history, props.defaultValue, item.id]);


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

  const userOptions = users.map(user => <MenuItem key={user.id} value={user.id}>{`${user.name}`}</MenuItem>);

  return (
    <>
      <Typography component="h1" variant="h5">
        Conta
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
          <InputLabel htmlFor="userID">Responsável</InputLabel>
          <Select
            value={item.userId}
            onChange={event => updateItem({ ...item, userId: event.target.value })}
          >
            {userOptions}
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
    items: state.financeAccount.items,
    redirectUrl: state.financeAccount.redirectUrl,
    defaultValue: state.financeAccount.defaultValue,
    users: state.account.users,
    currentUserId: state.account.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: (item, redirectUrl) => dispatch(actions.updateAccount(item, redirectUrl)),
    add: (item, redirectUrl, defaultValue) => dispatch(actions.addAccount(item, redirectUrl, defaultValue)),
    delete: (id, redirectUrl) => dispatch(actions.deleteAccount(id, redirectUrl))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Edit)));
