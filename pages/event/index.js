import Link from 'next/link'
import Layout from '../../components/Layout'

export default () => {
    return(
        <Layout title='event page'>
            形態
            <br/>
            <span>指定なし</span>
            <span>セッション</span>
            <span>勉強会</span>
            <br/>
            日付
            <span>指定なし</span>
            <span>Day1(3/11)</span>
            <span>Day2(3/12)</span>
            <span>Day3(3/13)</span>
            時間
            <span>指定なし</span>
            <span>11:00~12:00</span>
            <span>13:30~14:30</span>
            <span>14:40~15:40</span>
            <span>15:50~16:50</span>
            <span>17:00~18:00</span>

            {/* ここにイベントコンポーネントが来る */}
        </Layout>
    )
}