/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from '@material-ui/core/Button';
import Table from '../../components/Table/Table.js';
import ConfirmationModal  from '../../components/Modal/confirmationModal';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';
import { getBusinessUnitUrl, deleteBusinessUnitUrl } from '../../public/endpoins';

const tableHeading = [
  'BU Name',
  'Description',
  "Bu Head",
  "Actions"
];
const tableDataKeys = [
  'buName',
  'description',
  'buHead'
];
const actions = {edit: true, delete: true};

export default function Items(props) {

  const [businessUnits, setBusinessUnits] = useState('');
  const [systemAdmins, setSystemAdmins] = useState(false);
  const [deleteItem, setdeleteItem] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  function getBusinessUnits() {
    axios.get(getBusinessUnitUrl).then(res => {
        if (res.data.success) {
          setBusinessUnits(res.data.data.businessUnit);
          setSystemAdmins(res.data.data.systemAdmin)
        }
        else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
        return res;
      })
      .catch(e => {
        console.log('error is ', e);
      });
  }

  useEffect(() => {
    getBusinessUnits();
  }, []);



  const addNewItem = () => {
    let path = `businessunit/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'add', systemAdmins }
    });
  };

  function handleEdit(rec) {
    let path = `businessunit/next/edit`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'edit', selectedItem: rec, systemAdmins }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBusinessUnit() {
    const params = {
    _id: deleteItem
    };

    axios.delete(deleteBusinessUnitUrl + '/' + params._id).then(res => {
        if (res.data.success) {
          setdeleteItem('');
          setModalVisible(false);
          window.location.reload(false);
        }
        else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
        return res;
    })
    .catch(e => {
      console.log('error while deletion ', e);
    });
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

        {businessUnits?
          <Table
            tableData={businessUnits}
            tableDataKeys={tableDataKeys}
            tableHeading={tableHeading}
            action={actions}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        :undefined}
      </GridItem>


      <ConfirmationModal modalVisible={modalVisible} 
        msg="Are you sure want to delete the record?"
        hideconfirmationModal={()=>setModalVisible(false)}
        onConfirmDelete={()=> deleteBusinessUnit()}
        setdeleteItem={()=>setdeleteItem('')}
      />
    
    </GridContainer>
  );
}
