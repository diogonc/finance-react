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

import * as actions from '../../redux/actions/groupActions';

const styles = theme => ({
  form: {
    maxWidth: '350px',
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
});

const fillItem = (props) => {
  let item = { id: 0, priority: 1, name: '', type: 'debit' };
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

const submitForm = (event, props, item, saveAndAddNewItem, updateGroup) => {
  event.preventDefault();
  if (item.id) {
    props.update(item, '/groups');
  } else {
    if (saveAndAddNewItem) {
      props.add(item, null, {
        id: 0,
        name: '',
        type: item.type,
        priority: item.priority
      });
    } else {
      props.add(item, saveAndAddNewItem ? null : '/groups');
    }
  }
};

const deleteGroupAction = (props, id) => {
  props.deleteGroup(id, '/groups');
};

const goToList = (props) => {
  props.history.push('/groups');
};

const EditGroup = props => {
  const { classes, redirectUrl } = props;
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
        size="small"
        className={classes.button}
        onClick={event => deleteGroupAction(props, item.id)}
      >
        Excluir
    </Button>)
    :
    (
      <Button
        type="button"
        variant="contained"
        size="small"
        className={classes.button}
        onClick={event => submitForm(event, props, item, true, updateItem)}
      >
        Salvar e novo
          </Button>
    );


  return (
    <>
      <Typography component="h1" variant="h5">
        Agrupamento
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
            <MenuItem value='debit'>Débito</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
        >
          Salvar
          </Button>
        {optionalButton}
        <Button
          type="button"
          variant="contained"
          size="small"
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
    items: state.group.items,
    redirectUrl: state.group.redirectUrl,
    defaultValue: state.group.defaultValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: (item, redirectUrl) => dispatch(actions.updateGroup(item, redirectUrl)),
    add: (item, redirectUrl, defaultValue) => dispatch(actions.addGroup(item, redirectUrl, defaultValue)),
    deleteGroup: (id, redirectUrl) => dispatch(actions.deleteGroup(id, redirectUrl))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(EditGroup)));
