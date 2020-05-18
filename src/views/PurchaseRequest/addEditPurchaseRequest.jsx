/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import tableStyles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  addPurchaseRequestUrl,
  updatePurchaseRequestUrl,
  getSearchedItemUrl
} from '../../public/endpoins';

import Paper from '@material-ui/core/Paper';

import cookie from 'react-cookies';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};
const useStyles = makeStyles(tableStyles);

function AddEditPurchaseRequest(props) {
  const classes = useStyles();
  const initialState = {
    _id: '',
    requestNo: '',
    generatedBy: '',
    date: new Date(),
    vendorId: '',
    status: '',
    itemCode: '',
    name: '',
    description: '',
    currentQty: '',
    reqQty: '',
    comments: '',
    vendors: [],
    statues: [],
    items: [],
    selectedRow: ''
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    _id,
    requestNo,
    generatedBy,
    date,
    vendorId,
    status,
    itemCode,
    name,
    description,
    currentQty,
    reqQty,
    comments,
    vendors,
    statues,
    items,
    selectedRow
  } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = value => {
    dispatch({ field: 'date', value });
  };

  function validateForm() {
    return (
      requestNo.length > 0 &&
      generatedBy.length > 0 &&
      date.length > 0 &&
      vendorId.length > 0 &&
      status.length > 0 &&
      itemCode.length > 0 &&
      name.length > 0 &&
      description.length > 0 &&
      currentQty > 0 &&
      reqQty > 0 &&
      comments.length > 0
    );
  }

  const [comingFor, setcomingFor] = useState('');
  const [vendorsArray, setVendors] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false);
  const [itemFound, setItem] = useState('');

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'));

    setcomingFor(props.history.location.state.comingFor);
    setVendors(props.history.location.state.vendors);

    const selectedRec = props.history.location.state.selectedItem;
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          dispatch({ field: key, value: val._id });
        } else {
          dispatch({ field: key, value: val });
        }
      });
    }
    if (props.history.location.state.vendors) {
      dispatch({
        field: 'vendors',
        value: props.history.location.state.vendors
      });
    }
    if (props.history.location.state.statues) {
      dispatch({
        field: 'statues',
        value: props.history.location.state.statues
      });
    }
    if (props.history.location.state.items) {
      dispatch({ field: 'items', value: props.history.location.state.items });
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        requestNo,
        generatedBy,
        date,
        vendorId,
        status,
        itemCode,
        name,
        description,
        currentQty,
        reqQty,
        comments
      };
      axios
        .post(addPurchaseRequestUrl, params)
        .then(res => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch(e => {
          console.log('error after adding purchase request', e);
          setOpenNotification(true);
          setErrorMsg('Error while adding the purchase request');
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        _id,
        requestNo,
        generatedBy,
        date,
        vendorId,
        status,
        itemCode,
        name,
        description,
        currentQty,
        reqQty,
        comments
      };
      axios
        .put(updatePurchaseRequestUrl, params)
        .then(res => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch(e => {
          console.log('error after updating purchase request', e);
          setOpenNotification(true);
          setErrorMsg('Error while editing the purchase request');
        });
    }
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg('');
    }, 2000);
  }

  const handleSearch = e => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 3) {
      axios
        .get(getSearchedItemUrl + '/' + e.target.value)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              // console.log(res.data.data.items);
              setItemFoundSuccessfully(true);
              setItem(res.data.data.items);
            } else {
              setItemFoundSuccessfully(false);
              setItem('');
            }
          } else if (!res.data.success) {
          }
        })
        .catch(e => {
          console.log('error after adding purchase request', e);
          setOpenNotification(true);
          setErrorMsg('Error while adding the purchase request');
        });
    }
  };

  return (
    <div className="container">
      <h1>
        <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
      </h1>
      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            requestNo="requestNo"
            label="Request No"
            type="text"
            variant="outlined"
            disabled={true}
            value={requestNo}
            onChange={onChangeValue}
            error={!requestNo && isFormSubmitted}
          />
        </div>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="generatedBy"
            label="Generated By"
            type="text"
            variant="outlined"
            disabled={true}
            value={
              comingFor === 'add'
                ? currentUser
                  ? currentUser.name
                  : ''
                : generatedBy
            }
            onChange={onChangeValue}
            error={!generatedBy && isFormSubmitted}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              inputVariant="outlined"
              onChange={onChangeDate}
              fullWidth
              // value={date}
              disabled={true}
              value={comingFor === 'add' ? new Date() : date}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col-md-4" style={styles.inputContainer}>
          <InputLabel id="vendorId-label">Vendor</InputLabel>
          <Select
            fullWidth
            id="vendorId"
            name="vendorId"
            value={vendorId}
            onChange={onChangeValue}
            label="Vendor"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {vendorsArray &&
              vendorsArray.map(val => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.englishName}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
        <div className="col-md-4" style={styles.inputContainer}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            fullWidth
            id="status"
            name="status"
            value={status}
            onChange={onChangeValue}
            label="Status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statues.map(val => {
              return (
                <MenuItem key={val.key} value={val.value}>
                  {val.value}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-12">
          <TextField
            fullWidth
            name="searchQuery"
            label="Search Items by name or code"
            type="search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            // error={!generatedBy && isFormSubmitted}
          />
        </div>
      </div>

      {searchQuery ? (
        <Paper
          style={{ width: ' 100%',  marginTop: 20 }}
          elevation={3}
        >
          {itemFoundSuccessfull ? (
            itemFound && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Item Code</TableCell>
                    <TableCell>Puschase Price</TableCell>
                    <TableCell  align="center">Description</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {itemFound.map(item => {
                    return (
                      <TableRow  style={{cursor:"pointer"}}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.itemCode}</TableCell>
                        <TableCell>{item.purchasePrice}</TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )
          ) : (
            <h4 style={{ textAlign: 'center' }}>Item Not Found</h4>
          )}
        </Paper>
      ) : (
        undefined
      )}

      <div className="row">
        <h4 className="mt25 ml20">Items</h4>
        <div className="col-md-12">
          <Table className={classes.table}>
            <TableHead className="TableHeader">
              <TableRow className={classes.tableHeadRow}>
                <TableCell
                  className={classes.tableCell + ' ' + classes.tableHeadCell}
                >
                  Item Code
                </TableCell>
                <TableCell
                  className={classes.tableCell + ' ' + classes.tableHeadCell}
                >
                  Name
                </TableCell>
                <TableCell
                  className={classes.tableCell + ' ' + classes.tableHeadCell}
                >
                  Sub Class
                </TableCell>
                <TableCell
                  className={classes.tableCell + ' ' + classes.tableHeadCell}
                >
                  Minimum Level
                </TableCell>
                <TableCell
                  className={classes.tableCell + ' ' + classes.tableHeadCell}
                >
                  Maximun Level
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.map((prop, index) => {
                  return (
                    <TableRow
                      key={index}
                      onClick={() => {
                        dispatch({ field: 'selectedRow', value: index });
                      }}
                      className={`${classes.tableBodyRow} ${classes.pointer} ${
                        index === selectedRow ? 'selected' : ''
                      }`}
                    >
                      <TableCell className={classes.tableCell}>
                        {prop.itemCode} selected: {selectedRow}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.name}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.subClass}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.minimumLevel}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.maximumLevel}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="itemCode"
            label="Item Code"
            type="text"
            variant="outlined"
            value={itemCode}
            onChange={onChangeValue}
          />
        </div>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            type="text"
            variant="outlined"
            value={name}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            type="text"
            variant="outlined"
            value={description}
            onChange={onChangeValue}
          />
        </div>
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="currentQty"
            name="currentQty"
            label="Current Qty"
            type="number"
            variant="outlined"
            value={currentQty}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={onChangeValue}
          />
        </div>
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="reqQty"
            label="Req Qty"
            type="number"
            variant="outlined"
            value={reqQty}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="comments"
            label="Notes/Comments"
            type="text"
            variant="outlined"
            value={comments}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={styles.inputContainer}>
          <Button onClick={handleCancel} variant="contained">
            Cancel
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '2%'
          }}
        >
          {comingFor === 'add' ? (
            <Button
              style={{ paddingLeft: 30, paddingRight: 30 }}
              disabled={!validateForm()}
              onClick={handleAdd}
              variant="contained"
              color="primary"
            >
              {' '}
              Add{' '}
            </Button>
          ) : (
            <Button
              style={{ paddingLeft: 30, paddingRight: 30 }}
              disabled={!validateForm()}
              onClick={handleEdit}
              variant="contained"
              color="primary"
            >
              {' '}
              Edit{' '}
            </Button>
          )}
        </div>
      </div>

      <Notification msg={errorMsg} open={openNotification} />
    </div>
  );
}
export default AddEditPurchaseRequest;
