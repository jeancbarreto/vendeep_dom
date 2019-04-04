import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {BuildForm} from "../dataFake/csForm"
import Axios from "axios";

const styles = theme => ({

})

var htmlPrint = "";
class viewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
          
        };

        this.handleBuildForm();
    }
    
    handleBuildForm = () => {
       
        var jsonForm = {
            "Formulario": {
                "textbox": {
                    "name": "nombre_usuario",
                    "className": "",
                    "id": "nombre_usuario",
                    "label": "Esriba su nombre usuario",
                    "isRequired": true
                },
                "comboBox": {
                    "name": "TipoPregunta",
                    "id": "TipoPregunta",
                    "label": "Escoja una opción valida",
                    "options": [
                        {
                            "name": "FACTURA",
                            "value": "F"
                        },
                        {
                            "name": "BOLETA",
                            "value": "B"
                        }
                    ]
                },
                "textarea": {
                    "name": "contexto",
                    "id": "contexto",
                    "label": "Explique su pregunta"
                },
                "File": {
                    "name": "file",
                    "id": "File",
                    "label":"Ingrese su archivo"
                },
            }
        }
        
        htmlPrint = BuildForm(jsonForm);
        //let div = document.getElementById("form_parent");
        //div.innerHTML = htmlPrint;
    }

    render() {
        const { classes } = this.props
        return (
            <div id="form_parent" className={classes.main} dangerouslySetInnerHTML={{__html : htmlPrint}}>
                
            </div>
        )
    }
}

viewForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(viewForm);
