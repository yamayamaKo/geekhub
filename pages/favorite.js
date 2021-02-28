import Link from 'next/link'
import Layout from '../components/Layout'
import Favorite from '../components/Favorite'

export default () => {
    return(
        <Layout title="MyPage">
            <Favorite />
        </Layout>
    )
}
