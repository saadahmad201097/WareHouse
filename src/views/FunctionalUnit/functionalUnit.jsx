/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import CustomTable from '../../components/Table/Table';
import ConfirmationModal from '../../components/Modal/confirmationModal';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';
import { getBuReturnUrl, deleteBuReturnUrl } from '../../public/endpoins';

import Loader from 'react-loader-spinner';

const useStyles = makeStyles(styles);

const tableHeading = [
  'Functional Unit Name',
  'FU Head',
  'Business Unit',
  'Status',
  'Action'
];
const tableDataKeys = ['fuName', ['fuHead', 'value'], ['buName', 'value'], ['status', 'value']];
const actions = {edit: true, delete: true};
const dummyData = [
  {
    fuName: 'FU Name',
    fuHead: 'FU Head Name',
    buName:  {_id:1, value:"First BU"},
    status: {_id:1, value:"Active"},
    desc: 'No desc',
    fuHead:  {_id:1, value:"First"},
  },
  {
    fuName: 'FU Name',
    fuHead: 'FU Head Name',
    buName: {_id:2, value:"Second BU"},
    status: {_id:2, value:"In Active"},
    desc: 'No desc',
    fuHead:    {_id:2, value:"Second"},
  },
  {
    fuName: 'FU Name',
    fuHead: 'FU Head Name',
    buName: {_id:1, value:"First BU"},
    status: {_id:2, value:"In Active"},
    desc: 'No desc',
    fuHead:    {_id:2, value:"Second"}

  },
  {
    fuName: 'FU Name',
    fuHead: 'FU Head Name',
    buName: {_id:2, value:"Second BU"},
    status: {_id:1, value:"Active"},
    desc: 'No desc',
    fuHead:    {_id:3, value:"Third"}

  },

];

export default function BuReturn(props) {
  const classes = useStyles();
  const [buReturn, setBuReturn] = useState('');
  const [items, setItems] = useState('');
  const [staff, setStaff] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');
  const [deleteItem, setdeleteItem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  // function getFunctionalUnit() {
  //     axios.get(getBuReturnUrl).then(res => {
  //         if(res.data.success) {
  //             setBuReturn(res.data.data.buReturn);
  //             setItems(res.data.data.items);
  //             setStaff(res.data.data.staff);
  //             setBusinessUnit(res.data.data.businessUnit);
  //         }
  //         else if (!res.data.success) {
                // ToastsStore.error(res.data.error);
  //         }
  //     })
  //     .catch(e => {
  //         console.log('error: ', e);
  //     });
  // }

  // useEffect(() => {
  //     getFunctionalUnit();
  // }, []);

  const addNewItem = () => {
    let path = `functionalunit/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'add', items, staff, businessUnit }
    });
  };

  function handleEdit(rec) {
    let path = `functionalunit/next/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
        items,
        staff,
        businessUnit
      }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBuReturn() {
    const params = {
      _id: deleteItem
    };

    axios
      .delete(deleteBuReturnUrl + '/' + params._id)
      .then(res => {
        if (res.data.success) {
          setdeleteItem('');
          setModalVisible(false);
          window.location.reload(false);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch(e => {
        console.log('error while deletion ', e);
      });
  }

  return (
    <div>
      {dummyData ? (
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

          <div>
            <CustomTable
              tableData={dummyData}
              tableDataKeys={tableDataKeys}
              tableHeading={tableHeading}
              action={actions}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>

          <ConfirmationModal
            modalVisible={modalVisible}
            msg="Are you sure want to delete the record?"
            hideconfirmationModal={() => setModalVisible(false)}
            onConfirmDelete={() => deleteBuReturn()}
            setdeleteItem={() => setdeleteItem('')}
          />

        </div>
      ) : (
        <div
          style={{
            width: '70%',
            height: '100%',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Loader type="TailSpin" color="red" height={50} width={50} />
        </div>
      )}
    </div>
  );
}
