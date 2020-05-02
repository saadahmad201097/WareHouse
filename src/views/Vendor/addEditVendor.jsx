/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { addVendorUrl, updateVendorUrl } from '../../public/endpoins';


const useStyles = makeStyles(styles);

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddEditVendor(props) {

    const initialState ={
        _id: "",
        name: "",
        phoneNumber: "",
        status: "",
        address: "",
        fax: "",
        email: "",
        contactPerson: "",
        timeStamp:"",
        createdBySystemAdminStaffId:"",
        review:"",
        rating: "",
        systemAdmins: []
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const { _id, name, phoneNumber, status, address, fax, email, contactPerson, createdBySystemAdminStaffId, timeStamp,
        review, rating, systemAdmins } = state;

    const onChangeValue = ((e)=>{ 
        dispatch({field: e.target.name, value: e.target.value});
    });

    function validateForm() {
        // return buPrice && batchNo && batchNo.length > 0;
        return true;
    }

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
        if(props.history.location.state.systemAdmin){
            dispatch({field: 'systemAdmins', value: props.history.location.state.systemAdmin});
        }
    }, []);

    const handleCancel = () => {
        props.history.goBack();
    };

    const handleAdd = () => {
        setIsFormSubmitted(true);
        // if (buPrice && batchNo && batchNo.length > 0) {
        const params = {
            name, 
            phoneNumber,
            status, 
            address,
            fax, 
            email, 
            contactPerson, 
            createdBySystemAdminStaffId, 
            timeStamp,
            review,
            rating
        };
        axios.post(addVendorUrl, params).then(res => {
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
    };

    const handleEdit = () => {
        setIsFormSubmitted(true);
        // if (buPrice && batchNo && batchNo.length > 0) {
        const params = {
            _id,
            name, 
            phoneNumber,
            status, 
            address,
            fax, 
            email, 
            contactPerson, 
            createdBySystemAdminStaffId, 
            timeStamp,
            review,
            rating
        };
        axios
            .put(updateVendorUrl, params)
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
        // }
    };

    if (openNotification) {
        setTimeout(() => {
        setOpenNotification(false);
        setErrorMsg('');
        }, 2000);
    }

    const onChangeDate = value => {
        dispatch({ field: 'timeStamp', value });
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
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        variant="outlined"
                        value={name}
                        onChange={onChangeValue}
                        error={!name && isFormSubmitted}
                    />
                </div>

                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone Number"
                        type="text"
                        variant="outlined"
                        value={phoneNumber}
                        onChange={onChangeValue}
                    />
                </div>

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
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-8" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="address"
                        name="address"
                        label="Address"
                        type="text"
                        variant="outlined"
                        value={address}
                        onChange={onChangeValue}
                    />
                </div>

                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="fax"
                        name="fax"
                        label="Fax"
                        type="text"
                        variant="outlined"
                        value={fax}
                        onChange={onChangeValue}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        type="text"
                        variant="outlined"
                        value={email}
                        onChange={onChangeValue}
                    />
                </div>

                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="contactPerson"
                        name="contactPerson"
                        label="Contact Person"
                        type="text"
                        variant="outlined"
                        value={contactPerson}
                        onChange={onChangeValue}
                    />
                </div>

                <div className="col-md-4" style={styles.inputContainer}>
                    <MuiPickersUtilsProvider fullWidth utils={DateFnsUtils}>
                        <DateTimePicker
                        fullWidth
                        inputVariant="outlined"
                        onChange={onChangeDate}
                        value={timeStamp ? timeStamp : new Date()}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-4" style={styles.inputContainer}>
                    <InputLabel id="createdBySystemAdminStaffId-label">Admin Staff</InputLabel>
                    <Select
                        fullWidth
                        labelId="createdBySystemAdminStaffId-label"
                        id="createdBySystemAdminStaffId"
                        name="createdBySystemAdminStaffId"
                        value={createdBySystemAdminStaffId}
                        onChange={onChangeValue}
                        label="Admin Staff"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {systemAdmins.map((val)=>{
                            return <MenuItem key={val._id} value={val._id}>{val.username}</MenuItem>
                        })}
                    </Select>  
                </div>

                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="review"
                        name="review"
                        label="Review"
                        type="text"
                        variant="outlined"
                        value={review}
                        onChange={onChangeValue}
                    />
                </div>
                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="rating"
                        name="rating"
                        label="Rating"
                        type="text"
                        variant="outlined"
                        value={rating}
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
export default AddEditVendor;
