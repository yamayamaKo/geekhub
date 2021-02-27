import Link from 'next/link'
import Layout from '../components/Layout'
import Introduction from '../components/Introduction'
import Contents from '../components/Contents'
import Tweet from '../components/Tweet'

export default () => (
  <Layout title='top page'>
    {/* <Introduction /> */}
    <Contents />
  </Layout>
)