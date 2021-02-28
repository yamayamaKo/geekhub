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
    const [id, setId] = useState(props.login_id);
    const router = useRouter();
    const db = firebase.database();

    // ページロード時の処理を追加している
    useEffect(()=>{
        props.dispatch({type:'LoadPage', num:router.query.id})
        
        let ref = db.ref('sessions/'+router.query.id)
        ref.orderByKey()
            .on('value', (snapshot)=>{
                setData(Lib.deepcopy(snapshot))
            })

        let idref = db.ref('user_fav')
        if (id == -1){
            idref.orderByKey().limitToLast(1).on('value',(snapshot)=>{
                let new_id = (Object.entries(snapshot.val())[0][0])*1 +1;
                setId(new_id)
            })
        }

    },[])

    // お気に入りボタン押下時の処理
    function addFavorite(){
        // favsを更新する
        let addref = db.ref('sessions/'+router.query.id+'/favs')
        var nowfavs;
        addref.on('value',(snapshot)=>{
            console.log(snapshot.val())
            nowfavs = snapshot.val()
        });
        addref.set(nowfavs+1)

        props.dispatch({type:'AddFavorite', num:router.query.id, id:id});
    }

    // お気に入り解除ボタン押下時の処理
    function deleteFavorite(){
        console.log('del')
        let delref = db.ref('sessions/'+router.query.id+'/favs')
        let delfavs;
        delref.on('value', (snapshot)=>{ delfavs = snapshot.val()});
        delref.set(delfavs - 1);
        props.dispatch({type:'DeleteFavorite', num:router.query.id});
    }

    const img_src = '../../static/images/'+router.query.id+'.png';
    const err_src = '../../static/images/noimage.png'

    return(
        <Layout title='Event'>
            <div className="text-center p-8 w-full">
                <h1 className="text-5xl">{data.title}</h1>
                <img className="py-10 object-center mx-auto" src={img_src} onError={(e)=>{
                    e.target.src = err_src
                    e.target.className = "py-10 object-center max-h-96 mx-auto"
                    }}/>
                <div className="text-3xl">
                    <h2>{data.belong}</h2>
                    <h2>{data.author}</h2>
                    <br/>
                    <h2>{data.day}, {data.time}, {data.room}</h2>
                </div>
                <div className="p-10">
                    {props.login_user_fav[router.query.id] === 0
                    ?
                    <button type="button" onClick={() => addFavorite()}
                        className="w-48 focus:outline-none text-white text-sm py-2.5 px-5 
                        border-b-4 border-yellow-600 rounded-md bg-yellow-500 
                        hover:bg-yellow-400">お気に入りに追加</button>
                    // <button onClick={()=>addFavorite()}>お気に入りに追加</button>
                    :
                    <button type="button" onClick={() => deleteFavorite()}
                        className="w-48 focus:outline-none text-white text-sm py-2.5 px-5 
                        border-b-4 border-yellow-600 rounded-md bg-yellow-500 
                        hover:bg-yellow-400">お気に入りから外す</button>
                    // <button onClick={()=>deleteFavorite()}>お気に入りから外す</button>
                    }
                </div>
            </div>
        </Layout>
    )
}

Event = connect((state)=>state)(Event);
export default Event;