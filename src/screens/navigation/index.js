import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from './listItems';
import * as actions from '../../redux/actions/navigationActions';
import * as accountActions from '../../redux/actions/accountActions';

const drawerWidth = 250;

const styles = theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: 10,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
});

const handleAccountOptionsOpen = (event, updateNavigationState, isMenuExpanded) => {
  updateNavigationState({ anchorEl: event.currentTarget, isMenuExpanded });
};

const handleAccountOpionsClose = (updateNavigationState, isMenuExpanded) => {
  updateNavigationState({ anchorEl: null, isMenuExpanded });
};

const logoff = (updateNavigationState, isMenuExpanded, logoffFunction) => {
  logoffFunction();
  updateNavigationState({ anchorEl: null, isMenuExpanded });
};

const handleNavigationMenuOpen = (props, updateNavigationState) => {
  updateNavigationState({ isMenuExpanded: true });
  props.toogleNavigation(true);
};

const handleNavigationMenuClose = (props, updateNavigationState) => {
  updateNavigationState({ isMenuExpanded: false });
  props.toogleNavigation(false);
};

const Navigation = props => {
  const [navigationState, updateNavigationState] = useState({
    anchorEl: props.anchorEl,
    isMenuExpanded: props.isMenuExpanded
  });

  useEffect(() => {
    updateNavigationState({ isMenuExpanded: props.isMenuExpanded, anchorEl: props.anchorEl });
  }, [props.isMenuExpanded, props.anchorEl]);

  const { anchorEl, isMenuExpanded } = navigationState;
  const { classes } = props;
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={() => handleAccountOpionsClose(updateNavigationState, props.isMenuExpanded)}
    >
      <MenuItem onClick={() => handleAccountOpionsClose(updateNavigationState, props.isMenuExpanded)}>Minha conta</MenuItem>
      <MenuItem onClick={() => logoff(updateNavigationState, props.isMenuExpanded, props.logoff)}>Sair</MenuItem>
    </Menu>
  );

  let loggedScreen;

  if (!!props.user)
    loggedScreen =
      <>
        <AppBar
          position="absolute"
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => handleNavigationMenuOpen(props, updateNavigationState)}
              className={classNames(
                classes.menuButton,
                isMenuExpanded && classes.menuButtonHidden,
              )}
            >  <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Close drawer"
              onClick={() => handleNavigationMenuClose(props, updateNavigationState)}
              className={classNames(
                classes.menuButton,
                !isMenuExpanded && classes.menuButtonHidden,
              )}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Financeiro
            </Typography>
            <Typography align="right">
              {props.user.name}
            </Typography>
            <IconButton
              aria-owns={isMenuExpanded ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={(event) => handleAccountOptionsOpen(event, updateNavigationState, props.isMenuExpanded)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

          </Toolbar>
        </AppBar>
        {renderMenu}
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !navigationState.isMenuExpanded && classes.drawerPaperClose),
          }}
          open={isMenuExpanded}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => handleNavigationMenuClose(props, updateNavigationState)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItems />
          </List>
        </Drawer>
      </>
  else
    loggedScreen = <>
      <AppBar
        position="absolute"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Financeiro
          </Typography>
        </Toolbar>
      </AppBar>
    </>

  return (
    <>
      {loggedScreen}
    </>
  );
}

const mapStateToProps = state => {
  return {
    ...state.navigation,
    user: state.account.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toogleNavigation: isMenuExpanded => dispatch(actions.toogleMenu(isMenuExpanded)),
    logoff: () => dispatch(accountActions.logoff())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navigation));