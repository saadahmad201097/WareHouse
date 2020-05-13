/* eslint-disable react/jsx-indent */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';
import {
  addBusinessUnitUrl,
  updateBusinessUnitUrl
} from '../../public/endpoins';

import cookie from 'react-cookies';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddBusinessUnit(props) {
  const initialState = {
    _id: '',
    buName: '',
    description: '',
    buHead: '',
    status: '',
    reason: '',
    buLogsId: '',
    statues: [],
    buLogs: [],
    buHeads: []
  };

  function reducer(state, { field, value }) {
    return { ...state, [field]: value };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    _id,
    buName,
    description,
    buHead,
    status,
    reason,
    buLogsId,
    statues,
    buLogs,
    buHeads
  } = state;

  const [comingFor, setcomingFor] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'));

    setcomingFor(props.history.location.state.comingFor);

    const selectedRec = props.history.location.state.selectedItem;
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          dispatch({ field: key, value: val._id });
          dispatch({ field: 'reason', value: val.reason });
        } else {
          dispatch({field: key, value: val});
        }
      });
    }
    if(props.history.location.state.buLogs){
      dispatch({field: 'buLogs', value: props.history.location.state.buLogs});
    }
    if(props.history.location.state.buHeads){
      dispatch({field: 'buHeads', value: props.history.location.state.buHeads});
    }
    if(props.history.location.state.status){
      dispatch({field: 'statues', value: props.history.location.state.status});
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        buName,
        description,
        buHead,
        status,
        reason,
        updatedBy: currentUser.name
      };
      axios
        .post(addBusinessUnitUrl, params)
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
    }
  };

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
    if(e.target.name === 'status'){
      dispatch({ field: 'reason', value: '' });
    }
  };

  function validateForm() {
    return (
      buName.length > 0 &&
      description.length > 0 &&
      buHead.length > 0 &&
      status.length > 0
    );
  }

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        _id,
        buName,
        description,
        buHead,
        status,
        updatedBy: currentUser.name,
        buLogsId,
        reason
      };
      
      axios
        .put(updateBusinessUnitUrl, params)
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
    }
  };

  return (
    <div className="container">
      <h1>{comingFor === 'add' ? 'Add' : 'Edit'}</h1>

      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="buName"
            label="Business Unit Name"
            variant="outlined"
            value={buName}
            onChange={onChangeValue}
            error={!buName && isFormSubmitted}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="description"
            id="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={onChangeValue}
            error={!description && isFormSubmitted}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="buHead-label">BU Heads</InputLabel>
          <Select
            fullWidth
            name="buHead"
            value={buHead}
            onChange={onChangeValue}
            label="Business Unit Head"
            error={!buHead && isFormSubmitted}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {buHeads &&
              buHeads.map(val => {
                return (
                  <MenuItem key={val.key} value={val.key}>
                    {val.value}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            fullWidth
            name="status"
            value={status}
            onChange={onChangeValue}
            label="Status"
            error={!status && isFormSubmitted}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statues &&
              statues.map(val => {
                return (
                  <MenuItem key={val.key} value={val.key}>
                    {val.value}
                  </MenuItem>
                );
              })}
          </Select>
        </div>

        {status === 'in_active' ? (
          <div className="col-md-12" style={styles.inputContainer}>
            <TextField
              fullWidth
              id="reason"
              name="reason"
              label="Resaon"
              variant="outlined"
              value={reason}
              onChange={onChangeValue}
            />
          </div>
        ) : (
          undefined
        )}
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
          <Table className="mt20">
            <TableHead>
              <TableRow>
              <TableCell>Status</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Last Updated By</TableCell>
                <TableCell>Last Updated at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buLogs && buLogs.map((prop, index) => {
                if(prop.buId === _id){
                  return(
                    <TableRow key={index}>
                      <TableCell>{prop.status === 'active' ? 'Active' : 'In Active'}</TableCell>
                      <TableCell>{prop.reason ? prop.reason : 'N/A'}</TableCell>
                      <TableCell>{prop.updatedBy}</TableCell>
                      <TableCell>
                        {new Date(prop.updatedAt).getDate()}/
                        {new Date(prop.updatedAt).getMonth() + 1}/
                        {new Date(prop.updatedAt).getFullYear()}{' '}
                        {new Date(prop.updatedAt).getHours()}
                        {':'}
                        {new Date(prop.updatedAt).getMinutes()}
                      </TableCell>
                    </TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        ) : (
          undefined
        )}
      </div>
    </div>
  );
}

export default AddBusinessUnit;
