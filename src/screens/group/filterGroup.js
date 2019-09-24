
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import * as actions from '../../redux/actions/groupActions';
import { FormControl } from '@material-ui/core';

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

function FilterGroup(props) {
    const { classes, showFilters, filterFields } = props;

    const [searchFilters, updateSearchFilters] = useState({ ...filterFields });

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
            <SearchIcon className={classes.searchIcon}
                onClick={props.toogleFilters}
            ></SearchIcon>
            {filterForm}
        </>
    );
}

const mapStateToProps = state => {
    return {
        filterFields: state.group.filterFields,
        showFilters: state.group.showFilters
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateFilters: (filterFields) => dispatch(actions.updateFilters(filterFields)),
        toogleFilters: () => dispatch(actions.toogleFilters())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(FilterGroup)));