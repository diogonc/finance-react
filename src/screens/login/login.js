import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import * as actions from '../../redux/actions/accountActions';


const mapDispatchToProps = dispatch => {
  return {
    login: loginData => dispatch(actions.login(loginData)),
  };
};

const styles = theme => ({
  form: {
    maxWidth: '350px',
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
});

const submitForm = (event, props, loginData) => {
  event.preventDefault();

  props.login(loginData)
};

const Login = props => {
  const { classes } = props;
  let loginData = { username: '', password: '' };

  const [login, updateLogin] = useState({ ...loginData });
   

  return (
    <>
      <Typography component="h1" variant="h5">
        Login
        </Typography>
      <form className={classes.form} onSubmit={event => submitForm(event, props, login)}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">Usuário</InputLabel>
          <Input id="username" name="username" autoFocus
            value={login.username}
            onChange={event =>
              updateLogin({ ...login, username: event.target.value })
            } />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Senha</InputLabel>
          <Input name="priority" type="password" id="priority"
            value={login.password}
            onChange={event =>
              updateLogin({ ...login, password: event.target.value })
            } />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
        >
          Entrar
          </Button>
      </form>
    </>
  );
};


export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Login)));
