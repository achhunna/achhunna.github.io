import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li>
                        <a href="https://github.com/achhunna">github</a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/in/achhunna">linkedin</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;