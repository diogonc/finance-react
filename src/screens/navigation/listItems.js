import React from 'react';
import { withRouter } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
        <ListItem button onClick={() => goTo(props, 'groups')}>
            <ListItemIcon>
                <SpeakerGroup />
            </ListItemIcon>
            <ListItemText primary="Agrupamentos" />
        </ListItem>
        <ListItem button onClick={() => goTo(props, 'accounts')}>
            <ListItemIcon>
                <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Contas" />
        </ListItem>
        <ListItem button onClick={() => goTo(props, 'categories')}>
            <ListItemIcon>
                <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
        </ListItem>
        <ListItem button onClick={() => goTo(props, 'transactions')}>
            <ListItemIcon>
                <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Transações" />
        </ListItem>
        <ListItem button onClick={() => goTo(props, 'balance-per-account')}>
            <ListItemIcon>
                <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Saldo por conta" />
        </ListItem>
        <ListItem button onClick={() => goTo(props, 'balance-per-category')}>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Saldo por categoria" />
        </ListItem>
        <ListItem button onClick={() => goTo(props, 'future-balance')}>
            <ListItemIcon>
                <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Saldo futuro" />
        </ListItem>
    </div>
);

export default withRouter(ListItems);