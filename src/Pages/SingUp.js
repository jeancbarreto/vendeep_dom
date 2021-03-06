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
import Typography from '@material-ui/core/Typography';
import Axios from "axios";


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

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:"",
            username: "",
            password: "",
            rut:"",
            direccion:"",
            region_id:1,
            comuna_id:1,
            email:"",
            status:1,
            rol:0
        };
    }

handleChangeForm = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleClicRegister = () =>{
      console.log(this.state);
      Axios.post("https://obs-dom.herokuapp.com/users",{
        name:this.state.name,
        rut:this.state.rut,
        direction:this.state.direccion,
        region_id:this.state.region_id,
        commune_id:this.state.comuna_id,
        username:this.state.username,
        password:this.state.password,
        email:this.state.email,
        status:this.state.status,
        rol:this.state.rol
      }, config).then(result => {
        if(result.status === 200){
          alert("Usuario Creado");
          this.props.history.push("/");
        }
      }).catch(error => {
        console.log(error);
      })
    }

    render() {
        const {classes} = this.props
        return (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Registrarse
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">
                    Nombre Completo
                  </InputLabel>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={this.handleChangeForm("name")}
                    value={this.state.name}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="rut">RUT</InputLabel>
                  <Input
                    id="rut"
                    name="rut"
                    autoComplete="rut"
                    autoFocus
                    onChange={this.handleChangeForm("rut")}
                    value={this.state.rut}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={this.handleChangeForm("username")}
                    value={this.state.username}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleChangeForm("email")}
                    value={this.state.email}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="direccion">Direccion</InputLabel>
                  <Input
                    id="direccion"
                    name="direccion"
                    autoComplete="direccion"
                    autoFocus
                    onChange={this.handleChangeForm("direccion")}
                    value={this.state.direccion}
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleChangeForm("password")}
                    value={this.state.password}
                  />
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={e => this.handleClicRegister()}
                >
                  Registrarse
                </Button>
              </form>
            </Paper>
          </main>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);