/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import CustomTable from '../../components/Table/Table';
import ConfirmationModal from '../../components/Modal/confirmationModal';
import axios from 'axios';
import {
  getShippingTermUrl,
  deleteShippingTermUrl,
  addShippingTermUrl
} from '../../public/endpoins';
import Loader from 'react-loader-spinner';
import { ToastsStore } from 'react-toasts';
import RcIf from 'rc-if';

export default function ShippingTerm(props) {
  const [shippingTerms, setShippingTerms] = useState([{ description: '' }]);
  const [deleteItem, setdeleteItem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function getShippingTerms() {
    axios
      .get(getShippingTermUrl)
      .then(res => {
        if (res.data.success) {
          if (res.data.data.shippingTerm.length > 0) {
            setShippingTerms(res.data.data.shippingTerm);
          } else {
            setShippingTerms([{ description: '' }]);
          }
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch(e => {
        console.log('error: ', e);
      });
  }

  useEffect(() => {
    if (props.modeForShippingTerms === 'edit') {
      getShippingTerms();
    }
  }, []);

  const addNewShippingTerm = () => {
    setShippingTerms(prevState => [...prevState, { description: '' }]);
  };

  function onChangeValue(e, index) {
    // debugger;

    let x = '';
    for (let i = 0; i < shippingTerms.length; i++) {
      if (index === i) {
        x = shippingTerms[i];
      }
    }

    x.description = e.target.value;

    let temp = [];

    for (let i = 0; i < shippingTerms.length; i++) {
      if (i === index) {
        temp.push(x);
      } else {
        temp.push(shippingTerms[i]);
      }
    }

    setShippingTerms(temp);
  }

  function handleDelete(id) {
    // setModalVisible(true);
    // setdeleteItem(id);

    if (id === 0) {
      return;
    }

    let temp = [];
    for (let i = 0; i < shippingTerms.length; i++) {
      if (i !== id) {
        temp.push(shippingTerms[i]);
      }
    }

    setShippingTerms(temp);
  }

  function deleteShippingTerm() {
    const params = {
      _id: deleteItem
    };

    axios
      .delete(deleteShippingTermUrl + '/' + params._id)
      .then(res => {
        if (res.data.success) {
          setdeleteItem('');
          setModalVisible(false);
          window.location.reload(false);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
        return res;
      })
      .catch(e => {
        console.log('error while deletion ', e);
      });
  }

  function addShippingTerms() {
    let temp = [];

    let counter = 0;

    for (let i = 0; i < shippingTerms.length; i++) {
      if (shippingTerms[i].description !== '') {
        temp.push(shippingTerms[i]);
      }
    }
    // console.log(temp);

    for (let i = 0; i < temp.length; i++) {
      axios
        .post(addShippingTermUrl, temp[i])
        .then(res => {
          if (res.data.success) {
            counter = counter + 1;
            console.log(res.data);
            // setModalVisible(false);
            // window.location.reload(false);
          } else if (!res.data.success) {
            ToastsStore.error(res.data.error);
          }
          return res;
        })
        .catch(e => {
          console.log('error while deletion ', e);
        });
    }

    // if (counter === temp.length) {
    props.hideShippingModel();
    //   window.location.reload(false);
    // }
  }

  const handleDeleteDatabase = id => {
    axios
      .delete(deleteShippingTermUrl + '/' + id)
      .then(res => {
        if (res.data.success) {
          let temp = shippingTerms.filter(item => {
            return item._id !== id;
          });
          setShippingTerms(temp);
          // setModalVisible(false);
          // window.location.reload(false);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
        return res;
      })
      .catch(e => {
        console.log('error while deletion ', e);
      });
  };

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      {shippingTerms ? (
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 3,
              flexDirection: 'column',
              maxHeight: 350,
              overflowY: 'scroll',
              overflowX: 'hidden'
            }}
          >
            {shippingTerms.map((prop, index, arr) => {
              return (
                <div
                  className="row ml10 mb10 justify-content-md-center"
                  key={index}
                  style={{}}
                >
                  <div className="col-sm-9" style={{ marginTop: 1 }}>
                    <TextField
                      fullWidth
                      name="description"
                      label=""
                      type="text"
                      variant="outlined"
                      value={prop.description}
                      onChange={e => onChangeValue(e, index)}
                      // error={!prop.description && isFormSubmitted}
                    />
                  </div>
                  <div className="col-sm-3">
                    <span style={{ cursor: 'pointer' }}>
                      <i className="ml10 zmdi zmdi-edit zmdi-hc-2x  mdc-text-amber"></i>
                    </span>

                    <span
                      onClick={
                        props.modeForShippingTerms === 'add'
                          ? () => handleDeleteLocal(index)
                          : () => handleDeleteDatabase(prop._id)
                      }
                      style={{
                        cursor: 'pointer',
                        marginLeft: 7,
                        marginRight: 7
                      }}
                    >
                      <i className="ml10 zmdi zmdi-delete zmdi-hc-2x"></i>
                    </span>

                    <RcIf if={arr.length - 1 === index}>
                      <span
                        onClick={addNewShippingTerm}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="ml10 zmdi zmdi-plus zmdi-hc-2x"></i>
                      </span>
                    </RcIf>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <ConfirmationModal modalVisible={modalVisible} 
                    msg="Are you sure want to delete the record?"
                    hideconfirmationModal={()=>setModalVisible(false)}
                    onConfirmDelete={()=> deleteShippingTerm()}
                    setdeleteItem={()=>setdeleteItem('')}
                /> */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flex: 0.5,
              alignItems: 'center'
            }}
          >
            <div style={styles.inputContainer}>
              <Button
                onClick={() => props.hideShippingModel()}
                variant="contained"
              >
                Cancel
              </Button>
            </div>

            <div style={{ marginLeft: 20 }}>
              <Button
                onClick={() => addShippingTerms()}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </div>
          </div>
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
      )}

      {/* <div style={{ flex: 1, backgroundColor: 'red' }}></div>

      <div style={{ flex: 1, backgroundColor: 'blue' }}></div> */}
    </div>
  );
}
