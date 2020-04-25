import React from 'react'
import Button from '@material-ui/core/Button';
import { Router, Route, Switch, Redirect } from "react-router-dom";

import New from '../New.js'
import NotFound from '../components/NotFound/NotFound'

import Login from '../layouts/Login'

class Dashboard extends React.Component {


    render() {
        console.log('rednere', this.props.match)
        return (

            <Switch>
                <Route exact path={`${this.props.match.url}`} component={New} />
                <Route  path={`${this.props.match.url}/furthur`} component={Login} />
                <Route path='*' component={NotFound} /> 


                {/* <Route exact path="/" component={Login} />
                    <Route exact path="*" component={NotFound} /> */}

                {/* <Route path="/rtl" component={RTL} /> */}
                {/* <Redirect from="/" to="/admin" /> */}

            </Switch>
        )
    }
}

export default Dashboard