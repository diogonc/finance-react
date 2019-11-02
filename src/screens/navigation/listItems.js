import React from 'react';
import { withRouter } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import SpeakerGroup from '@material-ui/icons/SpeakerGroup';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TimelineIcon from '@material-ui/icons/Timeline';
import CategoryIcon from '@material-ui/icons/Category';
import BarChartIcon from '@material-ui/icons/BarChart';
import { goTo } from '../../shared/utils';

const ListItems = (props) => (
    <div>
        <Tooltip title="Agrupamentos" aria-label="Agrupamentos">
            <ListItem button onClick={() => goTo(props, 'groups')}>
                <ListItemIcon>
                    <SpeakerGroup />
                </ListItemIcon>
                <ListItemText primary="Agrupamentos" />
            </ListItem>
        </Tooltip>
        <Tooltip title="Contas" aria-label="Contas">
            <ListItem button onClick={() => goTo(props, 'accounts')}>
                <ListItemIcon>
                    <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText primary="Contas" />
            </ListItem>
        </Tooltip>
        <Tooltip title="Categorias" aria-label="Categorias">
            <ListItem button onClick={() => goTo(props, 'categories')}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categorias" />
            </ListItem>
        </Tooltip>
        <Tooltip title="Transações" aria-label="Transações">
            <ListItem button onClick={() => goTo(props, 'transactions')}>
                <ListItemIcon>
                    <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Transações" />
            </ListItem>
        </Tooltip>
        <Tooltip title="Saldo por conta" aria-label="Saldo por conta">
            <ListItem button onClick={() => goTo(props, 'balance-per-account')}>
                <ListItemIcon>
                    <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="Saldo por conta" />
            </ListItem>
        </Tooltip>
        <Tooltip title="Saldo por categoria" aria-label="Saldo por categoria">
            <ListItem button onClick={() => goTo(props, 'balance-per-category')}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Saldo por categoria" />
            </ListItem>
        </Tooltip>
        <Tooltip title="Saldo futuro" aria-label="Saldo futuro">
            <ListItem button onClick={() => goTo(props, 'future-balance')}>
                <ListItemIcon>
                    <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary="Saldo futuro" />
            </ListItem>
        </Tooltip>
    </div>
);

export default withRouter(ListItems);