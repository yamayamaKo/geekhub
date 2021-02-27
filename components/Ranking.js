import firebase from 'firebase'
import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard'
import Lib from '../static/Lib';

const Ranking = () => {
    const printNum = 5;
    const [printList, setPrintList] = useState([]);

    useEffect(() =>{
        const db = firebase.database();
        let ids = []
        let list = []
        let ref = db.ref('sessions/')

        ref.orderByChild('favs').limitToLast(printNum)
            .on('value', (snapshot) => {
                snapshot.forEach((child)=>{
                    ids.unshift(child.key*1)
                })
                for(let i=0;i<printNum;i++){
                    list.push(
                        <div className='mb-5' key={i}>
                            <h2 className='text-3xl'>{i+1}位</h2>
                            <div className='inline-block' ><EventCard session_id={ids[i]}/></div>
                        </div>
                    )
                }
                setPrintList(list);
            })
    },[])
    
    return(
        <div className='text-center'>
            <h1 className='text-5xl p-10'>人気のイベント</h1>
            {printList}
        </div>
    )
}

export default Ranking;