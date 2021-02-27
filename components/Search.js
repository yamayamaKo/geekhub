import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import 'firebase/storage'
import EventCard from './EventCard'

const Search = () => {
    let eventCards_ = []
    for (let i=0; i<65; i++) eventCards_.push(<EventCard session_id={i} />)
    const [forms, setForms] = useState([])
    const [days, setDays] = useState([])
    const [times, setTimes] = useState([])
    const [form, setForm] = useState('指定なし')
    const [day, setDay] = useState('指定なし')
    const [time, setTime] = useState('指定なし')
    const [eventCards, setEventCards] = useState(eventCards_)
    const [display_sessions, setDisplay_sessions] = useState(eventCards_)
    
    useEffect(()=>{
        let db = firebase.database()
        let ref = db.ref('sessions')

        ref.orderByKey().on('value', (snapshot)=>{
            let forms_ = []
            let days_ = []
            let times_ = []
            
            for (let i=0; i<snapshot.val().length; i++) {
                forms_.push(snapshot.val()[i].type)
                days_.push(snapshot.val()[i].day)
                times_.push(snapshot.val()[i].time)
            }
            
            setForms(forms_)
            setDays(days_)
            setTimes(times_)
        })
    }, [])

    const isOK = (i, option) => {
        let form_ok = false
        if (option[0]=='指定なし') form_ok = true
        if (option[0]=='講演' && forms[i]=='session') form_ok = true
        if (option[0]=='勉強会' && forms[i]=='study') form_ok = true
        let day_ok = false
        if (option[1]=='指定なし') day_ok = true
        if (option[1]=='Day1(3/11)' && days[i]=='3/11') day_ok = true
        if (option[1]=='Day2(3/12)' && days[i]=='3/12') day_ok = true
        if (option[1]=='Day3(3/13)' && days[i]=='3/13') day_ok = true
        let time_ok = false
        if (option[2]=='指定なし') time_ok = true
        if (option[2]=='11:00~12:00' && times[i]=='11:00-12:00') time_ok = true
        if (option[2]=='13:30~14:30' && times[i]=='13:30-14:30') time_ok = true
        if (option[2]=='14:40~15:40' && times[i]=='14:40-15:40') time_ok = true
        if (option[2]=='15:50~16:50' && times[i]=='15:50-16:50') time_ok = true
        if (option[2]=='17:00~18:00' && times[i]=='17:00-18:00') time_ok = true
        return form_ok & day_ok & time_ok
    }

    const formChange = (v) => {
        setForm(v)
        getData([v, day, time])
    }

    const dayChange = (v) => {
        setDay(v)
        getData([form, v, time])
    }

    const timeChange = (v) => {
        setTime(v)
        getData([form, day, v])
    }

    const getData = (option) => {
        console.log(option)
        let display_session_ids = []
        for (let i=0; i<65; i++) if (isOK(i, option)) display_session_ids.push(i)
        let display_sessions = []
        for (let i=0; i<display_session_ids.length; i++) display_sessions.push(eventCards[display_session_ids[i]])
        setDisplay_sessions(display_sessions)
    }

    return (
        <>
            <div className='p-10 bg-gray-100'>
                <h1 className='selection_h1'>形態</h1>
                <div className='selection'>
                    {form=='指定なし' ? <button className='selected'>指定なし</button> : <button onClick={()=>{formChange('指定なし')}}>指定なし</button>}
                    {form=='講演' ? <button className='selected'>講演</button> : <button onClick={()=>{formChange('講演')}}>講演</button>}
                    {form=='勉強会' ? <button className='selected'>勉強会</button> : <button onClick={()=>{formChange('勉強会')}}>勉強会</button>}
                </div>

                <h1 className='selection_h1'>日付</h1>
                <div className='selection'>
                    {day=='指定なし' ? <button className='selected'>指定なし</button> : <button onClick={()=>{dayChange('指定なし')}}>指定なし</button>}
                    {day=='Day1(3/11)' ? <button className='selected'>Day1(3/11)</button> : <button onClick={()=>{dayChange('Day1(3/11)')}}>Day1(3/11)</button>}
                    {day=='Day2(3/12)' ? <button className='selected'>Day2(3/12)</button> : <button onClick={()=>{dayChange('Day2(3/12)')}}>Day2(3/12)</button>}
                    {day=='Day3(3/13)' ? <button className='selected'>Day3(3/13)</button> : <button onClick={()=>{dayChange('Day3(3/13)')}}>Day3(3/13)</button>}
                </div>
                
                <h1 className='selection_h1'>時間</h1>
                <div className='selection'>
                    {time=='指定なし' ? <button className='selected'>指定なし</button> : <button onClick={()=>{timeChange('指定なし')}}>指定なし</button>}
                    {time=='11:00~12:00' ? <button className='selected'>11:00~12:00</button> : <button onClick={()=>{timeChange('11:00~12:00')}}>11:00~12:00</button>}
                    {time=='13:30~14:30' ? <button className='selected'>13:30~14:30</button> : <button onClick={()=>{timeChange('13:30~14:30')}}>13:30~14:30</button>}
                    {time=='14:40~15:40' ? <button className='selected'>14:40~15:40</button> : <button onClick={()=>{timeChange('14:40~15:40')}}>14:40~15:40</button>}
                    {time=='15:50~16:50' ? <button className='selected'>15:50~16:50</button> : <button onClick={()=>{timeChange('15:50~16:50')}}>15:50~16:50</button>}
                    {time=='17:00~18:00' ? <button className='selected'>17:00~18:00</button> : <button onClick={()=>{timeChange('17:00~18:00')}}>17:00~18:00</button>}
                </div>

                <div className='display_sessions'>
                    {display_sessions}
                </div>
            </div>
        </>
    )
}

