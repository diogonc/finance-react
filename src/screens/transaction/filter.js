
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Input, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

import * as actions from '../../redux/actions/transactionActions';
import * as accountActions from '../../redux/actions/financeAccountActions';
import * as categoryActions from '../../redux/actions/categoryActions';
import { FormControl } from '@material-ui/core';
import { dateToString } from '../../shared/formatters';

const styles = theme => ({
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
        minWidth: '180px'
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

function updateUserFilter(updateSearchFilters, searchFilters, users, accounts) {
    const financeAccounts = accounts.filter(account => users.includes(account.user.id)).map(account => account.id);

    updateSearchFilters({ ...searchFilters, users, financeAccounts });
};

function resetFilters(event, updateFilters, updateSearchFilters) {
    event.preventDefault();
    var today = new Date();
    const searchFilters = {
        description: '',
        categories: [],
        financeAccounts: [],
        users: [],
        from: dateToString(new Date(today.getFullYear(), today.getMonth(), 1)),
        to: dateToString(new Date(today.getFullYear(), today.getMonth() + 1, 0))
    };
    updateSearchFilters(searchFilters);
    updateFilters(searchFilters);
}

function Filter(props) {
    const { classes, showFilters, filterFields, accounts, categories, users, loadAccounts, loadCategories } = props;

    const [searchFilters, updateSearchFilters] = useState({ ...filterFields });

    useEffect(() => {
        if (accounts.length === 0) {
            loadAccounts();
        }
        if (categories.length === 0) {
            loadCategories();
        }
    }, [loadAccounts, accounts, loadCategories, categories]);

    const filterForm = showFilters ?
        <form className={classes.form} onSubmit={event => submitSearch(event, searchFilters, props.updateFilters)}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="from">Início</InputLabel>
                <Input id="from" name="from" autoFocus type="date"
                    value={searchFilters.from}
                    onChange={event => updateSearchFilters({ ...searchFilters, from: event.target.value })} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="to">Fim</InputLabel>
                <Input id="to" name="to" type="date"
                    value={searchFilters.to}
                    onChange={event => updateSearchFilters({ ...searchFilters, to: event.target.value })} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.label} htmlFor="description">Descrição</InputLabel>
                <Input id="description" name="description" className={classes.field} autoFocus
                    value={searchFilters.description}
                    onChange={event => updateSearchFilters({ ...searchFilters, description: event.target.value })} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.label} htmlFor="categories">Categoria</InputLabel>
                <Select
                    multiple
                    className={classes.field}
                    value={searchFilters.categories}
                    onChange={event => updateSearchFilters({ ...searchFilters, categories: event.target.value })}
                >
                    {categories.map(category => <MenuItem key={category.id} value={category.id}>{`${category.name}`}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.label} htmlFor="userId">Responsável</InputLabel>
                <Select
                    multiple
                    className={classes.field}
                    value={searchFilters.users}
                    onChange={event => updateUserFilter(updateSearchFilters, searchFilters, event.target.value, accounts)}
                >
                    {users.map(user => <MenuItem key={user.id} value={user.id}>{`${user.name}`}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.label} htmlFor="accounts">Conta</InputLabel>
                <Select
                    multiple
                    className={classes.field}
                    value={searchFilters.financeAccounts}
                    onChange={event => updateSearchFilters({ ...searchFilters, financeAccounts: event.target.value })}
                >
                    {accounts.map(account => <MenuItem key={account.id} value={account.id}>{`${account.name}`}</MenuItem>)}
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
            <SearchIcon className={classes.searchIcon}
                onClick={props.toogleFilters}
            ></SearchIcon>
            {filterForm}
        </>
    );
}

const mapStateToProps = state => {
    return {
        filterFields: state.transaction.filterFields,
        showFilters: state.transaction.showFilters,
        accounts: state.financeAccount.items,
        categories: state.category.items,
        users: state.account.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateFilters: (filterFields) => dispatch(actions.updateFilters(filterFields)),
        toogleFilters: () => dispatch(actions.toogleFilters()),
        loadAccounts: () => dispatch(accountActions.loadAccountStart()),
        loadCategories: () => dispatch(categoryActions.loadCategoryStart())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Filter)));