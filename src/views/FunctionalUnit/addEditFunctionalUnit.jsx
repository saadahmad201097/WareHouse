/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';
import {
  addFunctionalUnitUrl,
  updateFunctionalUnitUrl
} from '../../public/endpoins';

import cookie from 'react-cookies';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles(styles);

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

const FUHead = [
  { _id: 1, buName: 'First' },
  { _id: 2, buName: 'Second' },
  { _id: 3, buName: 'Third' }
];

const BUName = [
  { _id: 1, buName: 'First BU' },
  { _id: 2, buName: 'Second BU' }
];

const statusArray = [{ _id: 1, name: 'Active' }, { _id: 2, name: 'In Active' }];

function AddEditBuReturn(props) {
  const [statusArray, setStatusArray] = useState('');
  const [businessUnits, setBusinessUnits] = useState('');
  const [staffArray, setStaffArray] = useState('');
  const [comingFor, setcomingFor] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const initialState = {
    _id: '',
    fuHead: '',
    fuName: '',
    description: '',
    status: '',
    buId: '',
    reason: '',
    fuLogId: ''
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
    fuName,
    description,
    fuHead,
    status,
    buId,
    reason,
    fuLogId
  } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    return (
      fuHead !== '' && fuName !== '' && status !== '' && description !== ''
    );
  }

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
    setStatusArray(props.history.location.state.status);
    setBusinessUnits(props.history.location.state.businessUnits);
    setStaffArray(props.history.location.state.staff);

    const selectedRec = props.history.location.state.selectedItem;
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          if (key === 'fuLogId') {
            dispatch({ field: key, value: val });
          } else {
            dispatch({ field: key, value: val._id });
          }
        } else {
          if (key === 'status' && selectedRec.status === 'in_active') {
            dispatch({ field: 'reason', value: selectedRec.fuLogId.reason });
            dispatch({ field: 'status', value: selectedRec.status });
          }
          dispatch({ field: key, value: val });
        }
      });
    }
    if (props.history.location.state.items) {
      dispatch({ field: 'items', value: props.history.location.state.items });
    }
    if (props.history.location.state.staff) {
      dispatch({ field: 'staffs', value: props.history.location.state.staff });
    }
    if (props.history.location.state.businessUnit) {
      dispatch({
        field: 'businessUnits',
        value: props.history.location.state.businessUnit
      });
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    // props.history.goBack();
    const currentUser = cookie.load('current_user');

    setIsFormSubmitted(true);

    const params = {
      fuName: fuName,
      description: description,
      fuHead: fuHead,
      buId: buId,
      status: status,
      reason: reason,
      updatedBy: currentUser.name
    };
    console.log('objact for FU', params);
    axios
      .post(addFunctionalUnitUrl, params)
      .then(res => {
        if (res.data.success) {
          props.history.goBack();
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch(e => {
        console.log('error after adding bu inventory', e);
      });
  };

  const handleEdit = () => {
    // setIsFormSubmitted(true);
    const currentUser = cookie.load('current_user');

    const params = {
      _id,
      fuName: fuName,
      description: description,
      fuHead: fuHead,
      buId: buId,
      status: status,
      reason: reason,
      updatedBy: currentUser.name,
      fuLogId: fuLogId._id
    };
    axios
      .put(updateFunctionalUnitUrl, params)
      .then(res => {
        if (res.data.success) {
          props.history.goBack();
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch(e => {
        console.log('error after adding bu inventory', e);
      });
  };

  return (
    <div className="container">
      <h1>
        <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
      </h1>
      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="fuName"
            name="fuName"
            label="Functional Unit Name"
            variant="outlined"
            value={fuName}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            value={description}
            multiline
            rows={5}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="buHead-label">FU Head</InputLabel>
          <Select
            fullWidth
            id="fuHead"
            name="fuHead"
            value={fuHead}
            onChange={onChangeValue}
            label="FU Head"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {staffArray &&
              staffArray.map(val => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.firstName} {val.lastName}
                  </MenuItem>
                );
              })}
          </Select>
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="buName-label">BU Name</InputLabel>
          <Select
            fullWidth
            id="buId"
            name="buId"
            value={buId}
            onChange={onChangeValue}
            label="BU Name"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {businessUnits &&
              businessUnits.map(val => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.buName}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <InputLabel id="buHead-label">Status</InputLabel>
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
            {statusArray &&
              statusArray.map(val => {
                return (
                  <MenuItem key={val.key} value={val.key}>
                    {val.value}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
      </div>

      {status === 'in_active' ? (
        <div className="row">
          <div className="col-md-12" style={styles.inputContainer}>
            <TextField
              fullWidth
              id="reason"
              name="reason"
              label="Resaon"
              variant="outlined"
              value={reason}
              // multiline
              // rows={5}
              onChange={onChangeValue}
            />
          </div>
        </div>
      ) : (
        undefined
      )}

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
              Add
            </Button>
          ) : (
            <Button
              style={{ paddingLeft: 30, paddingRight: 30 }}
              disabled={!validateForm()}
              onClick={handleEdit}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      <div>
        {comingFor === 'edit' ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Last Updated By</TableCell>
                <TableCell>Last Updated at</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>{fuLogId.updatedBy}</TableCell>
              <TableCell>
                {new Date(fuLogId.updatedAt).getDate()}/
                {new Date(fuLogId.updatedAt).getMonth() + 1}/
                {new Date(fuLogId.updatedAt).getFullYear()}{' '}
                {new Date(fuLogId.updatedAt).getHours()}
                {':'}
                {new Date(fuLogId.updatedAt).getMinutes()}
              </TableCell>
              <TableCell>{fuLogId.reason ? fuLogId.reason : 'none'}</TableCell>
            </TableBody>
          </Table>
        ) : (
          undefined
        )}
      </div>
    </div>
  );
}
export default AddEditBuReturn;
