import Link from 'next/link'
import styles from './styles.module.css'

export default function Uses() {
  return (
    <div className="container">
      <h1>👨‍💻 things I use</h1>
      <section>
        <ul>
          <div className={styles.category}>software</div>
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
        </ul>
        <ul>
          <div className={styles.category}>hardware</div>
          <li>
            
            <ul>
              <li>MacBook Pro M1 16" (2021)</li>
              <li>iPhone 12 mini</li>
              <li>AirPods Pro</li>
            </ul>
          </li>
          <li>
            <a
              href="https://www.lg.com/us/monitors/lg-27uk850-w-4k-uhd-led-monitor"
              target="_blank"
            >
              LG 27UK850-W
            </a>{' '}
            27" 4K monitor
          </li>
          <li>
            <a
              href="https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard"
              target="_blank"
            >
              Keychron K2
            </a>{' '}
            mechanical keyboard
          </li>
          <li>
            <a
              href="https://www.logitech.com/en-us/products/mice/m350-pebble-wireless-mouse.910-005770.html"
              target="_blank"
            >
              Logitech Pebble M350
            </a>{' '}
            wireless mouse
          </li>
        </ul>
      </section>
      <Link href="/">&#60; home</Link>
    </div>
  )
}
