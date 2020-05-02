/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Notification from 'components/Snackbar/Notification.js';
import Paper from '@material-ui/core/Paper';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import CustomTable from '../../components/Table/Table';
import ConfirmationModal  from '../../components/Modal/confirmationModal';
import axios from 'axios';
import { getVendorUrl, deleteVendorUrl } from '../../public/endpoins';

import Loader from 'react-loader-spinner';

const useStyles = makeStyles(styles);

const tableHeading = [
  'Name',
  'Phone Number',
  'status',
  'Fax',
  'Action'
];
const tableDataKeys = [
    'name',
    'phoneNumber',
    'status',
    'fax'
];


export default function BuReturn(props) {

    const classes = useStyles();
    const [vendors, setVendor] = useState('');
    const [systemAdmin, setSystemAdmin] = useState('');
    const [deleteItem, setdeleteItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [openNotification, setOpenNotification] = useState(false);

    if(openNotification) {
        setTimeout(() => {
        setOpenNotification(false);
        setErrorMsg("")
        }, 2000);
    }

    function getVendors() {
        axios.get(getVendorUrl).then(res => {
            if(res.data.success) {
                setVendor(res.data.data.vendor);
                setSystemAdmin(res.data.data.systemAdmin);
            }
            else if (!res.data.success) {
                setErrorMsg(res.data.error)
                setOpenNotification(true);
            }
            return res;
        })
        .catch(e => {
            console.log('error: ', e);
        });
    }

    useEffect(() => {
        getVendors();
    }, []);

    const addNewItem = () => {
        let path = `vendor/next/add`;
        props.history.push({
            pathname: path,
            state: { comingFor: 'add', systemAdmin }
        });
    };

    function handleEdit(rec) {
        let path = `vendor/next/edit`;
        props.history.push({
            pathname: path,
            state: { comingFor: 'edit', selectedItem: rec, systemAdmin }
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

        axios.delete(deleteVendorUrl + '/' + params._id).then(res => {
            if (res.data.success) {
            setdeleteItem('');
            setModalVisible(false);
            window.location.reload(false);
            }
            else if (!res.data.success) {
                setErrorMsg(res.data.error)
                setOpenNotification(true);
            }
            return res;
        })
        .catch(e => {
            console.log('error while deletion ', e);
        });
    }

    return (
        <div>
        {vendors ? (
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
                    tableData={vendors}
                    tableDataKeys={tableDataKeys}
                    tableHeading={tableHeading}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />                   
            </div>


                <ConfirmationModal modalVisible={modalVisible} 
                    msg="Are you sure want to delete the record?"
                    hideconfirmationModal={()=>setModalVisible(false)}
                    onConfirmDelete={()=> deleteBuReturn()}
                    setdeleteItem={()=>setdeleteItem('')}
                />

                <Notification msg={errorMsg} open={openNotification} />
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