export default Search

// class Search extends Component {
//     constructor(props) {
//         super(props)
//         let eventCards = []
//         for (let i=0; i<65; i++) eventCards.push(<EventCard session_id={i} />)
//         this.state = {
//             forms: [],
//             days: [],
//             times: [],
//             form: '指定なし',
//             day: '指定なし',
//             time: '指定なし',
//             eventCards: eventCards,
//             display_sessions: eventCards
//         }
        
//         let db = firebase.database()
//         let ref = db.ref('sessions')

//         ref.orderByKey().on('value', (snapshot)=>{
//             let forms = []
//             let days = []
//             let times = []
            
//             for (let i=0; i<snapshot.val().length; i++) {
//                 forms.push(snapshot.val()[i].type)
//                 days.push(snapshot.val()[i].day)
//                 times.push(snapshot.val()[i].time)
//             }
    
//             this.setState({
//                 forms: forms,
//                 days: days,
//                 times: times
//             })
//         })
//     }

//     isOK(i, option) {
//         console.log(option)
//         let form_ok = false
//         if (option[0]=='指定なし') form_ok = true
//         if (option[0]=='講演' && this.state.forms[i]=='session') form_ok = true
//         if (option[0]=='勉強会' && this.state.forms[i]=='study') form_ok = true
//         let day_ok = false
//         if (option[1]=='指定なし') day_ok = true
//         if (option[1]=='Day1(3/11)' && this.state.days[i]=='3/11') day_ok = true
//         if (option[1]=='Day2(3/12)' && this.state.days[i]=='3/12') day_ok = true
//         if (option[1]=='Day3(3/13)' && this.state.days[i]=='3/13') day_ok = true
//         let time_ok = false
//         if (option[2]=='指定なし') time_ok = true
//         if (option[2]=='11:00~12:00' && this.state.times[i]=='11:00-12:00') time_ok = true
//         if (option[2]=='13:30~14:30' && this.state.times[i]=='13:30-14:30') time_ok = true
//         if (option[2]=='14:40~15:40' && this.state.times[i]=='14:40-15:40') time_ok = true
//         if (option[2]=='15:50~16:50' && this.state.times[i]=='15:50-16:50') time_ok = true
//         if (option[2]=='17:00~18:00' && this.state.times[i]=='17:00-18:00') time_ok = true
//         return form_ok & day_ok & time_ok
//     }

