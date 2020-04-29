/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import { addBuReturnUrl, updateBuReturnUrl } from '../../public/endpoins';

import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles(styles);

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddEditBuReturn(props) {
  const initialState = {
    _id: '',
    buId: '',
    itemId: '',
    qty: '',
    timeStamp: '',
    returnReason: '',
    batchNo: '',
    staffId: ''
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
    buId,
    itemId,
    qty,
    timeStamp,
    returnReason,
    batchNo,
    staffId
  } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    return qty && returnReason && returnReason.length > 0;
  }

  const [comingFor, setcomingFor] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
    const temp = props.history.location.state.selectedItem;
    if (temp) {
      Object.entries(temp).map(([key, val]) => {
        dispatch({ field: key, value: val });
      });
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (qty && returnReason && returnReason.length > 0) {
      const params = {
        buId,
        itemId,
        qty,
        timeStamp,
        returnReason,
        batchNo,
        staffId
      };
      console.log(params,params)
      axios
        .post(addBuReturnUrl, params)
        .then(res => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch(e => {
          console.log('error after adding bu inventory', e);
          setOpenNotification(true);
          setErrorMsg('Error while adding the item');
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (qty && returnReason && returnReason.length > 0) {
      const params = {
        _id,
        buId,
        itemId,
        qty,
        timeStamp,
        returnReason,
        batchNo,
        staffId
      };
      axios
        .put(updateBuReturnUrl, params)
        .then(res => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch(e => {
          console.log('error after adding bu inventory', e);
          setOpenNotification(true);
          setErrorMsg('Error while editing the item');
        });
    }
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg('');
    }, 2000);
  }

  const onChangeDate = value => {
    dispatch({ field: 'timeStamp', value: value });
  };

  return (
    <div className="container">
      <h1>
        <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
      </h1>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="buId"
            name="buId"
            label="Bu ID"
            variant="outlined"
            value={buId}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="itemId"
            name="itemId"
            label="Item ID"
            variant="outlined"
            value={itemId}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="qty"
            name="qty"
            label="Quantity"
            type="number"
            min="0"
            variant="outlined"
            value={qty}
            onChange={onChangeValue}
            error={!qty && isFormSubmitted}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          {/* <TextField
                fullWidth
                id="timeStamp"
                name="timeStamp"
                label="Time Stamp"
                type="datetime-local"
                variant="outlined"
                value={timeStamp}
                onChange={onChangeValue}
            /> */}
          {/* <TextField
                onChange={onChangeValue}

            id="datetime"
            label="Next appointment"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            InputLabelProps={{
              shrink: true
            }}
          /> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              inputVariant="outlined"
              onChange={onChangeDate}
              value={timeStamp ? timeStamp : new Date()}
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="returnReason"
            name="returnReason"
            label="Return Reason"
            variant="outlined"
            value={returnReason}
            onChange={onChangeValue}
            error={!returnReason && isFormSubmitted}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="batchNo"
            name="batchNo"
            label="Batch Number"
            type="text"
            variant="outlined"
            value={batchNo}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="staffId"
            name="staffId"
            label="Staff ID"
            type="text"
            variant="outlined"
            value={staffId}
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

export default AddEditBuReturn;
