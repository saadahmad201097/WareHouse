import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import { addItemUrl, updateItemUrl } from '../../public/endpoins';

import Loader from 'react-loader-spinner';

import Notification from 'components/Snackbar/Notification.js';

const useStyles = makeStyles(styles);

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};

function AddItems(props) {
  const classes = useStyles();

  const [comingFor, setcomingFor] = useState('');

  const [name, setName] = useState('');
  const [subClass, setSubClass] = useState('');
  const [unit, setUnit] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [buPrice, setBUPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [barCode, setBarcode] = useState('');
  const [description, setDesc] = useState('');

  const [selectedItemToEdit, setSelectedItem] = useState('');

  const [null_name, setNullName] = useState(false);
  const [null_subClass, setNullSubClass] = useState(false);
  const [null_unit, setNullUnit] = useState(false);
  const [null_vendorId, setNullVendorId] = useState(false);
  const [null_purchasePrice, setNullPurchasePrice] = useState(false);
  const [null_buPrice, setNullBUPrice] = useState(false);
  const [null_salePrice, setNullSalePrice] = useState(false);
  const [null_barCode, setNullBarcode] = useState(false);
  const [null_description, setNullDesc] = useState(false);

  const [msg, setMsg] = useState('');
  const [tr, setTr] = useState(false);

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
    if (props.history.location.state.selectedItem) {
      const temp = props.history.location.state.selectedItem;

      setSelectedItem(temp);
      setName(temp.name);
      setSubClass(temp.subClass);
      setDesc(temp.description);
      setUnit(temp.unit);
      setVendorId(temp.vendorId);
      setPurchasePrice(temp.purchasePrice);
      setBUPrice(temp.buPrice);
      setSalePrice(temp.salePrice);
      setBarcode(temp.barCode);
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  function handleInput(key, value) {
    if ('name' === key) {
      setName(value);
    } else if ('subClass' === key) {
      setSubClass(value);
    } else if ('unit' === key) {
      setUnit(value);
    } else if ('vendorId' === key) {
      setVendorId(value);
    } else if ('purchaseId' === key) {
      setPurchasePrice(value);
    } else if ('BUPrice' === key) {
      setBUPrice(value);
    } else if ('salePrice' === key) {
      setSalePrice(value);
    } else if ('barcode' === key) {
      setBarcode(value);
    } else if ('desc') {
      setDesc(value);
    }
  }

  const emptyFields = () => {
    if (name === '') {
      setNullName(true);
    }
    if (purchasePrice === '') {
      setNullPurchasePrice(true);
    }
    if (description === '') {
      setNullDesc(true);
    }
    if (vendorId === '') {
      setNullVendorId(true);
    }
    if (unit === '') {
      setNullUnit(true);
    }
    if (barCode === '') {
      setNullBarcode(true);
    }
    if (buPrice === '') {
      setNullBUPrice(true);
    }
    if (salePrice === '') {
      setNullSalePrice(true);
    }
    if (subClass === '') {
      setNullSubClass(true);
    }
  };

  const addNewItemFun = () => {
    const params = {
      name: name,
      description: description,
      subClass: subClass,
      unit: unit,
      vendorId: vendorId,
      purchasePrice: purchasePrice,
      buPrice: buPrice,
      salePrice: salePrice,
      barCode: barCode
    };
    axios
      .post(addItemUrl, params)
      .then(res => {
        if (res.data.success) {
          console.log('response after adding item', res);
          props.history.goBack();
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
      })
      .catch(e => {
        console.log('error after adding item', e);
        setTr(true);
        setMsg('Error while adding the item');
      });
  };

  const handleAdd = () => {
    if (
      name === '' ||
      purchasePrice === '' ||
      vendorId === '' ||
      description === '' ||
      barCode === '' ||
      buPrice === '' ||
      salePrice === '' ||
      subClass === '' ||
      unit === ''
    ) {
      emptyFields();
    } else {
      addNewItemFun();
    }
  };

  const editItemFun = () => {
    const params = {
      ...selectedItemToEdit,
      name: name,
      description: description,
      subClass: subClass,
      unit: unit,
      vendorId: vendorId,
      purchasePrice: purchasePrice,
      buPrice: buPrice,
      salePrice: salePrice,
      barCode: barCode
    };
    console.log(params);
    axios
      .put(updateItemUrl, params)
      .then(res => {
        if (res.data.success) {
          console.log('response after adding item', res);
          props.history.goBack();
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
      })
      .catch(e => {
        console.log('error after adding item', e);
        setTr(true);
        setMsg('Error while updating the item');
      });
  };

  const handleEdit = () => {
    if (
      name === '' ||
      purchasePrice === '' ||
      vendorId === '' ||
      description === '' ||
      barCode === '' ||
      buPrice === '' ||
      salePrice === '' ||
      subClass === '' ||
      unit === ''
    ) {
      emptyFields();
    } else {
      editItemFun();
    }
  };

  if (tr) {
    setTimeout(() => {
      setTr(false);
      setMsg('');
    }, 2000);
  }

  return (
    <div className="container">
      <h1>{comingFor}</h1>

      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={e => handleInput('name', e.target.value)}
            error={!name && null_name}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            // multiline
            // rows={4}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={description}
            onChange={e => handleInput('desc', e.target.value)}
            error={!description && null_description}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Sub Class"
            variant="outlined"
            value={subClass}
            onChange={e => handleInput('subClass', e.target.value)}
            error={!subClass && null_subClass}
          />
        </div>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Barcode"
            variant="outlined"
            value={barCode}
            type={'number'}
            onChange={e => handleInput('barcode', e.target.value)}
            error={!barCode && null_barCode}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Vendor Id"
            type={'number'}
            variant="outlined"
            value={vendorId}
            onChange={e => handleInput('vendorId', e.target.value)}
            error={!vendorId && null_vendorId}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Puschase Price"
            type={'number'}
            variant="outlined"
            value={purchasePrice}
            onChange={e => handleInput('purchaseId', e.target.value)}
            error={!purchasePrice && null_purchasePrice}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Business Unit Price"
            variant="outlined"
            type={'number'}
            value={buPrice}
            onChange={e => handleInput('BUPrice', e.target.value)}
            error={!buPrice && null_buPrice}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Sale Price"
            variant="outlined"
            value={salePrice}
            type={'number'}
            onChange={e => handleInput('salePrice', e.target.value)}
            error={!salePrice && null_salePrice}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Unit"
            variant="outlined"
            value={unit}
            onChange={e => handleInput('unit', e.target.value)}
            error={!unit && null_unit}
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
          {comingFor === 'AddItems' ? (
            <Button
              style={{ paddingLeft: 30, paddingRight: 30 }}
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

      <Notification msg={msg} open={tr} />
    </div>
  );
}

export default AddItems;
