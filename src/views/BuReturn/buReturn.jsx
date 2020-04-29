/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// table
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import Button from '@material-ui/core/Button';
import Notification from 'components/Snackbar/Notification.js';
import Paper from '@material-ui/core/Paper';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import CustomTable from '../../components/Table/Table';
import ConfirmationModal  from '../../components/Modal/confirmationModal';
import axios from 'axios';
import { getBuReturnUrl, deleteBuReturnUrl } from '../../public/endpoins';

import Loader from 'react-loader-spinner';

const useStyles = makeStyles(styles);

const tableHeading = [
  'Bu ID',
  'Item Id',
  'Quantity',
  'Time Stamp',
  'Return Reason',
  'Batch Number',
  'Staff ID',
  'Action'
];
const tableDataKeys = [
    'buId',
    'itemId',
    'qty',
    'timeStamp',
    'returnReason',
    'batchNo',
    'staffId'
  ];


export default function BuReturn(props) {

    const classes = useStyles();
    const [buReturn, setBuReturn] = useState('');
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

    function getBuReturn() {
        axios.get(getBuReturnUrl).then(res => {
            if(res.data.success) {
                setBuReturn(res.data.data);
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
        getBuReturn();
    }, []);

    const addNewItem = () => {
        let path = `bureturn/next/add`;
        props.history.push({
            pathname: path,
            state: { comingFor: 'add' }
        });
    };

    function handleEdit(item) {
        let path = `bureturn/next/edit`;
        props.history.push({
            pathname: path,
            state: { comingFor: 'edit', selectedItem: item }
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

        axios.delete(deleteBuReturnUrl + '/' + params._id).then(res => {
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
        {buReturn ? (
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

            {/* table */}
            <div>

                <CustomTable 
                    tableData={buReturn}
                    tableDataKeys={tableDataKeys}
                    tableHeading={tableHeading}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
                    {/* <Table
                        tableData={itemsArray}
                        tableHeading={tableHeading}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    /> */}
                {/* <Table
                    size="small"
                    aria-label="a dense table"
                    component={Paper}
                    style={{ marginTop: '3%' }}
                >
                    <TableHead>
                    <TableRow
                        style={{ borderWidth: 5, borderColor: 'black', borderRadius: 5 }}
                    >
                        {tableHeading &&
                        tableHeading.map(item => {
                            return (
                            <TableCell colSpan={0.1} key={item}>
                                <span style={{ color: 'black', fontFamily: 'Ubuntu' }}>
                                {item}
                                </span>
                            </TableCell>
                            );
                        })}
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    {buReturn.map((data, index) => {
                        return (
                            <TableRow key={data._id} className={classes.tableBodyRow}>
                            <TableCell>
                                <span className={classes.tableData}>{data.buId}</span>
                            </TableCell>

                            <TableCell colSpan={1}>
                                <span className={classes.tableData}>{data.itemId}</span>
                            </TableCell>

                            <TableCell>
                                <span className={classes.tableData}>{data.qty}</span>
                            </TableCell>

                            <TableCell>
                                <span className={classes.tableData}>{data.timeStamp}</span>
                            </TableCell>

                            <TableCell>
                                <span className={classes.tableData}>{data.returnReason}</span>
                            </TableCell>

                            <TableCell>
                                <span className={classes.tableData}>{data.batchNo}</span>
                            </TableCell>

                            <TableCell>
                                <span className={classes.tableData}>{data.staffId}</span>
                            </TableCell>

                            <TableCell
                                onClick={() => handleEdit(data)}
                                style={{ cursor: 'pointer' }}
                                className={classes.tableCell}
                            >
                                <i className="zmdi zmdi-edit zmdi-hc-2x"></i>
                            </TableCell>

                            <TableCell
                                onClick={() => handleDelete(data._id)}
                                style={{ cursor: 'pointer' }}
                                // className={classes.tableCell}
                            >
                                <i className="zmdi zmdi-delete zmdi-hc-2x"></i>
                            </TableCell>
                            
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table> */}
            </div>

            {/* end table */}

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