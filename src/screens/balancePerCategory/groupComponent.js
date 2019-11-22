import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { formatMoney, dateToString } from '../../shared/formatters';

function showTransactions(date, categoryId, updateTransactionFilters, history) {
    var dateSplit = date.split('/');
    if (!!date[1]) {
        var month = parseInt(dateSplit[0]) - 1;
        var year = parseInt(dateSplit[1]);
        const searchFilters = {
            description: '',
            categories: [categoryId],
            financeAccounts: [],
            users: [],
            from: dateToString(new Date(year, month, 1)),
            to: dateToString(new Date(year, month + 1, 0))
        };
        updateTransactionFilters(searchFilters);
        history.push('/transactions');
    }
}

function GroupComponent(classes, groupData, months, updateTransactionFilters, history) {
    const categories = Object.keys(groupData.categories);
    return <React.Fragment key={groupData.group.id}>
        <TableRow hover className={classes.tableRow}>
            <TableCell component="th" scope="row" className={classes.groupRow}>
                {groupData.group.name}
            </TableCell>
            {months.map(month => <TableCell key={month} align="right" className={[classes.groupRow, classes.money].join(' ')}>
                {formatMoney(groupData.balance[month])}
            </TableCell>)}
        </TableRow>
        {categories.map(categoryKey => <TableRow key={categoryKey} hover className={classes.tableRow}>
            <TableCell scope="row">
                {groupData.categories[categoryKey].category.name}
            </TableCell>
            {months.map(month => <TableCell
                key={month}
                align="right"
                className={classes.money}
                onClick={() => showTransactions(
                    month,
                    groupData.categories[categoryKey].category.id,
                    updateTransactionFilters,
                    history)}            >
                {formatMoney(groupData.categories[categoryKey].balance[month])}
            </TableCell>)}
        </TableRow>)}
    </React.Fragment>;
}

export default GroupComponent;
