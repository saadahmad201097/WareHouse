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
import Paper from '@material-ui/core/Paper';
import Notification from 'components/Snackbar/Notification.js';
import ConfirmationModal  from '../../components/Modal/confirmationModal';

import axios from 'axios';
import { getBuInventoryUrl, deleteBuInventoryUrl } from '../../public/endpoins';

import Loader from 'react-loader-spinner';

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

const tableHeading = [
  'Bu Id',
  'Item Id',
  'Qty',
  'Edit',
  'Delete'
];

const tableDataKeys = [
    "buId",
    "itemId",
    "qty"
]


export default function BuInventory(props) {

    const classes = useStyles();
    const [buInventories, setBuInventories] = useState('');
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

    function getBuInventory() {
        axios.get(getBuInventoryUrl).then(res => {
            if(res.data.success) {
                setBuInventories(res.data.data);
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
        getBuInventory();
    }, []);

  const addNewItem = () => {
    let path = `buinventory/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'add' }
    });
  };

  function handleEdit(item) {
    let path = `buinventory/next/edit`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'edit', selectedItem: item }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBuInventory() {
    const params = {
      _id: deleteItem
    };

    axios.delete(deleteBuInventoryUrl + '/' + params._id).then(res => {
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
      {buInventories ? (
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
            <Table
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
                {buInventories.map((data, index) => {
                    return (
                        <TableRow key={data._id} className={classes.tableBodyRow}>
                        <TableCell>
                            <span style={styles.tableData}>{data.buId}</span>
                        </TableCell>

                        <TableCell colSpan={1}>
                            <span style={styles.tableData}>{data.itemId}</span>
                        </TableCell>

                        <TableCell>
                            <span style={styles.tableData}>{data.qty}</span>
                        </TableCell>

                        {handleEdit ? (
                            <TableCell
                            onClick={() => handleEdit(data)}
                            style={{ cursor: 'pointer' }}
                            className={classes.tableCell}
                            >
                            <i className="zmdi zmdi-edit zmdi-hc-2x"></i>
                            </TableCell>
                        ) : (
                            undefined
                        )}

                        {handleDelete ? (
                            <TableCell
                            onClick={() => handleDelete(data._id)}
                            style={{ cursor: 'pointer' }}
                            className={classes.tableCell}
                            >
                            <i className="zmdi zmdi-delete zmdi-hc-2x"></i>
                            </TableCell>
                        ) : (
                            undefined
                        )}
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
        </div>

        {/* end table */}

            <ConfirmationModal modalVisible={modalVisible} 
                msg="Are you sure want to delete the record?"
                hideconfirmationModal={()=>setModalVisible(false)}
                onConfirmDelete={()=> deleteBuInventory()}
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