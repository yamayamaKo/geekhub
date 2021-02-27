import React, {Component} from 'react'
import firebase from 'firebase'
import 'firebase/storage'
import Router from 'next/router'

class EventCard extends Component {
    constructor(props) {
        super(props)
        this.state = {titles: '', belongs: '', authors: '', days: '', times: ''}
        let db = firebase.database()
        let ref = db.ref('sessions/')
    
        ref.orderByKey().on('value', (snapshot)=>{
            let titles = []
            let belongs = []
            let authors = []
            let days = []
            let times = []

            for (let i=0; i<snapshot.val().length; i++) {
                titles.push(snapshot.val()[i].title)
                belongs.push(snapshot.val()[i].belong)
                authors.push(snapshot.val()[i].author)
                days.push(snapshot.val()[i].day)
                times.push(snapshot.val()[i].time)
            }

            this.setState({
                titles: titles,
                belongs: belongs,
                authors: authors,
                days: days,
                times: times
            })
        })
    }

    goPage() {
        Router.push('/')
    }

    zfill(s) { //0埋め
        if (s.length==1) return '0'+s
        else return s
    }

    // isLower() { //現在時刻がイベント時刻よりも前かを判定
    //     const date = new Date()
    //     let date1 = [date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes()] //現在時刻
    //     for (let i=0; i<4; i++) date1[i] = this.zfill(String(date1[i]))

    //     let date2 = ['03'] //イベント時刻 (3月なのは確定)
    //     let flag = false
    //     let day = ''
    //     for (let i=0; i<this.state.days[this.props.session_id].length; i++) {
    //         if (flag) day += this.state.days[this.props.session_id][i]
    //         if (this.state.day[i]=='/') flag = true
    //     }
    //     date2.push(this.zfill(day)) //何日か
    //     let hour = ''
    //     let minute = ''
    //     for (let i=0; i<5; i++) {
    //         if (this.state.times[this.props.session_]==':') {
    //             flag = false
    //             continue
    //         }
    //         if (flag) hour += this.state.time[i]
    //         else minute += this.state.time[i]
    //     }

    //     date2.push(this.zfill(hour)) //何時か
    //     date2.push(this.zfill(minute)) //何分か

    //     for (let i=0; i<4; i++) {
    //         if (date1[i]<date2[i]) return true
    //         else if (date1[i]>date2[i]) return false
    //     }
    //     return false
    // }
    
    render() {
        //let flag = this.isLower()
        let img_src =  '../static/images/'+this.props.session_id+'.png'

        return (
            <div>
                {this.state.img_src}
                <section class='card' onClick={()=>{this.goPage()}}>
                    <img class='card-img' src={img_src} alt='画像がないよ' />
                    <div class='card-content'>
                        <h1 class='card-title'>{this.state.titles[this.props.session_id]}</h1>
                        <p class='card-text'>{this.state.belongs[this.props.session_id]}</p>
                        <p class='card-text'>{this.state.authors[this.props.session_id]}</p>
                        {<p class='card-text'>{this.state.days[this.props.session_id]} {this.state.times[this.props.session_id]}</p>}
                    </div>
                    {/* {!flag && <p class='end-text'>公開終了しました</p> }  */}
                </section>
            </div>
        )
    }
}

export default EventCard