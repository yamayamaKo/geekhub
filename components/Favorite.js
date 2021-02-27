import { Minimize } from '@material-ui/icons'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import EventCard from './EventCard'

class Favorite extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let favorite = []
        let history = []

        for (let i=0; i<65; i++) {
            if (this.props.login_user_fav[i]=='1') favorite.push(<EventCard session_id={i} />)
        }

        for (let i=0; i<Math.min(5, this.props.log.length); i++) {
            history.push(<EventCard session_id={this.props.log[i]} />)
        }

        return (
            <div>
                <h1 className='favorite_h1'>お気に入りしたコンテンツ</h1>
                <div className='favorite'>
                    {favorite}
                </div>
                <h1 className='favorite_h1'>閲覧したコンテンツ</h1>
                <div className='favorite'>
                    {history}
                </div>
            </div>
        )
    }
}

export default connect((state)=>state)(Favorite)