/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';
import { addVendorUrl, updateVendorUrl} from '../../public/endpoins';
import ws from '../../variables/websocket';
import ShippingTerm from '../ShippingTerm/shippingTerm';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddEditVendor(props) {
    const modalStyle = {
        backgroundColor: 'rgb(118, 133, 156)',
        borderRadius: 10,
        height: '80%',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '5%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        position: 'fixed'
    }

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
        rating } = state;

    const onChangeValue = ((e)=>{ 
        dispatch({field: e.target.name, value: e.target.value});
    });

    function validateForm() {
        return name.length > 0 && contactPerson.length > 0;
    }

    const [comingFor, setcomingFor] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [openShippingTermModal, setOpenShippingTermModal] = useState(false);

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
                    ToastsStore.error(res.data.error);
                }
            })
            .catch(e => {
                console.log('error after adding vendor', e);
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
                    ToastsStore.error(res.data.error);
                }
            })
            .catch(e => {
                console.log('error after updating vendor', e);
            });
        }
    };

    const addShippingTerm = () => {
        setOpenShippingTermModal(true);
    }

    const addPaymetTerm = () =>{

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

            {/* shipping terms modal */}
            <Modal
                open={openShippingTermModal}
                style={modalStyle}
                onClose={() => setOpenShippingTermModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <h4 className="modal-heading">
                        Shipping Term(s)
                    </h4>

                    <div className="modal-heading">
                        <ShippingTerm />
                    </div>
                </div>
            </Modal>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={styles.inputContainer}>
                <Button onClick={handleCancel} variant="contained">
                    Cancel
                </Button>
            </div>

            <div className="addEditBtnDiv">
            {comingFor === 'add' ? (
                <>
                    <Button className="mr10" onClick={addShippingTerm} variant="contained">
                        Add Shipping Term(s)
                    </Button>
                    <Button className="mr10" onClick={addPaymetTerm} variant="contained">
                        Add Payment Term(s)
                    </Button>
                    <Button
                    className="pl30 pr30"
                    disabled={!validateForm()}
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                    >
                        Add
                    </Button>
                </>
            ) : (
                <>
                    <Button className="mr10" onClick={addShippingTerm} variant="contained">
                        Edit Shipping Term(s)
                    </Button>
                    <Button className="mr10" onClick={addPaymetTerm} variant="contained">
                        Edit Payment Term(s)
                    </Button>
                    <Button
                    className="pl30 pr30"
                    disabled={!validateForm()}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                    >
                        Edit
                    </Button>
                </>
            )}
            </div>
        </div>
        </div>
    );
}
export default AddEditVendor;
