import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import Link from 'next/link'
import 'firebase/storage'

const EventCard = ({session_id}) => {
    const [sessions, setSessions] = useState([])
    useEffect(()=>{
        let db = firebase.database()
        let ref = db.ref('sessions')
        ref.orderByKey().on("value", function (snapshot) {
            const sessions_ = snapshot.val()
            setSessions(sessions_)
        })
    }, [])

    let img_src =  '../static/images/'+session_id+'.png'
    let event_src = '/event/'+session_id

    return (
        <>
            <Link href={event_src}>
                <div key={session_id}>
                    <section className='card'>
                    <img className='w-full h-48 card-img' src={img_src} alt='画像がないよ' 
                        style={{objectFit: 'contain'}} 
                        onError={(e)=>{e.target.src = '../static/images/noimage.png'}}/>
                    {sessions.length>0 && <div className='card-content h-64'>
                        <h1 className='card-title'>{sessions[session_id].title}</h1>
                        <p className='card-text'>{sessions[session_id].belong}</p>
                        <p className='card-text'>{sessions[session_id].author}</p>
                        <p className='card-text'>{sessions[session_id].day} {sessions[session_id].time}</p>
                    </div>}
                    </section>
                </div>
            </Link>
        </>
    )
}

export default EventCard