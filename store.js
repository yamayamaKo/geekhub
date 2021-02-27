import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from './api_key'

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
    login_id:-1,
    login_user_fav:zeroArray,
}

const db = firebase.database();

// レデューサ
function Reducer(state=initial, action) {
    switch (action.type) {
        // お気に入りに追加時の処理
        case 'AddFavorite':
            let add_fav = state.login_user_fav.slice();
            add_fav[action.num] = 1

            // リストを文字列に変えた後、ユーザのお気に入り情報を更新する
            // console.log(action.id,'action.id')
            let add_fav_str = add_fav.join('')
            db.ref('user_fav/'+action.id).set(add_fav_str)

            return {
                message:'AddFavorite',
                login_user_fav:add_fav,
                login_id:action.id,
                log:state.log
            }
        // お気に入りから外したときの処理
        case 'DeleteFavorite':
            let del_fav = state.login_user_fav.slice()
            del_fav[action.num] = 0

            let del_fav_str = del_fav.join('');
            db.ref('user_fav/'+state.login_id).set(del_fav_str)
            // console.log(del_fav_str)

            return {
                message:'DeleteFavorite',
                login_user_fav:del_fav,
                login_id:state.login_id,
                log:state.log
            }
        // ページ読み込み時にlogに追加する
        case 'LoadPage':
            let logs = state.log.slice()
            let index = logs.indexOf(action.num)
            // console.log(index, action.num)
            if (index != -1){
                logs.splice(index,1)
                logs.unshift(action.num)
            }
            else{
                logs.unshift(action.num)
            }
            return {
                message:'LoadPage',
                login_user_fav:state.login_user_fav,
                login_id:state.login_id,
                log:logs,
            }
        default:
            return state
    }
}

export function initStore(state=initial) {
    return createStore(Reducer, state, applyMiddleware(thunkMiddleware))
}