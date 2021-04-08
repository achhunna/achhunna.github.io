import React from "react";
import Back from "../partials/back";
import "./uses.scss";

class Uses extends React.Component {
  render() {
    return (
      <div>
        <h1 className="content-header">👨‍💻 things I use</h1>
        <section>
          <ul>
            <div className="category">software</div>
            <li>
              <a href="https://code.visualstudio.com" target="_blank">
                Visual Studio Code
              </a>
              : one of the best text editors for web development
            </li>
            <li>Terminal: standard macOS terminal</li>
            <li>
              <a href="https://slack.com/downloads/mac" target="_blank">
                Slack
              </a>
              : work related communication happens here, great for archiving
              channel discussions
            </li>
            <li>
              <a href="https://zeplin.io/" target="_blank">
                Zeplin
              </a>
              : sharing UI/UX mocks
            </li>
            <li>
              <a href="https://www.pixelmator.com/mac/" target="_blank">
                Pixelmator
              </a>
              : quick image manipulation
            </li>
          </ul>
          <ul>
            <div className="category">hardware</div>
            <li>
              
              <ul>
                <li>MacBook Pro 16" (2019)</li>
                <li>iPhone 12 mini</li>
                <li>Magic Trackpad 2</li>
                <li>Magic Keyboard 2</li>
                <li>AirPods Pro</li>
              </ul>
            </li>
            <li>
              <a
                href="https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard"
                target="_blank"
              >
                Keychron K2
              </a>{" "}
              mechanical keyboard
            </li>
            <li>
              <a
                href="https://www.amazon.com/Sony-MDR7506-Professional-Diaphragm-Headphone/dp/B000AJIF4E/"
                target="_blank"
              >
                Sony MDR-7506
              </a>{" "}
              studio monitor headphones
            </li>
            <li>
              <a
                href="https://www.apple.com/shop/product/HMUA2VC/A/lg-ultrafine-4k-display"
                target="_blank"
              >
                LG UltraFine 4K Display
              </a>
              : best reasonably priced external monitors for Macs
            </li>
          </ul>
        </section>
        <Back />
      </div>
    );
  }
}

export default Uses;
