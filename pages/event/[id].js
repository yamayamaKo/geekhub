import Link from 'next/link'
import Layout from '../../components/Layout'
import {useRouter} from 'next/router'
import firebase from 'firebase'
import Lib from '../../static/Lib'
import { useState } from 'react'
import { data } from 'autoprefixer'
import {connect} from 'react-redux'

function Event(){
    const [data, setData] = useState({});
    const router = useRouter();

    if(Object.keys(data).length === 0){
        const db = firebase.database();
        let ref = db.ref('sessions/'+router.query.id)
        ref.orderByKey()
            .on('value', (snapshot) =>{
                setData(Lib.deepcopy(snapshot))
            })
    }

    return(
        <Layout title='event page'>
            <h1>{data.title}</h1>
            <h2>{data.belong}</h2>
            <h2>{data.author}</h2>
            <br/>
            <h2>ROOM:{data.room}</h2>
            <h2>DAY{data.day}, TIME:{data.time}</h2>
            <br/>
            {this.props.login_user_fav[router.query.id] === '0'
            ?
            <button>お気に入りに追加</button>
            :
            <button>お気に入りから外す</button>}
        </Layout>
    )
}

Event = connect((state)=>state)(Event);
export default Event;