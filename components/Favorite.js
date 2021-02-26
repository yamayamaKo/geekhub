import React, {Component} from 'react'
import {connect} from 'react-redux'
import EventCard from './EventCard'

class Favorite extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let favorite = []
        
        for (let i=0; i<65; i++) {
            if (this.props.login_user_fav[i]=='1') favorite.push(<EventCard session_id={i} />)
        }

        return (
            <div>
                <h1 class='favorite_h1'>お気に入りしたコンテンツ</h1>
                <div class='favorite'>
                    {favorite}
                </div>
            </div>
        )
    }
}

export default connect((state)=>state)(Favorite)