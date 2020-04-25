/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
// import Table from "components/Table/Table.js";
// import Card from "components/Card/Card.js";
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

// import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Button from '@material-ui/core/Button';

// import Table from "@material-ui/core/Table";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";

import Paper from '@material-ui/core/Paper';

import Modal from '@material-ui/core/Modal';

import Table from '../../components/Table/Table.js';

const useStyles = makeStyles(styles);

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  },

  tableData: {
    fontSize: '0.8125rem',
    fontWeight: '400',
    fontFamily: 'Ubuntu'
  }
};

const tableHead = [
  'Id',
  'Name',
  'Description',
  'Sub Class',
  'Unit',
  'Vendor Id',
  'Purchase Price',
  'BU Price',
  'Sale Price',
  'Bar Code',
  'Edit',
  'Delete'
];

const tableData = [
  {
    id: '1',
    name: 'Cotton',
    desc:
      'Cotton is of the best quality. We ensure it we will provide the quality at its best',
    sub_class: 'Garments',
    unit: 'Levis',
    vendor_id: '23',
    purchase_price: '100',
    bu_price: '500',
    sales_price: '250',
    bar_code: '023333022'
  },
  {
    id: '2',
    name: 'Wool',
    desc:
      'Cotton is of the best quality. We ensure it we will provide the quality at its best',
    sub_class: 'Garments',
    unit: 'Levis',
    vendor_id: '23',
    purchase_price: '100',
    bu_price: '500',
    sales_price: '250',
    bar_code: '023333022'
  },
  {
    id: '3',
    name: 'Silk',
    desc:
      'Cotton is of the best quality. We ensure it we will provide the quality at its best',
    sub_class: 'Garments',
    unit: 'Levis',
    vendor_id: '23',
    purchase_price: '100',
    bu_price: '500',
    sales_price: '250',
    bar_code: '023333022'
  },
  {
    id: '4',
    name: 'Jeans',
    desc:
      'Cotton is of the best quality. We ensure it we will provide the quality at its best',
    sub_class: 'Garments',
    unit: 'Levis',
    vendor_id: '23',
    purchase_price: '100',
    bu_price: '500',
    sales_price: '250',
    bar_code: '023333022'
  },
  {
    id: '5',
    name: 'Leather',
    desc:
      'Cotton is of the best quality. We ensure it we will provide the quality at its best',
    sub_class: 'Garments',
    unit: 'Levis',
    vendor_id: '23',
    purchase_price: '100',
    bu_price: '500',
    sales_price: '250',
    bar_code: '023333022'
  },
  {
    id: '6',
    name: 'Cotton',
    desc:
      'Cotton is of the best quality. We ensure it we will provide the quality at its best',
    sub_class: 'Garments',
    unit: 'Levis',
    vendor_id: '23',
    purchase_price: '100',
    bu_price: '500',
    sales_price: '250',
    bar_code: '023333022'
  },
  {
    id: '7',
    name: 'Cotton',
    desc:
      'Cotton is of the best quality. We ensure it we will provide the quality at its best',
    sub_class: 'Garments',
    unit: 'Levis',
    vendor_id: '23',
    purchase_price: '100',
    bu_price: '500',
    sales_price: '250',
    bar_code: '023333022'
  },
  {
    id: '8',
    name: 'Cotton',
    desc:
      'Cotton is of the best quality. We ensure it we will provide the quality at its best',
    sub_class: 'Garments',
    unit: 'Levis',
    vendor_id: '23',
    purchase_price: '100',
    bu_price: '500',
    sales_price: '250',
    bar_code: '023333022'
  }
];

