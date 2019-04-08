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
    Div_Select:{
      height: 95,
      width: '100%',
      border: 'double',
      background: '#dfdfdf',
    }
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
      valorOption:"",
      textOption:"",
      OptionSelect:[],
      validForm:""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleElementChange_ = e => {
    if (
      e.target.tagName === "BUTTON" &&
      e.target.id !== "btnDeletecontrol"
    ) {
      this.setState({ componentSeleted: e.target.parentNode.id });
      this.setState({ open: true });
    }else{
      //console.log(this.state.componentSeleted);
      document.getElementById(e.target.parentNode.id).remove();
      this.setState({ htmlNew: document.getElementById("form_elements_new").firstChild.innerHTML })
      //this.state.htmlNew.children(e.target.parentNode.id).remove();
    }
  };

  handleChangeForm = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
//
  AddOptionForSelectControl = (event) =>{
    if(this.state.textOption === "" || this.state.valorOption === ""){
      alert("Ingresar el valor o texto de la opción agregar");
    }else{
      var valor = [
       this.state.textOption,
       this.state.valorOption
      ];
      this.state.OptionSelect.push(valor);
      this.setState({textOption : "", valorOption: ""});
    }
  }
/// funcion que crea el formulario de edición del componente seleccionado
  CreateForm = e => {
    var componente = document.getElementById(
      "" + this.state.componentSeleted + ""
    );
    var elemento = "";
    if (componente !== "") {
      if (componente.childNodes.length > 2){
        elemento = componente.childNodes[3].type;
      } else{
        elemento = "h5"
      }
      console.log(elemento);
    }

    const { classes } = this.props;
    switch(elemento)
    {
      case "text":
        return (
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="valorLabel">Nombre Completo</InputLabel>
              <Input
                id="valorLabel"
                name="valorLabel"
                autoComplete="name"
                autoFocus
                value={this.state.valorLabel}
                onChange={this.handleChangeForm("valorLabel")}
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
            <Button
              onClick={e =>
                this.onSaveForm(this.state.componentSeleted, this, e)
              }
            >
              Guardar
          </Button>
          </form>
        );
      break;
      case "textarea":
        return (
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="valorLabel">
                Nombre Completo
              </InputLabel>
              <Input
                id="valorLabel"
                name="valorLabel"
                autoComplete="name"
                autoFocus
                value={this.state.valorLabel}
                onChange={this.handleChangeForm("valorLabel")}
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
            <Button
              onClick={e =>
                this.onSaveForm(this.state.componentSeleted, this, e)
              }
            >
              Guardar
            </Button>
          </form>
        );
      break;
      case "h5":
        return (
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="valorLabel">
                Titulo
              </InputLabel>
              <Input
                id="valorLabel"
                name="valorLabel"
                autoComplete="name"
                autoFocus
                value={this.state.valorLabel}
                onChange={this.handleChangeForm("valorLabel")}
              />
            </FormControl>
            <Button
              onClick={e =>
                this.onSaveForm(this.state.componentSeleted, this, e)
              }
            >
              Guardar
            </Button>
          </form>
        );
      break;
      case "select-one":
        return (
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="valorLabel">
                Nombre Completo
              </InputLabel>
              <Input
                id="valorLabel"
                name="valorLabel"
                autoComplete="name"
                autoFocus
                value={this.state.valorLabel}
                onChange={this.handleChangeForm("valorLabel")}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="valorLabel">Texto opción</InputLabel>
              <Input
                id="valorLabel"
                name="valorLabel"
                autoComplete="name"
                autoFocus
                value={this.state.textOption}
                onChange={this.handleChangeForm("textOption")}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="valorLabel">valor opción</InputLabel>
              <Input
                id="valorLabel"
                name="valorLabel"
                autoComplete="name"
                autoFocus
                value={this.state.valorOption}
                onChange={this.handleChangeForm("valorOption")}
              />
            </FormControl>
            <Button onClick={e => this.AddOptionForSelectControl(e)}>
              Add+
            </Button>
            <div id="opcion_select" className={classes.Div_Select}>{this.state.OptionSelect}</div>
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
            <Button
              onClick={e =>
                this.onSaveForm(this.state.componentSeleted, this, e)
              }
            >
              Guardar
            </Button>
          </form>
        );
      break;
    }

   
    
  };
///Funcion que guarda el formulario y lo setea
  onSaveForm = (id, newform, e) =>{
    var html_ = document.getElementById(id);
    var hijos = html_.childNodes;

    for(var i in hijos){
      switch (hijos[i].tagName){
        case "LABEL":
         hijos[i].innerText = this.state.valorLabel;
        break;
        case "SELECT":
          if(this.state.OptionSelect.length > 0){
            this.state.OptionSelect.map(elemento => {
              var option = document.createElement("option");
              option.text = elemento[0];
              option.value = elemento[1];
              hijos[i].add(option);
            })
          }
        break;
        case "H5":
          hijos[i].innerText = this.state.valorLabel;
        break;
      }
    }
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
            <Droppable onDrop={this.onDrop.bind(this)} types={["formelements"]} id="form_elements_new">
              <Paper className={classes.root} elevation={1}>
                <div
                  dangerouslySetInnerHTML={{ __html: this.state.htmlNew }}
                  onClick={e => this.handleElementChange_(e)}
                />
              </Paper>
            </Droppable>
          </div>
          <Button color="primary" centerRipple
            variant="contained">
              Guardar Formularío
          </Button>
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
