import Link from 'next/link'
import Layout from '../../components/Layout'
import {useRouter} from 'next/router'
import firebase from 'firebase'
import Lib from '../../static/Lib'
import { useEffect, useState } from 'react'
import { data } from 'autoprefixer'
import {connect} from 'react-redux'
import { route } from 'next/dist/next-server/server/router'

function Event(props){
    const [data, setData] = useState({});
    const router = useRouter();
    const db = firebase.database();

    // ページロード時の処理を追加している
    useEffect(()=>{
        props.dispatch({type:'LoadPage', num:router.query.id})
    },[])

    if(Object.keys(data).length === 0){
        let ref = db.ref('sessions/'+router.query.id)
        ref.orderByKey()
            .on('value', (snapshot) =>{
                setData(Lib.deepcopy(snapshot))
            })
    }

    // お気に入りボタン押下時の処理
    function addFavorite(){
        console.log(props)
        let addref = db.ref('sessions/'+router.query.id+'/favs')
        var nowfavs;
        addref.on('value',(snapshot)=>{ nowfavs = snapshot.val()});
        addref.set(nowfavs+1)
        props.dispatch({type:'AddFavorite', num:router.query.id});

    }

    // お気に入り解除ボタン押下時の処理
    function deleteFavorite(){
        let delref = db.ref('sessions/'+router.query.id+'/favs')
        var nowfavs;
        delref.on('value', (snapshot)=>{ nowfavs = snapshot.val()});
        delref.set(nowfavs - 1);
        props.dispatch({type:'DeleteFavorite', num:router.query.id});
    }
    // console.log(props.login_user_fav[router.query.id])

    return(
        <Layout title='event page'>
            <h1 onLoad={()=>loadPage()}>{data.title}</h1>
            <h2>{data.belong}</h2>
            <h2>{data.author}</h2>
            <br/>
            <h2>ROOM:{data.room}</h2>
            <h2>DAY{data.day}, TIME:{data.time}</h2>
            <br/>
            {props.login_user_fav[router.query.id] === 0
            ?
            <button onClick={()=>addFavorite()}>お気に入りに追加</button>
            :
            <button onClick={()=>deleteFavorite()}>お気に入りから外す</button>}
        </Layout>
    )
}

Event = connect((state)=>state)(Event);
export default Event;