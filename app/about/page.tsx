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
            love to <a href="https://youtube.com/@achhunna/videos">surf</a> and play <a href="https://instagram.com/shakablues">music</a> 
          </li>
          <li>
            I {' '}
            <a href="https://medium.com/@achhunna">
            write
            </a> sometimes
          </li>
          <li>
            work in software building SaaSy <a href="https://amplitude.com">UI</a>
          </li>
        </ul>
      </section>
      <Link href="/">&#60; home</Link>
    </div>
  )
}
