/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import { addBuRepRequestUrl, updateBuRepRequestUrl } from '../../public/endpoins';

import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


const useStyles = makeStyles(styles);

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddEditBuRepRequest(props) {
    const initialState ={
        _id: "",
        buId: "",
        requesterStaffId: "",
        timeStamp: "",
        status: ""
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const { _id, buId, requesterStaffId, timeStamp, status } = state;

    const onChangeValue = ((e)=>{ 
        dispatch({field: e.target.name, value: e.target.value});
    });

    function validateForm() {
        return status && status.length >0;
    }

    const [comingFor, setcomingFor] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [openNotification, setOpenNotification] = useState(false);
  


    useEffect(() => {
        setcomingFor(props.history.location.state.comingFor);
        const temp = props.history.location.state.selectedItem;
        if(temp){
            Object.entries(temp).map(([key,val])=>{
                dispatch({field: key, value: val});
            })
        }
    }, []);

    const handleCancel = () => {
        props.history.goBack();
    };


    const handleAdd = () => {
        setIsFormSubmitted(true);
        if(status){
            const params = { buId, requesterStaffId, timeStamp, status };
            axios.post(addBuRepRequestUrl, params).then(res => {
                if (res.data.success) {
                    props.history.goBack();
                }
                else if (!res.data.success) {
                    setOpenNotification(true);
                }
            }).catch(e => {
                    console.log('error after adding bu inventory', e);
                    setOpenNotification(true)
                    setErrorMsg("Error while adding the item")
            });
        }
    };

    const handleEdit = () => {
        setIsFormSubmitted(true);
        if(status){
            const params = { _id, buId, requesterStaffId, timeStamp, status };
            axios.put(updateBuRepRequestUrl, params).then(res => {
                if (res.data.success) {
                    props.history.goBack();
                }
                else if (!res.data.success) {
                    setOpenNotification(true);
                }
            }).catch(e => {
                console.log('error after adding bu inventory', e);
                setOpenNotification(true);
                setErrorMsg("Error while editing the item")
            });
        }
    };


    if(openNotification) {
        setTimeout(() => {
        setOpenNotification(false);
        setErrorMsg("")
        }, 2000);
    }


    const onChangeDate = value => {
        dispatch({ field: 'timeStamp', value: value });
      };

    return (
        <div className="container">
        <h1><span> {comingFor === 'add' ? 'Add': 'Edit'}</span></h1>

        <div className="row">
            <div className="col-md-4" style={styles.inputContainer}>
            <TextField
                fullWidth
                id="bu_id"
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
                id="requesterStaffId"
                name="requesterStaffId"
                label="Requester Staff ID"
                variant="outlined"
                value={requesterStaffId}
                onChange={onChangeValue}
            />
            </div>

            <div className="col-md-4" style={styles.inputContainer}>
            {/* <TextField
                fullWidth
                id="timeStamp"
                name="timeStamp"
                label="Time stamp"
                type="date"
                variant="outlined"
                value={timeStamp}
                onChange={onChangeValue}
            /> */}

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              inputVariant="outlined"
              onChange={onChangeDate}
              fullWidth={true}
              value={timeStamp ? timeStamp : new Date()}
            />
          </MuiPickersUtilsProvider>
            </div>
        </div>

        <div className="row">          
            <div className="col-md-4" style={styles.inputContainer}>
                <TextField
                    fullWidth
                    id="status"
                    name="status"
                    label="Status"
                    type="text"
                    variant="outlined"
                    value={status}
                    onChange={onChangeValue}
                    error={!status && isFormSubmitted}
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

export default AddEditBuRepRequest;
