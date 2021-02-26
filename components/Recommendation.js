import React, {Component} from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import 'firebase/storage'
import EventCard from './EventCard'

class Recommend extends Component {
    constructor(props) {
        super(props)
        let a = Array(13)
        a.fill(-1)
        this.state = {isCalculated: false, recommend: a}
    }

    dot(v, w) {
        let res = 0
        for (let i=0; i<v.length; i++) res += (v[i]*1)*(w[i]*1)
        return res
    }

    cosine_similarity(v, w) {
        if (this.dot(w, w)==0) return 0
        return this.dot(v, w)/Math.sqrt(this.dot(v, v)*this.dot(w, w))
    }

    userBaseFiltering() {
        let user_fav = []
        let score = Array(65)
        score.fill(0)
        let db = firebase.database()
        let ref = db.ref('user_fav')
        let order = []

        ref.orderByKey().on('value', (snapshot)=>{
            user_fav = snapshot.val()
            let score = Array(65)
            score.fill(0)

            for (let i=0; i<user_fav.length; i++) {
                if (i==this.props.login_user_id) continue
                let weight = this.cosine_similarity(this.props.login_user_fav, user_fav[i])
                for (let j=0; j<65; j++) {
                    if (user_fav[i][j]=='1') score[j] += weight
                }
            }
            
            for (let i=0; i<65; i++) order.push({'session_id': i, 'score': score[i]})
            order.sort(function(a, b){
                if (a['score']>b['score']) return -1
                else if (a['score']<b['score']) return 1
                else return 0
            })

            for (let i=0; i<65; i++) {
                let session_id = order[i]['session_id']
                if (this.props.login_user_fav[session_id]=='1') continue
                if (this.state.recommend[Math.floor(session_id/5)]!=-1) continue
                let new_recommend = this.state.recommend.slice()
                new_recommend[Math.floor(session_id/5)] = session_id
                this.setState({recommend: new_recommend})
            }
        })

        this.setState({isCalculated: true})
    }

    render() {
        if (!this.state.isCalculated) this.userBaseFiltering()
        const date = new Date()
        const day = date.getDate()
        
        let day_one_recommend = []
        let day_two_recommend = []
        let day_three_recommend = []
        for (let i=0; i<4; i++) if (this.state.recommend[i]!=-1) day_one_recommend.push(<EventCard session_id={this.state.recommend[i]} />)
        for (let i=4; i<8; i++) if (this.state.recommend[i]!=-1) day_two_recommend.push(<EventCard session_id={this.state.recommend[i]} />)
        for (let i=8; i<13; i++) if (this.state.recommend[i]!=-1) day_three_recommend.push(<EventCard session_id={this.state.recommend[i]} />)
        let day_one_flag = day_one_recommend.length>0
        let day_two_flag = day_two_recommend.length>0
        let day_three_flag = day_three_recommend.length>0
        
        return (
            <div>
                <h1 class='recommendation_h1'>あなたへおすすめのコンテンツ</h1>
                {day_one_flag && <p class='recommendation_p'>1日目</p>}
                <div class='events'>
                    {day_one_recommend.map((v)=>v)}
                </div>
                {day_two_flag && <p class='recommendation_p'>2日目</p>}
                <div class='events'>
                    {day_two_recommend.map((v)=>v)}
                </div>
                {day_three_flag && <p class='recommendation_p'>3日目</p>}
                <div class='events'>
                    {day_three_recommend.map((v)=>v)}
                </div>
            </div>
        )
    }
}

export default connect((state)=>state)(Recommend)