import React, {Component} from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import 'firebase/storage'
import EventCard from './EventCard'

class Search extends Component {
    constructor(props) {
        super(props)
        let eventCards = []
        for (let i=0; i<65; i++) eventCards.push(<EventCard session_id={i} />)
        this.state = {
            forms: [],
            days: [],
            times: [],
            form: '指定なし',
            day: '指定なし',
            time: '指定なし',
            eventCards: eventCards,
            display_sessions: eventCards
        }
        
        let db = firebase.database()
        let ref = db.ref('sessions')

        ref.orderByKey().on('value', (snapshot)=>{
            let forms = []
            let days = []
            let times = []
            
            for (let i=0; i<snapshot.val().length; i++) {
                forms.push(snapshot.val()[i].type)
                days.push(snapshot.val()[i].day)
                times.push(snapshot.val()[i].time)
            }
    
            this.setState({
                forms: forms,
                days: days,
                times: times
            })
        })
    }

    isOK(i, option) {
        let form_ok = false
        if (option[0]=='指定なし') form_ok = true
        if (option[0]=='講演' && this.state.forms[i]=='session') form_ok = true
        if (option[0]=='勉強会' && this.state.forms[i]=='study') form_ok = true
        let day_ok = false
        if (option[1]=='指定なし') day_ok = true
        if (option[1]=='Day1(3/11)' && this.state.days[i]=='3/11') day_ok = true
        if (option[1]=='Day2(3/12)' && this.state.days[i]=='3/12') day_ok = true
        if (option[1]=='Day3(3/13)' && this.state.days[i]=='3/13') day_ok = true
        let time_ok = false
        if (option[2]=='指定なし') time_ok = true
        if (option[2]=='11:00~12:00' && this.state.times[i]=='11:00-12:00') time_ok = true
        if (option[2]=='13:30~14:30' && this.state.times[i]=='13:30-14:30') time_ok = true
        if (option[2]=='14:40~15:40' && this.state.times[i]=='14:40-15:40') time_ok = true
        if (option[2]=='15:50~16:50' && this.state.times[i]=='15:50-16:50') time_ok = true
        if (option[2]=='17:00~18:00' && this.state.times[i]=='17:00-18:00') time_ok = true
        return form_ok & day_ok & time_ok
    }

    formChange(v) {
        this.setState({form: v})
        this.getData([v, this.state.day, this.state.time])
    }

    dayChange(v) {
        this.setState({day: v})
        this.getData([this.state.form, v, this.state.time])
    }

    timeChange(v) {
        this.setState({time: v})
        this.getData([this.state.form, this.state.day, v])
    }

    getData(option) {
        let display_session_ids = []
        for (let i=0; i<65; i++) if (this.isOK(i, option)) display_session_ids.push(i)
        let display_sessions = []
        for (let i=0; i<display_session_ids.length; i++) display_sessions.push(this.state.eventCards[display_session_ids[i]])
        this.setState({display_sessions: display_sessions})
    }

    render() {
        return (
            <div>
                <h1 class='selection_h1'>形態</h1>
                <div class='selection'>
                    {this.state.form=='指定なし' ? <button class='selected'>指定なし</button> : <button onClick={()=>{this.formChange('指定なし')}}>指定なし</button>}
                    {this.state.form=='講演' ? <button class='selected'>講演</button> : <button onClick={()=>{this.formChange('講演')}}>講演</button>}
                    {this.state.form=='勉強会' ? <button class='selected'>勉強会</button> : <button onClick={()=>{this.formChange('勉強会')}}>勉強会</button>}
                </div>

                <h1 class='selection_h1'>日付</h1>
                <div class='selection'>
                    {this.state.day=='指定なし' ? <button class='selected'>指定なし</button> : <button onClick={()=>{this.dayChange('指定なし')}}>指定なし</button>}
                    {this.state.day=='Day1(3/11)' ? <button class='selected'>Day1(3/11)</button> : <button onClick={()=>{this.dayChange('Day1(3/11)')}}>Day1(3/11)</button>}
                    {this.state.day=='Day2(3/12)' ? <button class='selected'>Day2(3/12)</button> : <button onClick={()=>{this.dayChange('Day2(3/12)')}}>Day2(3/12)</button>}
                    {this.state.day=='Day3(3/13)' ? <button class='selected'>Day3(3/13)</button> : <button onClick={()=>{this.dayChange('Day3(3/13)')}}>Day3(3/13)</button>}
                </div>
                
                <h1 class='selection_h1'>時間</h1>
                <div class='selection'>
                    {this.state.time=='指定なし' ? <button class='selected'>指定なし</button> : <button onClick={()=>{this.timeChange('指定なし')}}>指定なし</button>}
                    {this.state.time=='11:00~12:00' ? <button class='selected'>11:00~12:00</button> : <button onClick={()=>{this.timeChange('11:00~12:00')}}>11:00~12:00</button>}
                    {this.state.time=='13:30~14:30' ? <button class='selected'>13:30~14:30</button> : <button onClick={()=>{this.timeChange('13:30~14:30')}}>13:30~14:30</button>}
                    {this.state.time=='14:40~15:40' ? <button class='selected'>14:40~15:40</button> : <button onClick={()=>{this.timeChange('14:40~15:40')}}>14:40~15:40</button>}
                    {this.state.time=='15:50~16:50' ? <button class='selected'>15:50~16:50</button> : <button onClick={()=>{this.timeChange('15:50~16:50')}}>15:50~16:50</button>}
                    {this.state.time=='17:00~18:00' ? <button class='selected'>17:00~18:00</button> : <button onClick={()=>{this.timeChange('17:00~18:00')}}>17:00~18:00</button>}
                </div>

                <div class='display_sessions'>
                    {this.state.display_sessions}
                </div>
            </div>
        )
    }
}

export default Search