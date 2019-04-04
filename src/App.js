import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import SwipeableViews from "react-swipeable-views";
import Login from "../src/Pages/SingIn";
import Register from "../src/Pages/SingUp";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "./componentes/Menu";
import Fade from "@material-ui/core/Fade";
import Cookies from "universal-cookie";
import './App.css';
import SingUp from '../src/Pages/SingUp';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    paddingTop: "13%",
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  rootList: {
    paddingTop: "1%",
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  rootTwo: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  container: {
    flexWrap: "wrap",
    textAlign: "center",
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  bottomMenu: {
    display: "block",
    width: "100%",
    position: "fixed",
    zIndex: 1000,
    bottom: 0
  },
  buttonSend: {
    marginTop: 4,
    width: "100%"
  },
  buttonUpload: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  image: {
    width: "100%",
    height: "100%"
  },
  hideContain:{
    display:'none'
  },
});


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      isConneted:false,
      isAdmin: false
    };

    
  }

  handleValidarUser = () => {
    const cookies_ = new Cookies();
    var user = cookies_.getAll("sad_as546_184sdad");
    console.log(user);
    if (user !== undefined && user !== null && user !== {} && user !== "" && user.length > 0) {
      if(user.rol === 1){
        this.setState({isAdmin : true})
      }

      this.setState({ isConneted: true });
      console.log(this.state.isConneted)
      }
    }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChange = (event, value) => {
    this.setState({
      value: value,
    });
  };

  handleValid = () =>{
    if (this.state.isConneted === false){
      if (this.state.isAdmin === false){
        return <Login />;
      }else{
        this.props.history.push("/AdminView");
      }
    }else{
      if (this.state.isAdmin){
        this.props.history.push("/AdminView");
      }else{
        this.props.history.push("/Questions");
      }
      
    }
  }

  render() {
    const {classes} = this.props;
    this.handleValidarUser();
    return (
      <div className="App">
        <Grid container className="conteint-body">
          <Grid item xs={12}>
            <TabContainer dir={classes.direction}>
             {this.handleValid()}
            </TabContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
