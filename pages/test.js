import {Link} from '../routes'
import Layout from '../components/layout'
export default () => (
  <div>
    <div>Welcome to Next.js!</div>
    <Link href="/categories/[slug]" as='/categories/testi'>
      <a>Hello world</a>
    </Link>
  </div>
)