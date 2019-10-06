import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Navigation from './screens/navigation/';
import Login from './screens/login/login';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Message from './components/message';

import ListGroup from './screens/group/list';
import EditGroup from './screens/group/edit';
import ListAccount from './screens/account/list';
import EditAccount from './screens/account/edit';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
});

const App = (props) => {
  const { classes } = props;

  let routes =
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>

  if (!!props.user) {
    routes =
      <Switch>
        <Route path="/groups/new" component={EditGroup} />
        <Route path="/groups/edit/:id" exact component={EditGroup} />
        <Route path="/groups" exact render={() => <ListGroup />} />
        <Route path="/accounts/new" component={EditAccount} />
        <Route path="/accounts/edit/:id" exact component={EditAccount} />
        <Route path="/accounts" exact render={() => <ListAccount />} />
        <Route exact path="/" render={() => <ListGroup />} />
      </Switch>
  } else if (props.location.pathname !== '/login') {
    routes = <Redirect to='/login' />
  }


  let loadingComponent = null;
  if (props.appMain.loading) {
    loadingComponent = <div className="loading">
      <CircularProgress></CircularProgress>
    </div>
  }

  return (
    <div className={classes.root}>
      {loadingComponent}
      <Message />
      <CssBaseline />
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={[styles.MainContainer, 'container'].join(' ')}>
          {routes}
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.account.user,
    appMain: state.appMain
  };
};

export default connect(mapStateToProps)(withRouter(withStyles(styles)(App)));

