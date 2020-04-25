import React from 'react'
import Button from '@material-ui/core/Button';

class New extends React.Component {

    routeChange = () => {
        let path = `details/login`;
        this.props.history.push(path);
    }
    render() {
        return (

            <Button color="primary"
                onClick={this.routeChange}
            >
                Login
            </Button>
        )
    }
}

export default New