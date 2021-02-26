import React, {Component} from 'react'
import firebase from 'firebase'
import 'firebase/storage'
import Router from 'next/router'

class EventCard extends Component {
    constructor(props) {
        super(props)
        this.state = {title: '', belong: '', author: '', day: '', time: ''}
    }

    goPage() {
        Router.push('/')
    }

    zfill(s) { //0埋め
        if (s.length==1) return '0'+s
        else return s
    }

    isLower() { //現在時刻がイベント時刻よりも前かを判定
        const date = new Date()
        let date1 = [date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes()] //現在時刻
        for (let i=0; i<4; i++) date1[i] = this.zfill(String(date1[i]))

        let date2 = ['03'] //イベント時刻 (3月なのは確定)
        let flag = false
        let day = ''
        for (let i=0; i<this.state.day.length; i++) {
            if (flag) day += this.state.day[i]
            if (this.state.day[i]=='/') flag = true
        }
        date2.push(this.zfill(day)) //何日か
        let hour = ''
        let minute = ''
        for (let i=0; i<5; i++) {
            if (this.state.time[i]==':') {
                flag = false
                continue
            }
            if (flag) hour += this.state.time[i]
            else minute += this.state.time[i]
        }

        date2.push(this.zfill(hour)) //何時か
        date2.push(this.zfill(minute)) //何分か

        for (let i=0; i<4; i++) {
            if (date1[i]<date2[i]) return true
            else if (date1[i]>date2[i]) return false
        }
        return false
    }
    
    render() {
        if (this.state.title=='') {
            let db = firebase.database()
            let ref = db.ref('sessions/'+this.props.session_id)

            ref.on('value', (snapshot)=>{
                this.setState({
                    title: snapshot.val().title,
                    belong: snapshot.val().belong,
                    author: snapshot.val().author,
                    day: snapshot.val().day,
                    time: snapshot.val().time
                })
            })
        }

        let img_src = '../static/images/'+this.props.session_id+'.png'
        let flag = this.isLower()

        return (
            <div>
                <section className='card' onClick={()=>{this.goPage()}}>
                    <img className='card-img' src={img_src} alt='画像がないよ' />
                    <div className='card-content'>
                        <h1 className='card-title'>{this.state.title}</h1>
                        <p className='card-text'>{this.state.belong}</p>
                        <p className='card-text'>{this.state.author}</p>
                        {flag && <p className='card-text'>{this.state.day} {this.state.time}</p>}
                    </div>
                    {!flag && <p className='end-text'>公開終了しました</p> } 
                </section>
            </div>
        )
    }
}

export default EventCard