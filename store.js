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

let zeroArray = Array(65);
zeroArray.fill(0);

const initial = {
    message:'please type message',
    log:[],
    login_user_fav:zeroArray,
}

// レデューサ
function Reducer(state=initial, action) {
    switch (action.type) {
        // お気に入りに追加時の処理
        case 'AddFavorite':
            let add_fav = state.login_user_fav.slice();
            add_fav[action.num] = 1
            return {
                message:'AddFavorite',
                login_user_fav:add_fav,
                log:state.log
            }
        // お気に入りから外したときの処理
        case 'DeleteFavorite':
            let del_fav = state.login_user_fav.slice()
            del_fav[action.num] = 0
            return {
                message:'DeleteFavorite',
                login_user_fav:del_fav,
                log:state.log
            }
        // ページ読み込み時にlogに追加する
        case 'LoadPage':
            let logs = state.log.slice()
            let index = logs.indexOf(action.num)
            console.log(index, action.num)
            if (index != -1){
                // console.log(logs)
                logs.splice(index,1)
                // console.log(logs)
                logs.unshift(action.num)
            }
            else{
                logs.unshift(action.num)
            }
            return {
                message:'LoadPage',
                login_user_fav:state.login_user_fav,
                log:logs,
            }
        default:
            return state
    }
}

export function initStore(state=initial) {
    return createStore(Reducer, state, applyMiddleware(thunkMiddleware))
}