import {Component} from 'react'
import {useState} from 'react'
import firebase from 'firebase'
import 'firebase/storage'
import { render } from 'react-dom'
import DBAddComponent from './DBAddComponent'

const DBDataAdd = () => {
    const [day, setDay] = useState('')
    const [time, setTime] = useState('')
    const [room, setRoom] = useState('')
    const [belong, setBelong] = useState('')
    const [author, setAuthor] = useState('')
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')

    const database = firebase.database()
    
    return(
        <div>
            <input 
                type='text'
                value={day}
                onChange={(e)=> setDay(e.target.value)}
            />
            <br/>
            <input
                type='text'
                value={time}
                onChange={(e)=> setTime(e.target.value)}
            />
            <br/>
            <input 
                type='text'
                value={room}
                onChange={(e)=> setRoom(e.target.value)}
            />
            <br />
            <input 
                type='text'
                value={belong}
                onChange={(e)=> setBelong(e.target.value)}
            />
            <br/>
            <input 
                type='text'
                value={author}
                onChange={(e)=> setAuthor(e.target.value)}
            />
            <br/>
            <input 
                type='text'
                value={type}
                onChange={(e)=> setType(e.target.value)}
            />
            <br/>
            <input 
                type='text'
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
            />

        </div>
    )
}

export default DBDataAdd;