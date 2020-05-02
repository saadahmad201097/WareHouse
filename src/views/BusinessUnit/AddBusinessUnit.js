/* eslint-disable array-callback-return */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { addBusinessUnitUrl, updateBusinessUnitUrl } from '../../public/endpoins';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddBusinessUnit(props) {

  const initialState ={
    _id: "",
    buName: "",
    description:"",
    buHead: "",
    createBySystemAdminStaffId: "",
    timeStamp: new Date(),
    systemAdmins: []
  }

  function reducer(state, { field, value}){
    return{...state, [field] : value}
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { _id, buName, description, buHead, createBySystemAdminStaffId, timeStamp, systemAdmins } = state;
  const [comingFor, setcomingFor] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
    const selectedRec = props.history.location.state.selectedItem;
    if(selectedRec){
        Object.entries(selectedRec).map(([key,val])=>{
            if(val && typeof val === 'object'){
                dispatch({field: key, value: val._id});
            }
            else{
                dispatch({field: key, value: val});
            }
        })
    }
    if(props.history.location.state.systemAdmins){
        dispatch({field: 'systemAdmins', value: props.history.location.state.systemAdmins});
    }
  }, []);

  if (openNotification) {
    setTimeout(() => {
    setOpenNotification(false);
    setErrorMsg('');
    }, 2000);
  }

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    // if (buPrice && batchNo && batchNo.length > 0) {
    const params = {
      buName,
      description,
      buHead, 
      createBySystemAdminStaffId, 
      timeStamp
    };
    axios.post(addBusinessUnitUrl, params).then(res => {
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

  const onChangeValue = ((e)=>{ 
    dispatch({field: e.target.name, value: e.target.value});
  });

  function validateForm() {
    // return buPrice && batchNo && batchNo.length > 0;
    return true;
  }

  const handleEdit = () => {
    setIsFormSubmitted(true);
    // if (buPrice && batchNo && batchNo.length > 0) {
    const params = {
      _id,
      buName,
      description,
      buHead, 
      createBySystemAdminStaffId, 
      timeStamp
    };

    axios.put(updateBusinessUnitUrl, params).then(res => {
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

  const onChangeDate = ((value) => {
    dispatch({field: 'timeStamp', value});
  });

  return (
    <div className="container">
      <h1>{comingFor === 'add' ? 'Add' : 'Edit' }</h1>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="buName"
            label="Business Unit Name"
            variant="outlined"
            value={buName}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="buHead"
            label="Business Unit Head"
            variant="outlined"
            value={buHead}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              inputVariant="outlined"
              onChange={onChangeDate}
              fullWidth
              value={timeStamp}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="createdBySystemAdminStaffId-label">Admin Staff</InputLabel>
          <Select
            fullWidth
            name="createBySystemAdminStaffId"
            value={createBySystemAdminStaffId}
            onChange={onChangeValue}
            label="Admin Staff"
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {systemAdmins.map((val)=>{
              return <MenuItem key={val._id} value={val._id}>{val.username}</MenuItem>
            })}
          </Select>
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

export default AddBusinessUnit;
