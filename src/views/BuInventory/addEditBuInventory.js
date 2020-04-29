/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import { addBuInventoryUrl, updateBuInventoryUrl } from '../../public/endpoins';



const useStyles = makeStyles(styles);

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddEditBuInventory(props) {
    const initialState ={
        _id: "",
        buId: "",
        itemId: "",
        qty: ""
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const { _id, buId, itemId, qty } = state;

    const onChangeValue = ((e)=>{ 
        dispatch({field: e.target.name, value: e.target.value});
    });

    function validateForm() {
        let res = false;
        if(qty){
            res = true
        }
        return res;
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
        if(qty){
            const params = { buId, itemId, qty };
            axios.post(addBuInventoryUrl, params).then(res => {
                if (res.data.success) {
                    console.log('response after adding item', res);
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
        if(qty){
            const params = { _id, buId, itemId, qty };
            axios.put(updateBuInventoryUrl, params).then(res => {
                if (res.data.success) {
                    console.log('response after adding item', res);
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
                id="item_id"
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
                id="quantity"
                name="qty"
                label="Quantity"
                type="number"
                variant="outlined"
                value={qty}
                min="0"
                onChange={onChangeValue}
                error={!qty && isFormSubmitted}
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

export default AddEditBuInventory;
