/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import { addVendorUrl, updateVendorUrl, socketUrl } from '../../public/endpoins';
import ws from '../../variables/websocket';


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
        contactPerson: "",
        phoneNumber: "",
        website: "",
        address: "",
        zipCode: "",
        city: "",
        country:"",
        shippingTerms: [],
        rating: "",
        status: ""
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const { _id, name,contactPerson, phoneNumber, website, address, zipCode, city, country, status,
        shippingTerms, rating } = state;

    const onChangeValue = ((e)=>{ 
        dispatch({field: e.target.name, value: e.target.value});
    });

    function validateForm() {
        return name.length > 0 && contactPerson.length > 0;
    }

    const [comingFor, setcomingFor] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [openNotification, setOpenNotification] = useState(false);

    // const ws = new WebSocket(socketUrl);


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
    }, []);

    const handleCancel = () => {
        props.history.goBack();
    };

    const handleAdd = () => {
        setIsFormSubmitted(true);
        if (validateForm()) {
            const params = {
                name,
                contactPerson,
                phoneNumber,
                website, 
                address,
                zipCode, 
                city, 
                country,
                status,
                rating
            };
            axios.post(addVendorUrl, params).then(res => {
                if (res.data.success) {
                    ws.send("add_vendor");
                    props.history.goBack();
                } else if (!res.data.success) {
                    setOpenNotification(true);
                }
                })
                .catch(e => {
                    console.log('error after adding vendor', e);
                    setOpenNotification(true);
                    setErrorMsg('Error while adding the vendor');
            });
        }
    };

    const handleEdit = () => {
        setIsFormSubmitted(true);
        if(validateForm()) {
            const params = {
                _id,
                name,
                contactPerson,
                phoneNumber,
                website, 
                address,
                zipCode, 
                city, 
                country,
                status,
                rating
            };
            axios.put(updateVendorUrl, params).then(res => {
                if (res.data.success) {
                    props.history.goBack();
                } else if (!res.data.success) {
                    setOpenNotification(true);
                }
                })
                .catch(e => {
                    console.log('error after updating vendor', e);
                    setOpenNotification(true);
                    setErrorMsg('Error while editing the vendor');
            });
        }
    };

    if (openNotification) {
        setTimeout(() => {
        setOpenNotification(false);
        setErrorMsg('');
        }, 2000);
    }

    return (
        <div className="container">
            <h1>
                <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
            </h1>
            <div className="row">
                <div className="col-md-12" style={styles.inputContainer}>
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
            </div>
            
            <div className="row">
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
                    <TextField
                        fullWidth
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Contact Number"
                        type="text"
                        variant="outlined"
                        value={phoneNumber}
                        onChange={onChangeValue}
                    />
                </div>

                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="website"
                        name="website"
                        label="Website"
                        type="text"
                        variant="outlined"
                        value={website}
                        onChange={onChangeValue}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-12" style={styles.inputContainer}>
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
            </div>

            <div className="row">
                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="zipCode"
                        name="zipCode"
                        label="Zip Code"
                        type="text"
                        variant="outlined"
                        value={zipCode}
                        onChange={onChangeValue}
                    />
                </div>
                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        variant="outlined"
                        value={city}
                        onChange={onChangeValue}
                    />
                </div>
                <div className="col-md-4" style={styles.inputContainer}>
                    <TextField
                        fullWidth
                        id="country"
                        name="country"
                        label="Country"
                        type="text"
                        variant="outlined"
                        value={country}
                        onChange={onChangeValue}
                    />
                </div>
            </div>

            {/* <div className="row">
            </div> */}
            
            <div className="row">
                <div className="col-md-6" style={styles.inputContainer}>
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

                <div className="col-md-6" style={styles.inputContainer}>
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
