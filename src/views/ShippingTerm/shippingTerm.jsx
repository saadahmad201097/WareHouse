/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import CustomTable from '../../components/Table/Table';
import ConfirmationModal  from '../../components/Modal/confirmationModal';
import axios from 'axios';
import { getShippingTermUrl, deleteShippingTermUrl } from '../../public/endpoins';
import Loader from 'react-loader-spinner';
import { ToastsStore } from 'react-toasts';
import RcIf from 'rc-if';


export default function ShippingTerm(props) {

    const [shippingTerms, setShippingTerms] = useState([{ description: '' }]);
    const [deleteItem, setdeleteItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);


    // function getShippingTerms() {
    //     axios.get(getShippingTermUrl).then(res => {
    //         if(res.data.success) {
    //             setShippingTerms(res.data.data.shippingTerms);
    //         }
    //         else if (!res.data.success) {
    //             ToastsStore.error(res.data.error);
    //         }
    //     })
    //     .catch(e => {
    //         console.log('error: ', e);
    //     });
    // }

    // useEffect(() => {
    //     getShippingTerms();
    // }, []);

    const addNewShippingTerm = () => {
        setShippingTerms(prevState => [...prevState, {description:''}]);
    };

    const onChangeValue = (e, v) =>{debugger

    }

    function handleDelete(id) {
        setModalVisible(true);
        setdeleteItem(id);
    }

    function deleteShippingTerm(){
        const params = {
            _id: deleteItem
        };

        axios.delete(deleteShippingTermUrl + '/' + params._id).then(res => {
            if(res.data.success) {
                setdeleteItem('');
                setModalVisible(false);
                window.location.reload(false);
            }
            else if (!res.data.success) {
                ToastsStore.error(res.data.error);
            }
            return res;
        })
        .catch(e => {
            console.log('error while deletion ', e);
        });
    }

    return(
        <div>
        {shippingTerms ? (
            <div>
                {shippingTerms.map((prop, index, arr) =>{
                    return(
                        <div className="row ml10 mb10" key={index}>
                            <div className="col-md-8" style={styles.inputContainer}>
                                <TextField
                                    fullWidth
                                    name="description"
                                    label=""
                                    type="text"
                                    variant="outlined"
                                    // value={prop.description}
                                    onChange={onChangeValue}
                                    // error={!prop.description && isFormSubmitted}
                                />
                            </div>
                            <div className="col-md-2">
                                <span><i className="ml10 zmdi zmdi-edit zmdi-hc-2x"></i></span>
                                <span><i className="ml10 zmdi zmdi-delete zmdi-hc-2x"></i></span>
                                <RcIf if={arr.length - 1 === index}> 
                                    <span onClick={addNewShippingTerm}><i className="ml10 zmdi zmdi-plus zmdi-hc-2x"></i></span>
                                </RcIf>
                            </div>
                        </div>
                    )
                })}

                {/* <ConfirmationModal modalVisible={modalVisible} 
                    msg="Are you sure want to delete the record?"
                    hideconfirmationModal={()=>setModalVisible(false)}
                    onConfirmDelete={()=> deleteShippingTerm()}
                    setdeleteItem={()=>setdeleteItem('')}
                /> */}
            </div>
        ) : (
            <div
            style={{
                width: '70%',
                height: '100%',
                position: 'fixed',
                display: 'flex',
                justifyContent: 'center'
            }}
            >
            <Loader type="TailSpin" color="red" height={50} width={50} />
            </div>
        ) }
        </div>
    );
}