export default function Items(props) {
  const classes = useStyles();

  const [addItem, setaddItem] = useState(false);
  const [editItem, seteditItem] = useState(false);
  const [deleteItem, setdeleteItem] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const addNewItem = () => {
    let path = `items/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'AddItems' }
    });
  };

  function handleEdit(item) {
    let path = `items/next/edit`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'EditItems', selectedItem: item }
    });
  }

  function handleDelete() {
    setModalVisible(true);
  }

  const obj = {
    name: '',
    password: ''
  };
  console.log(Object.keys(obj).length);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={addNewItem}
            style={{ width: 65, height: 65, borderRadius: 65 / 2 }}
            variant="contained"
            color="primary"
          >
            <i className="zmdi zmdi-plus zmdi-hc-3x"></i>
          </Button>
        </div>
      </div>

      {/* <Table size="small" aria-label="a dense table" component={Paper} style={{ marginTop: '3%' }}>

          <TableHead >
            <TableRow style={{ borderWidth: 5, borderColor: 'black', borderRadius: 5 }}>
              {tableHead.map((item) => {
                return (
                  <TableCell colSpan={0.1} key={item}>
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

                    <TableCell  style={{ }}>
                      <span style={styles.tableData}>
                        {item.id}
                      </span>
                    </TableCell>

                    <TableCell >
                      <span style={styles.tableData}>{item.name}</span>
                    </TableCell>

                    <TableCell colSpan={1}>
                      <span style={styles.tableData}>{item.desc}</span>
                    </TableCell>

                    <TableCell> 
                      <span style={styles.tableData}>{item.sub_class}</span>
                    </TableCell>

                    <TableCell>
                      <span style={styles.tableData}>  {item.unit}</span>
                    </TableCell>

                    <TableCell>
                      <span style={styles.tableData}>  {item.vendor_id}</span>
                    </TableCell>

                    <TableCell >
                      <span style={styles.tableData}>  {item.purchase_price}</span>
                    </TableCell>

                    <TableCell >
                      <span style={styles.tableData}>{item.bu_price}</span>
                    </TableCell>

                    <TableCell >
                      <span style={styles.tableData}>  {item.sales_price}</span>
                    </TableCell>

                    <TableCell >
                      <span style={styles.tableData} >{item.bar_code}</span>
                    </TableCell>


                    <TableCell  onClick={() => handleEdit(item)} style={{ cursor: "pointer" }} className={classes.tableCell}>
                      <i className="zmdi zmdi-edit zmdi-hc-2x"></i>
                    </TableCell>


                    <TableCell  onClick={() => handleDelete()} style={{ cursor: "pointer" }} className={classes.tableCell}>
                      <i className="zmdi zmdi-delete zmdi-hc-2x"></i>
                    </TableCell>

                  </TableRow>
                );

              })
            }
          </TableBody>

        </Table> */}

      <Table
        tableData={tableData}
        tableHeading={tableHead}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <Modal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            width: '100%',
            height: '60%',
            alignSelf: 'center',
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <span
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25
            }}
          >
            Are you sure want to delete the item?
          </span>

          <div
            style={{
              display: 'flex',
              marginTop: '4%',
              justifyContent: 'space-evenly'
            }}
          >
            <Button onClick={() => setModalVisible(false)} variant="contained">
              Cancel
            </Button>

            <Button
              style={{ marginRight: '3%' }}
              onClick={() => setModalVisible(false)}
              variant="contained"
              color="primary"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

{
  /* <GridContainer>
<GridItem xs={12} sm={12} md={12}>
  <Card plain>
    <CardHeader plain color="primary">
      <h4 className={classes.cardTitleWhite}>Material Design Icons</h4>
      <p className={classes.cardCategoryWhite}>
        Handcrafted by our friends from{" "}
        <a
          href="https://design.google.com/icons/?ref=creativetime"
          target="_blank"
        >
          Google
        </a>
      </p>
    </CardHeader>
    <CardBody>
      <Hidden only={["sm", "xs"]}>
        <iframe
          className={classes.iframe}
          src="https://material.io/icons/"
          title="Icons iframe"
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      </Hidden>
      <Hidden only={["lg", "md"]}>
        <GridItem xs={12} sm={12} md={6}>
          <h5>
            The icons are visible on Desktop mode inside an iframe. Since
            the iframe is not working on Mobile and Tablets please visit
            the icons on their original page on Google. Check the
            <a
              href="https://design.google.com/icons/?ref=creativetime"
              target="_blank"
            >
              Material Icons
            </a>
          </h5>
        </GridItem>
      </Hidden>
    </CardBody>
  </Card>
</GridItem>
</GridContainer> */
}
