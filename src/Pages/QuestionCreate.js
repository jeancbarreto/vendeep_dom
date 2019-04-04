import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import cookies from "universal-cookie";
import firebase from 'firebase';
import Cookies from "universal-cookie";
import Menu from "../componentes/Menu";
import axios from "axios";


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
    textField:{
        width :'100%'
    },
    buttonUpload:{
        width:'100%'
    }
});

const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};

class QuestionCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
    id:0,
    question: "",
    context: "",
    file: ""
    };
  }

    handleGetQuestion = () => {
        
    }

    handleValidarUser = () => {
        const cookies_ = new Cookies();
        var user = cookies_.getAll("sad_as546_184sdad");
        console.log(user);
        if (user !== {}) {
            this.setState({ isConneted: true });
            console.log(this.state.isConneted)
        }
    }

  handleChangeImageUploadProduct = e => {
    var fileName = e.target.files[0].name;
    var file = e.target.files[0];

    const storageBef = firebase
      .storage()
      .ref("/image//")
      .child(fileName);
    storageBef.put(file);
    storageBef.getDownloadURL().then(url => {
        this.setState({ file: url });
    });
      
    console.log(this.state.file);
  };

  handleChangeForm = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCreateProducts = () => {
      const cookies_ = new Cookies();
      const userid = cookies_.get("sad_as546_184sdad");
    axios
      .post(
        "https://obs-dom.herokuapp.com/users/question",
        {
          id: userid.id,
          question: this.state.question,
          context: this.state.context,
          file: this.state.file
        },
        config
      )
      .then(result => {
        if (result.status === 200) {
          alert("Pregunta Creada");
          this.setState({
            id: 0,
            question: "",
            context: "",
            file: ""
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  handlerControlPay = (e) => {
      console.log(e);
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <div>
          <Menu type="Atras" title="Crear Pregunta" />
        </div>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Crear Pregunta
          </Typography>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Pregunta"
              className={classes.textField}
              value={this.state.question}
              onChange={this.handleChangeForm("question")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Contexto"
              className={classes.textField}
              value={this.state.context}
             onChange={this.handleChangeForm("context")}
              margin="normal"
              variant="outlined"
            />
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file-two"
              onChange={e => this.handleChangeImageUploadProduct(e)}
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file-two">
              <Button
                variant="raised"
                component="span"
                className={classes.buttonUpload}
              >
                Subir Archivo
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonUpload}
              onClick={e => this.handleCreateProducts(e)}
            >
              Enviar Pregunta
            </Button>
          </form>
         
        </Paper>
      </main>
    );
  }
}

QuestionCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionCreate);