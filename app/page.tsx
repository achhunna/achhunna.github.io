import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Achhunna Mali</h1>
      <nav>
        <ul>
          <li>
            <Link href="/about" title="(37.9198, -122.2931)">
              about
            </Link>
          </li>
          <li>
            <a href="https://github.com/achhunna">github</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/achhunna">linkedin</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
