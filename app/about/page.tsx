import Link from 'next/link'

export default function About() {
  return (
    <div className="container">
      <h1 title="(37.9198, -122.2931)">🤓 about me</h1>
      <section>
        <ul>
          <li>
            front-end engineer with a passion for learning new technologies and
            building products that bring meaningful change
          </li>
          <li>
            currently building <a href="/map">navigation</a> data UI at{' '}
            <a href="/nyt-saildrone.html" title="(37.7822, -122.3049)">
              Saildrone
            </a>
          </li>
          <li>
            some <Link href="/uses">things</Link> I use
          </li>
          <li>
            sometimes I write{' '}
            <a href="https://medium.com/@achhunna" target="_blank">
              stuff
            </a>
          </li>
        </ul>
      </section>
      <Link href="/">&#60; home</Link>
    </div>
  )
}
