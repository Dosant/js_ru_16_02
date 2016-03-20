import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class Forbidden extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Sorry, need to sign in, go here: <Link to="/articles">articles</Link></h1>
            </div>
        )
    }
}

export default Forbidden