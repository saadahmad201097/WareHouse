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
import Table from '../../components/Table/Table.js';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';


import { getBusinessUnitUrl, deleteBusinessUnitUrl, addBusinessUnitUrl } from '../../public/endpoins';


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

  tableData: { fontSize: '0.8125rem', fontWeight: '400', fontFamily: 'Ubuntu' }
};

const tableHeading = [
  'BU Name',
  'BU Head',
  "Status",
  "Actions"

];

const tableDataKeys = [
 
'buName',
'description',
'buHead',
'timeStamp'


];
export default function Items(props) {
  const classes = useStyles();

  const [itemsArray, setItem] = useState('');
  const [addItem, setaddItem] = useState(false);
  const [editItem, seteditItem] = useState(false);
  const [deleteItem, setdeleteItem] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  async function getItems() {
    const response = await axios
      .get(getBusinessUnitUrl)
      .then(res => {
        if (res.data.success) {
          // console.log('response of items', res.data.data);
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
        return res;
      })
      .catch(e => {
        console.log('error is ', e);
      });

    if (response && response.status === 200) {
      setItem(response.data.data);
      console.log('res of BUs===>>>', response.data.data);
    }
  }

  useEffect(() => {
    console.log('use effect called');
    getItems();
  }, []);



  const addNewItem = () => {
    let path = `businessunit/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'Add Business Unit' }
    });
  };

  function handleEdit(item) {
    let path = `businessunit/next/edit`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'Edit Business Unit', selectedItem: item }
    });
  }

  function handleDelete() {
    setModalVisible(true);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
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

{itemsArray?
        <Table
          tableData={itemsArray.businessUnit}
          tableDataKeys={tableDataKeys}
          tableHeading={tableHeading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
:undefined}
      </GridItem>

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
    </GridContainer>
  );
}
