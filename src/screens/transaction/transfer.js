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

const fillItem = (categories) => {
  let item = { id: 0, description: '', value: 0, financeAccountOriginId: 0, financeAccountDestinationId: 0, date: dateToString(new Date()) };

  return item;
}

const submitForm = (event, props, item) => {
  event.preventDefault();
  props.addTransfer(item, '/transactions');
};

const goToList = (props) => {
  props.history.push('/transactions');
};

const Transfer = props => {
  const { classes, redirectUrl, accounts, loadAccounts, categories, loadCategories } = props;
  let initialData = fillItem(props, categories);

  const [item, updateItem] = useState({ ...initialData });

  if (categories.length > 0) {
    item.creditTransferCategoryId = categories.find(category => category.type === 'credit-transfer').id;
    item.debitTransferCategoryId = categories.find(category => category.type === 'debit-transfer').id;
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

  }, [redirectUrl, props.history, loadAccounts, accounts, loadCategories, categories]);

  return (
    <>
      <Typography component="h1" variant="h5">
        Transferência
        </Typography>
      <form className={classes.form} onSubmit={event => submitForm(event, props, item, false, updateItem)}>
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
          <InputLabel htmlFor="financeAccountOriginId">Conta Origem</InputLabel>
          <Select
            value={item.financeAccountOriginId}
            onChange={event => updateItem({ ...item, financeAccountOriginId: event.target.value })}
          >
            {accounts.map(account => <MenuItem key={account.id} value={account.id}>{`${account.name}`}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="financeAccountDestinationId">Conta Destino</InputLabel>
          <Select
            value={item.financeAccountDestinationId}
            onChange={event => updateItem({ ...item, financeAccountDestinationId: event.target.value })}
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
    redirectUrl: state.transaction.redirectUrl,
    accounts: state.financeAccount.items,
    categories: state.category.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTransfer: (item, redirectUrl) => dispatch(actions.addTransfer(item, redirectUrl)),
    loadAccounts: () => dispatch(accountActions.loadAccountStart()),
    loadCategories: () => dispatch(categoryActions.loadCategoryStart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Transfer)));
