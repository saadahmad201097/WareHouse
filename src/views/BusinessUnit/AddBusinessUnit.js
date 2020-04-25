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


function AddBusinessUnit(props) {
    const classes = useStyles();


    const [comingFor, setcomingFor] = useState("")

    const [BU_name, setName] = useState("")
    const [BU_Head, setHeadName] = useState("")
    const [created_by, setCreatedBy] = useState("")
    const [Timestamp, setTimestamp] = useState("")
    const [desc, setDesc] = useState("")



    useEffect(() => {
        setcomingFor(props.history.location.state.comingFor)
        if (props.history.location.state.selectedItem) {
            const temp = props.history.location.state.selectedItem

            setName(temp.name)
            setHeadName(temp.BU_Head)
            setCreatedBy(temp.created_by)
            setTimestamp(temp.Timestamp)
            setDesc(temp.desc)


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

        else if ("timestamp" === key) {
            setTimestamp(value)
        }

        else if ("headname" === key) {
            setHeadName(value)
        }

        else if ("created_by" === key) {
            setCreatedBy(value)
        }

        else if ("desc") {
            setDesc(value)
        }

    }


    return (

        <div className='container'>
            <h1>{comingFor}</h1>

            <div className='row'>
                <div className='col-md-6' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Business Unit Name"
                        variant="outlined"
                        value={BU_name}
                        onChange={(e) => handleInput("name", e.target.value)}
                    />
                </div>

                <div className='col-md-6' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Business Unit Head Name"
                        variant="outlined"
                        value={BU_Head}
                        onChange={(e) => handleInput("headname", e.target.value)}
                    />
                </div>



            </div>


            <div className='row'>
                <div className='col-md-6' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label="Created By"
                        type={'number'}
                        variant="outlined"
                        value={created_by}
                        onChange={(e) => handleInput("created_by", e.target.value)}
                    />
                </div>

                <div className='col-md-6' style={styles.inputContainer}>
                    <TextField fullWidth
                        id="outlined-basic"
                        label=""
                        // type={'date'}
                        variant="outlined"
                        value={Timestamp}
                        onChange={(e) => handleInput("timestamp", e.target.value)}
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

export default AddBusinessUnit