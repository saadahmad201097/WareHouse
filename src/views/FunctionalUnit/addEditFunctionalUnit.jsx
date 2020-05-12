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
import { addBuReturnUrl, updateBuReturnUrl } from '../../public/endpoins';

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
  const initialState = {
    _id: '',
    fuHead: '',
    fuName: '',
    desc: '',
    status: '',
    buName: ''
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { fuName, desc, fuHead, status, buName } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    return fuHead !== '' && fuName !== '' && status !== '' && desc !== '';
  }

  const [comingFor, setcomingFor] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
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
    props.history.goBack();
    //     setIsFormSubmitted(true);
    //     if (qty && returnReason && returnReason.length > 0) {
    //       const params = {
    //         buId,
    //         itemId,
    //         qty,
    //         timeStamp,
    //         returnReason,
    //         batchNo,
    //         staffId
    //       };
    //       console.log(params, params);
    //       axios
    //         .post(addBuReturnUrl, params)
    //         .then(res => {
    //           if (res.data.success) {
    //             props.history.goBack();
    //           } else if (!res.data.success) {
    //             ToastsStore.error(res.data.error);
    //           }
    //         })
    //         .catch(e => {
    //           console.log('error after adding bu inventory', e);
    //         });
    //     }
  };

  const handleEdit = () => {
    //     setIsFormSubmitted(true);
    //     if (qty && returnReason && returnReason.length > 0) {
    //       const params = {
    //         _id,
    //         buId,
    //         itemId,
    //         qty,
    //         timeStamp,
    //         returnReason,
    //         batchNo,
    //         staffId
    //       };
    //       axios
    //         .put(updateBuReturnUrl, params)
    //         .then(res => {
    //           if (res.data.success) {
    //             props.history.goBack();
    //           } else if (!res.data.success) {
    //             ToastsStore.error(res.data.error);
    //           }
    //         })
    //         .catch(e => {
    //           console.log('error after adding bu inventory', e);
    //         });
    //     }
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
            id="desc"
            name="desc"
            label="Description"
            variant="outlined"
            value={desc}
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
            {FUHead.map((val) => {
              return (
                <MenuItem key={val._id} value={val._id}>
                  {val.buName}
                </MenuItem>
              );
            })}
          </Select>
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="buName-label">BU Name</InputLabel>
          <Select
            fullWidth
            id="buName"
            name="buName"
            value={buName}
            onChange={onChangeValue}
            label="BU Name"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {BUName.map((val) => {
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
            {statusArray.map((val) => {
              return (
                <MenuItem key={val._id} value={val._id}>
                  {val.name}
                </MenuItem>
              );
            })}
          </Select>
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

    </div>
  );
}
export default AddEditBuReturn;