//     formChange(v) {
//         this.setState({form: v})
//         this.getData([v, this.state.day, this.state.time])
//     }

//     dayChange(v) {
//         this.setState({day: v})
//         this.getData([this.state.form, v, this.state.time])
//     }

//     timeChange(v) {
//         this.setState({time: v})
//         this.getData([this.state.form, this.state.day, v])
//     }

//     getData(option) {
//         let display_session_ids = []
//         for (let i=0; i<65; i++) if (this.isOK(i, option)) display_session_ids.push(i)
//         let display_sessions = []
//         for (let i=0; i<display_session_ids.length; i++) display_sessions.push(this.state.eventCards[display_session_ids[i]])
//         console.log(display_sessions)
//         console.log(this.state.forms)
//         this.setState({display_sessions: display_sessions})
//     }

//     render() {
//         return (
//             <div className='p-10 bg-gray-100'>
//                 <h1 className='selection_h1'>形態</h1>
//                 <div className='selection'>
//                     {this.state.form=='指定なし' ? <button className='selected'>指定なし</button> : <button onClick={()=>{this.formChange('指定なし')}}>指定なし</button>}
//                     {this.state.form=='講演' ? <button className='selected'>講演</button> : <button onClick={()=>{this.formChange('講演')}}>講演</button>}
//                     {this.state.form=='勉強会' ? <button className='selected'>勉強会</button> : <button onClick={()=>{this.formChange('勉強会')}}>勉強会</button>}
//                 </div>

//                 <h1 className='selection_h1'>日付</h1>
//                 <div className='selection'>
//                     {this.state.day=='指定なし' ? <button className='selected'>指定なし</button> : <button onClick={()=>{this.dayChange('指定なし')}}>指定なし</button>}
//                     {this.state.day=='Day1(3/11)' ? <button className='selected'>Day1(3/11)</button> : <button onClick={()=>{this.dayChange('Day1(3/11)')}}>Day1(3/11)</button>}
//                     {this.state.day=='Day2(3/12)' ? <button className='selected'>Day2(3/12)</button> : <button onClick={()=>{this.dayChange('Day2(3/12)')}}>Day2(3/12)</button>}
//                     {this.state.day=='Day3(3/13)' ? <button className='selected'>Day3(3/13)</button> : <button onClick={()=>{this.dayChange('Day3(3/13)')}}>Day3(3/13)</button>}
//                 </div>
                
//                 <h1 className='selection_h1'>時間</h1>
//                 <div className='selection'>
//                     {this.state.time=='指定なし' ? <button className='selected'>指定なし</button> : <button onClick={()=>{this.timeChange('指定なし')}}>指定なし</button>}
//                     {this.state.time=='11:00~12:00' ? <button className='selected'>11:00~12:00</button> : <button onClick={()=>{this.timeChange('11:00~12:00')}}>11:00~12:00</button>}
//                     {this.state.time=='13:30~14:30' ? <button className='selected'>13:30~14:30</button> : <button onClick={()=>{this.timeChange('13:30~14:30')}}>13:30~14:30</button>}
//                     {this.state.time=='14:40~15:40' ? <button className='selected'>14:40~15:40</button> : <button onClick={()=>{this.timeChange('14:40~15:40')}}>14:40~15:40</button>}
//                     {this.state.time=='15:50~16:50' ? <button className='selected'>15:50~16:50</button> : <button onClick={()=>{this.timeChange('15:50~16:50')}}>15:50~16:50</button>}
//                     {this.state.time=='17:00~18:00' ? <button className='selected'>17:00~18:00</button> : <button onClick={()=>{this.timeChange('17:00~18:00')}}>17:00~18:00</button>}
//                 </div>

//                 <div className='display_sessions'>
//                     {this.state.display_sessions}
//                 </div>
//             </div>
//         )
//     }
// }

// export default Search