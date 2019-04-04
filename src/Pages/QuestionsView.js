import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Menu from "../componentes/Menu";
import axios from 'axios';
import { TableFooter, Typography, Button } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: 30 * 3,
    marginBoton:50,
    overflowX: "auto",
    height: 320,
  },
  table: {
    minWidth: 700
  },
  fab: {
    margin: theme.spacing.unit,
    float: "right",
    marginTop:30 *2
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

class QuestionsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions:[]
        };
    }

    handleGetQuestions = () => {
        axios.get("https://obs-dom.herokuapp.com/user/2/question", config).then(result => {
            if(result.status === 200){
                this.setState({questions : result.data.response});
            }
        }).catch(error => {
            console.log(error);
        });
    }


render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Menu type="Atras" title="Preguntas" />
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Fecha</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.questions(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.created_at}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                 <TableCell align="right"><Button href="/CreateQuestion/${row.id}">Ver</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>

          </TableFooter>
        </Paper>
        <Fab color="primary" aria-label="Add" className={classes.fab} href="/CreateQuestion/0">
            <AddIcon />
        </Fab>
      </div>
      
    );
    }
}

QuestionsView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionsView);