/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
// import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Button from '@material-ui/core/Button';


import Table from "@material-ui/core/Table";
import Card from "@material-ui/core/Card";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";


import Paper from '@material-ui/core/Paper';

import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles(styles);



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },


  tableData: { fontSize: '0.8125rem', fontWeight: '400', fontFamily: "Ubuntu" }


};

const tableHead = ["Id", "Name", "Description", "BU Head", "Created By", "Timestamp", "Edit", "Delete"]


const tableData = [
  { id: "1", name: "Levis and Denim", desc: "Cotton is of the best quality. We ensure it we will provide the quality at its best", BU_Head: "ahmad ali", created_by: "10", Timestamp: "23/Jan/2008 1:00pm" },
  { id: "2", name: "Levis and Denim", desc: "Cotton is of the best quality. We ensure it we will provide the quality at its best", BU_Head: "ahmad ali", created_by: "10", Timestamp: "23/Jan/2008 1:00pm" },
  { id: "3", name: "Levis and Denim", desc: "Cotton is of the best quality. We ensure it we will provide the quality at its best", BU_Head: "ahmad ali", created_by: "10", Timestamp: "23/Jan/2008 1:00pm" },
  { id: "4", name: "Levis and Denim", desc: "Cotton is of the best quality. We ensure it we will provide the quality at its best", BU_Head: "ahmad ali", created_by: "10", Timestamp: "23/Jan/2008 1:00pm" },
  { id: "5", name: "Levis and Denim", desc: "Cotton is of the best quality. We ensure it we will provide the quality at its best", BU_Head: "ahmad ali", created_by: "10", Timestamp: "23/Jan/2008 1:00pm" },
  { id: "6", name: "Levis and Denim", desc: "Cotton is of the best quality. We ensure it we will provide the quality at its best", BU_Head: "ahmad ali", created_by: "10", Timestamp: "23/Jan/2008 1:00pm" },
  { id: "7", name: "Levis and Denim", desc: "Cotton is of the best quality. We ensure it we will provide the quality at its best", BU_Head: "ahmad ali", created_by: "10", Timestamp: "23/Jan/2008 1:00pm" },
  { id: "8", name: "Levis and Denim", desc: "Cotton is of the best quality. We ensure it we will provide the quality at its best", BU_Head: "ahmad ali", created_by: "10", Timestamp: "23/Jan/2008 1:00pm" },

]

export default function Items(props) {
  const classes = useStyles();

  const [addItem, setaddItem] = useState(false)
  const [editItem, seteditItem] = useState(false)
  const [deleteItem, setdeleteItem] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)




  const addNewItem = () => {
    let path = `businessunit/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "Add Business Unit" }
    });
  }


  function handleEdit(item) {
    let path = `businessunit/next/edit`;
    props.history.push({
      pathname: path,
      state: { comingFor: "Edit Business Unit", selectedItem: item }
    });
  }


  function handleDelete() {
    setModalVisible(true)
  }



  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>

        <div style={{ display: "flex", justifyContent: "space-between" }}>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={addNewItem} style={{ width: 65, height: 65, borderRadius: 65 / 2 }} variant="contained" color='primary'>
              <i className="zmdi zmdi-plus zmdi-hc-3x"></i>
            </Button>
          </div>

        </div>



        <Table aria-label="simple table" component={Paper} style={{ marginTop: '3%' }}>

          <TableHead >
            <TableRow style={{ borderWidth: 5, borderColor: 'black', borderRadius: 5 }}>
              {tableHead.map((item) => {
                return (
                  <TableCell key={item}>
                    <span style={{ color: 'black', fontFamily: "Ubuntu" }}>{item}</span>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {
              tableData.map(item => {
                return (

                  <TableRow key={item.id} className={classes.tableBodyRow}>

                    <TableCell>
                      <span style={styles.tableData}>{item.id}</span>
                    </TableCell>

                    <TableCell>
                      <span style={styles.tableData}>{item.name}</span>
                    </TableCell>

                    <TableCell style={{ minWidth: 200 }}>
                      <span style={styles.tableData}>{item.desc}</span>
                    </TableCell>

                    <TableCell>
                      <span style={styles.tableData}>{item.BU_Head}</span>
                    </TableCell>

                    <TableCell>
                      <span style={styles.tableData}>  {item.created_by}</span>
                    </TableCell>

                    <TableCell>
                      <span style={styles.tableData}>  {item.Timestamp}</span>
                    </TableCell>


                    <TableCell onClick={() => handleEdit(item)} style={{ cursor: "pointer" }} className={classes.tableCell}>
                      <i className="zmdi zmdi-edit zmdi-hc-2x"></i>
                    </TableCell>


                    <TableCell onClick={() => handleDelete()} style={{ cursor: "pointer" }} className={classes.tableCell}>
                      <i className="zmdi zmdi-delete zmdi-hc-2x"></i>
                    </TableCell>

                  </TableRow>
                );

              })
            }
          </TableBody>

        </Table>

      </GridItem>

      <Modal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"

      >
        <div style={{ width: '100%', height: "60%", alignSelf: "center", display: "flex", justifyContent: "center", flex: 1, flexDirection: "column" }}>
          <span style={{ color: 'white', textAlign: "center", fontWeight: 'bold', fontSize: 25 }}>Are you sure want to delete the item?</span>

          <div style={{ display: "flex", marginTop: '4%', justifyContent: "space-evenly" }}>

            <Button onClick={() => setModalVisible(false)} variant="contained">
              Cancel
            </Button>

            <Button style={{ marginRight: '3%' }} onClick={() => setModalVisible(false)} variant="contained" color='primary'>
              Done
            </Button>

          </div>
        </div>
      </Modal>



    </GridContainer>

  );
}
