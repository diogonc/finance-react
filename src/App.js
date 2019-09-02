import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './screens/navigation/';
import ListGroup from './screens/group/listGroup';
import EditGroup from './screens/group/editGroup';
import Login from './screens/login/login';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

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

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

const App = (props) => {
  const { classes } = props;

  let routes =
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Login} />
    </Switch>

  if (!!props.user) {
    routes =
      <Switch>
        <Route path="/groups/new" component={EditGroup} />
        <Route path="/groups/edit/:uuid" exact component={EditGroup} />
        <Route path="/groups" exact render={() => <ListGroup />} />
        <Route exact path="/" render={() => <ListGroup />} />
      </Switch>
  }

  return (
    <div className={classes.root}>
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

export default connect(mapStateToProps)(withStyles(styles)(App));

