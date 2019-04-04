import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  BuildForm,
  CreateJSONForm,
  CreateHtmlFormNew
} from "../dataFake/csForm";
import Modal from "@material-ui/core/Modal";
import FormControl from '@material-ui/core/FormControl';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuCreate from "../componentes/MenuCreateForm";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Droppable } from "react-drag-and-drop";
import Axios from "axios";
import { Button } from "@material-ui/core";

const styles = theme => ({
  root: {
    height:450
  },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


class CreateviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Formulario: {},
      htmlNew: "<div>",
      countElement: 0,
      componentSeleted: "",
      open: false,
      valorLabel:"",
      OptionSelect:[]
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleElementChange_ = e => {
    if (e.target.tagName === "BUTTON") {
      this.setState({ componentSeleted: e.target.parentNode.id });
      this.setState({ open: true });
    }
  };

  CreateForm = e => {
    var componente = document.getElementById(
      "" + this.state.componentSeleted + ""
    );
    var elemento = "";
    if (componente !== "") {
      elemento = componente.childNodes[2].type;
    }

    if (elemento === "text") {
    const { classes } = this.props;
      return (
        <form>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="labelNew">
                Nombre Completo
             </InputLabel>
            <Input
                id="labelNew"
                name="labelNew"
                autoComplete="name"
                autoFocus
            />
        </FormControl>
        <FormControlLabel
            control={
                <Checkbox
                    checked={this.state.open}
                    value="checkedB"
                    color="primary"
                />
            }
            label="Es Requerido"
        />
        <Button onClick={e => this.onSaveForm(this.state.componentSeleted, this, e)}>Guardar</Button>
        </form>
      );
    }
  };

  onSaveForm = (id, newform, e) =>{
      console.log("id de componete modificado", id);
      console.log("Formulario nuevo", newform);
  }

  onDrop(data) {
    this.setState({ countElement: this.state.countElement + 1 });
    this.setState({
      htmlNew: CreateHtmlFormNew(
        data,
        this.state.htmlNew,
        this.state.countElement
      )
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div id="form_parent">
        <MenuCreate />
        <hr />
        <hr />
        <br />
        <br />
        <main>
          <div className={classes}>
            <Droppable onDrop={this.onDrop.bind(this)} types={["formelements"]}>
              <Paper className={classes.root} elevation={1}>
                <div
                  dangerouslySetInnerHTML={{ __html: this.state.htmlNew }}
                  onClick={e => this.handleElementChange_(e)}
                />
              </Paper>
            </Droppable>
          </div>
        </main>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Editar Elemento
            </Typography>
            {this.state.open === true ? this.CreateForm() : ""}
          </div>
        </Modal>
      </div>
    );
  }
}

CreateviewForm.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(CreateviewForm);
