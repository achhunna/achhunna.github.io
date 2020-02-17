import React from 'react';
import { Link } from 'react-router-dom';

class Back extends React.Component {
    render() {
        return (
            <Link to="/" className="home-link">&#60; home</Link>
        );
    }
}

export default Back;