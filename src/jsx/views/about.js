import React from 'react';
import Back from '../partials/back';
import { Link } from 'react-router-dom';

class About extends React.Component {
    render() {
        return (
            <div>
                <h1 className="content-header">🤓 about me</h1>
                <section>
                    <ul>
                        <li>
                            front-end engineer with a passion for learning new technologies and applying myself towards building products that bring meaningful change
                        </li>
                        <li>
                            currently working on peer-to-peer based streaming product at <a href="https://bittorrent.com" target="_blank">BitTorrent</a>
                        </li>
                        <li>
                            some <Link to="/uses">things</Link> I use on a daily basis
                        </li>
                        <li>
                            sometimes I write <a href="https://medium.com/@achhunna" target="_blank">stuff</a>
                        </li>
                    </ul>
                </section>
                <p className="footnote">
                ✉️ Send me a note: <a href="mailto:achhunna@gmail.com?subject=hello">achhunna@gmail.com</a>
                </p>
                <Back />
            </div>
        );
    }
}

export default About;