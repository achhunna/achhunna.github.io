import Link from 'next/link'

export default function About() {
  return (
    <div className="container">
      <h1 title="(37.9198, -122.2931)">🏄‍♂️ about me</h1>
      <section>
        <ul>
          <li>
            creative mind always looking for projects to tinker with
          </li>
          <li>
            love to <a href="https://vimeo.com/achhunna" target="_blank">surf</a> and play <a href="https://instagram.com/shakablues" target="_blank">music</a> 
          </li>
          <li>
            I {' '}
            <a href="https://medium.com/@achhunna" target="_blank">
            write
            </a> sometimes
          </li>
          <li>
            work in software building SaaSy <a href="https://amplitude.com" target="_blank">UI</a>
          </li>
          <li>
            if you're curious what I <Link href="/uses">use</Link> for work
          </li>
        </ul>
      </section>
      <Link href="/">&#60; home</Link>
    </div>
  )
}
