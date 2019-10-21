import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormControl, Input, InputLabel, Typography, Select, MenuItem } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import * as actions from '../../redux/actions/transactionActions';
import * as accountActions from '../../redux/actions/financeAccountActions';
import * as categoryActions from '../../redux/actions/categoryActions';
import { dateToString } from '../../shared/formatters';

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
  let item = { id: 0, description: '', value: 0, categoryId: 0, financeAccountId: 0, date: dateToString(new Date()) };
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
    props.update(item, '/transactions');
  } else {
    if (saveAndAddNewItem) {
      props.add(item, null, {
        id: 0,
        description: '',
        categoryId: item.categoryId,
        financeAccountId: item.financeAccountId,
        value: 0,
        date: dateToString(item.date)
      });
    } else {
      props.add(item, '/transactions');
    }
  }
};

const deleteAction = (props, id) => {
  props.delete(id, '/transactions');
};

const goToList = (props) => {
  props.history.push('/transactions');
};

const Edit = props => {
  const { classes, redirectUrl, accounts, loadAccounts, categories, loadCategories } = props;
  let initialData = fillItem(props);

  const [item, updateItem] = useState({ ...initialData });

  if (initialData.id !== item.id) {
    updateItem({ ...initialData });
  }

  useEffect(() => {
    if (!!redirectUrl) {
      props.history.push(redirectUrl);
    }

    if (accounts.length === 0) {
      loadAccounts();
    }
    if (categories.length === 0) {
      loadCategories();
    }
    if (item.id === 0 && !!props.defaultValue) {
      const categoryId = categories.length === 1 ? categories[0].id : !!props.defaultValue.categoryId ? props.defaultValue.categoryId : 0;
      const financeAccountId = accounts.length === 1 ? accounts[0].id : !!props.defaultValue.financeAccountId ? props.defaultValue.financeAccountId : 0;
      const date = !!props.defaultValue.date ? props.defaultValue.date : null;
      updateItem({ ...props.defaultValue, categoryId, financeAccountId, date });
    }

  }, [redirectUrl, props.history, props.defaultValue, item.id, loadAccounts, accounts, loadCategories, categories]);


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

  return (
    <>
      <Typography component="h1" variant="h5">
        Transação
        </Typography>
      <form className={classes.form} onSubmit={event => submitForm(event, props, item, false, updateItem)}>
        <input type="hidden" name="id" value={item.id} />
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="value">Valor</InputLabel>
          <Input id="value" name="value" autoFocus type="number" step="0.01"
            value={item.value}
            onChange={event => updateItem({ ...item, value: event.target.value })} />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="date">Data</InputLabel>
          <Input id="date" name="date" type="date"
            value={item.date}
            onChange={event => updateItem({ ...item, date: event.target.value })} />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="description">Descrição</InputLabel>
          <Input id="description" name="description" 
            value={item.description}
            onChange={event => updateItem({ ...item, description: event.target.value })} />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="categoryId">Categoria</InputLabel>
          <Select
            value={item.categoryId}
            onChange={event => updateItem({ ...item, categoryId: event.target.value })}
          >
            {categories.map(category => <MenuItem key={category.id} value={category.id}>{`${category.name}`}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="financeAccountId">Conta</InputLabel>
          <Select
            value={item.financeAccountId}
            onChange={event => updateItem({ ...item, financeAccountId: event.target.value })}
          >
            {accounts.map(account => <MenuItem key={account.id} value={account.id}>{`${account.name}`}</MenuItem>)}
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
    items: state.transaction.items,
    redirectUrl: state.transaction.redirectUrl,
    defaultValue: state.transaction.defaultValue,
    accounts: state.financeAccount.items,
    categories: state.category.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: (item, redirectUrl) => dispatch(actions.updateTransaction(item, redirectUrl)),
    add: (item, redirectUrl, defaultValue) => dispatch(actions.addTransaction(item, redirectUrl, defaultValue)),
    delete: (id, redirectUrl) => dispatch(actions.deleteTransaction(id, redirectUrl)),
    loadAccounts: () => dispatch(accountActions.loadAccountStart()),
    loadCategories: () => dispatch(categoryActions.loadCategoryStart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Edit)));
