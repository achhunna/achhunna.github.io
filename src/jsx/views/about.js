import React from 'react';
import Back from '../partials/back';

class About extends React.Component {
    render() {
        return (
            <div>
                <h1 className="content-header">🤓 about me</h1>
                <section>
                    <ul>
                        <li>
                            passion for learning new technologies, particularly in front-end web because its always changing...always growing
                        </li>
                        <li>
                            applying experience and knowledge towards building products that bring meaningful change
                        </li>
                        <li>
                            currently working on P2P based streaming solution at <a href="https://bittorrent.com">BitTorrent</a>
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