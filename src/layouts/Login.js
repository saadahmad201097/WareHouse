import React from 'react'

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';


import Snackbar from "components/Snackbar/Snackbar.js";

import AddAlert from "@material-ui/icons/AddAlert";

import { Redirect } from "react-router-dom";



class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            userName: "",
            null_userName: false,

            password: "",
            null_password: "",

            tr: false,

            verifiedUser: false

        }
    }

    handleInput(e, key) {
        this.setState({ [key]: e.target.value })
    }




    handleLogin() {

        if (this.state.userName === "" && this.state.password === "") {
            this.setState({ null_userName: true, null_password: true })
        }

        else if (this.state.userName === "") {
            this.setState({ null_userName: true })
        }

        else if (this.state.password === "") {
            this.setState({ null_password: true })
        }

        else {

            if (this.state.userName === 'admin' && this.state.password === '123') {

                this.setState({ verifiedUser: true })
            }

            else {

                this.setState({ tr: true, userName: "", password: "", null_password: false, null_userName: false })
            }
        }

    }

    render() {


        if (this.state.tr) {
            setTimeout(() => { this.setState({ tr: false }) }, 1000)
        }

        else if (this.state.verifiedUser) {
            return (<Redirect from="/" to="/admin/dashboard" />)

        }

        return (
           
           
           <div className='container' style={{ backgroundColor:'red', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

                <Card style={{ width: "70%",paddingBottom:'5%', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {/* <div style={{ width: '60%', }}> */}

                    <h1 style={{ textAlign: "center", fontFamily:'Ubuntu', fontWeight:'500' }}>Login</h1>


                    <Snackbar
                        place="tr"
                        color="danger"
                        icon={AddAlert}
                        message="Please enter a valid user name and password"
                        open={this.state.tr}
                        closeNotification={() => this.setState({ tr: false })}
                        close
                    />
                    <div className='col-md-8'>
                        <TextField fullWidth
                            label="User Name"
                            variant="outlined"
                            value={this.state.userName}
                            onChange={(e) => this.handleInput(e, "userName")}
                            error={(!this.state.userName && this.state.null_userName)}
                        />
                    </div>

                    <div className='col-md-8' style={{ marginTop: "15px" }}>
                        <TextField type='password'
                            fullWidth
                            label="Password"
                            variant="outlined"
                            value={this.state.password}
                            onChange={(e) => this.handleInput(e, "password")}
                            error={(!this.state.password && this.state.null_password)}
                        />
                    </div>

                    <div style={{ marginTop: '15px', width: '100%', display: "flex", justifyContent: "center" }}>
                        <Button style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: '2%', paddingBottom: '2%' }} onClick={() => this.handleLogin()} variant="contained" color="primary">
                            Login
                 </Button>
                    </div>
                {/* </div> */}
                </Card>
            </div>
        )
    }
}

export default Login