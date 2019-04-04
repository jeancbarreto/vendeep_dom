import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Cookies from "universal-cookie";
import Typography from '@material-ui/core/Typography';
import axios from "axios";


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        //marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        marginLeft: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isConneted:false
        };
    }

    handleChangeForm = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    

    handleLoginUser = () =>{
        axios.post("https://obs-dom.herokuapp.com/users/login", {
            username:this.state.username,
            password:this.state.password
        },config).then(result => {
            if(result.status === 200){
              if(result.data.user !== null){
                const cookies_ = new Cookies();
                cookies_.set("sad_as546_184sdad", result.data.user, { path: "/" });
                if(result.data.user.rol === 0){
                  window.location.replace("/Questions");
                }else{
                  window.location.replace("/AdminView");
                }
                
              }else{
                alert("Por favor ingrese credenciales validas")
              }
            }
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const {classes} = this.props;
        return (
          <main className={classes.main}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-wpa-cj.appspot.com/o/image%2FAPP_DOM3.png?alt=media&token=7583f9b6-52fe-4a00-a8cf-db8d80168716"
              style={{ width: "100%" }}
            />
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Iniciar Sesión
              </Typography>
              <form
                className={classes.form}
                noValidate
                autoComplete="off"
              >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    name="username"
                    autoComplete="username"
                    value={this.state.username}
                    autoFocus
                    onChange={this.handleChangeForm("username")}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    value={this.state.password}
                    autoComplete="current-password"
                    onChange={this.handleChangeForm("password")}
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox value="remember" color="primary" />
                  }
                  label="Remember me"
                />
                <a href="/SingUp">Registrarse</a>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={e => this.handleLoginUser()}
                >
                  Iniciar Sesión
                </Button>
              </form>
            </Paper>
          </main>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);