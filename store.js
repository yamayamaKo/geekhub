import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from './api_key'

// const {
//     REACT_APP_FIREBASE_API_KEY,
//     REACT_APP_FIREBASE_AUTH_DOMAIN,
//     REACT_APP_FIREBASE_PROJECT_ID,
//     REACT_APP_FIREBASE_STORAGE_BUCKET,
//     REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     REACT_APP_FIREBASE_APP_ID,
//   } = process.env

//   console.log(REACT_APP_FIREBASE_API_KEY)
// var firebaseConfig = {
//     apiKey: REACT_APP_FIREBASE_API_KEY,
//     authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: REACT_APP_FIREBASE_APP_ID
// }

var fireapp
try {
    firebase.initializeApp(firebaseConfig)
}
catch (error) {
    console.log(error.message)
}


const initial = {
    login_user_id: -1,
    login_user_fav: '10010100001010100000100111000111010110111001110000001011111111000'
}

function recommendReducer(state=initial, action) {
    switch (action.type) {
        case 'Add_or_Delete':
            let new_interest_list = state.interest_list.slice()

            if (new_interest_list.includes(action.value)) {
                new_interest_list = new_interest_list.filter(value=>value!=action.value)
                return {
                    message: 'bbb',
                    interest_list: new_interest_list
                }
            }
            else {
                new_interest_list.push(action.value)
                return {
                    message: 'bbb',
                    interest_list: new_interest_list
                }
            }
        default:
            return state
    }
}

export function initStore(state=initial) {
    return createStore(recommendReducer, state, applyMiddleware(thunkMiddleware))
}