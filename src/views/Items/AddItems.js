import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'



const useStyles = makeStyles(styles);



const styles = {
    inputContainer: {
        marginTop: '2%',
    }
};


function AddItems(props) {
    const classes = useStyles();


    const [comingFor, setcomingFor] = useState("")

    const [name, setName] = useState("")
    const [subClass, setSubClass] = useState("")
    const [unit, setUnit] = useState("")
    const [vendorId, setVendorId] = useState("")
    const [purchaseId, setPurchaseId] = useState("")
    const [BUPrice, setBUPrice] = useState("")
    const [salePrice, setSalePrice] = useState("")
    const [barcode, setBarcode] = useState("")
    const [desc, setDesc] = useState("")



    useEffect(() => {
        setcomingFor(props.history.location.state.comingFor)
        if (props.history.location.state.selectedItem) {
            const temp = props.history.location.state.selectedItem

            setName(temp.name)
            setSubClass(temp.sub_class)
            setDesc(temp.desc)
            setUnit(temp.unit)
            setVendorId(temp.vendor_id)
            setPurchaseId(temp.purchase_price)
            setBUPrice(temp.bu_price)
            setSalePrice(temp.sales_price)
            setBarcode(temp.bar_code)


        }
    }, [])


    const handleCancel = () => {
        props.history.goBack()
    }

    const handleAdd = () => {
        props.history.goBack()
    }


    function handleInput(key, value) {

        if ("name" === key) {
            setName(value)
        }

        else if ("subClass" === key) {
            setSubClass(value)
        }

        else if ("unit" === key) {
            setUnit(value)
        }

        else if ("vendorId" === key) {
            setVendorId(value)
        }

        else if ("purchaseId" === key) {
            setPurchaseId(value)
        }

        else if ("BUPrice" === key) {
            setBUPrice(value)
        }

        else if ("salePrice" === key) {
            setSalePrice(value)
        }

        else if ("barcode" === key) {
            setBarcode(value)
        }

        else if ("desc") {
            setDesc(value)
        }

    }



    return (

        <div className='container'>
            <h1>{comingFor}</h1>

            <div className='row'>
                <div className='col-md-4' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => handleInput("name", e.target.value)}
                    />
                </div>

                <div className='col-md-4' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Sub Class"
                        variant="outlined"
                        value={subClass}
                        onChange={(e) => handleInput("subClass", e.target.value)}
                    />
                </div>

                <div className='col-md-4' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Unit"
                        variant="outlined"
                        value={unit}
                        onChange={(e) => handleInput("unit", e.target.value)}
                    />
                </div>

            </div>


            <div className='row'>
                <div className='col-md-4' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Vendor Id"
                        type={'number'}
                        variant="outlined"
                        value={vendorId}
                        onChange={(e) => handleInput("vendorId", e.target.value)}
                    />
                </div>

                <div className='col-md-4' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Puschase Id"
                        type={'number'}
                        variant="outlined"
                        value={purchaseId}
                        onChange={(e) => handleInput("purchaseId", e.target.value)}
                    />
                </div>

                <div className='col-md-4' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Business Unit Price"
                        variant="outlined"
                        type={'number'}
                        value={BUPrice}
                        onChange={(e) => handleInput("BUPrice", e.target.value)}
                    />
                </div>

            </div>

            <div className='row'>
                <div className='col-md-6' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Sale Price"
                        variant="outlined"
                        value={salePrice}
                        type={'number'}
                        onChange={(e) => handleInput("salePrice", e.target.value)}
                    />
                </div>

                <div className='col-md-6' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Barcode"
                        variant="outlined"
                        value={barcode}
                        type={'number'}
                        onChange={(e) => handleInput("barcode", e.target.value)}
                    />
                </div>

            </div>


            <div className='row' >
                <div className='col-md-12' style={styles.inputContainer}>
                    <TextField fullWidth
                        multiline
                        rows={4}
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        value={desc}
                        onChange={(e) => handleInput("desc", e.target.value)}
                    />
                </div>

            </div>


            <div style={{ display: 'flex', justifyContent: "space-between" }} >
                <div style={styles.inputContainer}>
                    <Button onClick={handleCancel} variant="contained" >
                        Cancel
                    </Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2%' }}>
                    <Button style={{ paddingLeft: 30, paddingRight: 30 }} onClick={handleAdd} variant="contained" color='primary'>   Add   </Button>
                </div>

            </div>


        </div>

    )

}

export default AddItems