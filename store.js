import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import firebase from 'firebase/app'
import 'firebase/database'
import { useMemo } from 'react'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
try {
    firebase.initializeApp(firebaseConfig)
}
catch (error) {
    console.log(error.message)
}

let zeroArray = Array(65);
zeroArray.fill(0);
// reduxで保持する値
const initial = {
    message:'please type message',
    log:[],
    login_id:-1,
    login_user_fav:zeroArray,
}

const db = firebase.database();

// レデューサ
function Reducer(state=initial, action) {
    // console.log(state)
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

// Redux Persist設定
const persistConfig = {
    key: 'root',
    storage,
}

// persist Reducer設定
const persistedReducer = persistReducer(persistConfig, Reducer)

function makeStore(state=initial){
    return createStore(
        persistedReducer,
        state,
        applyMiddleware(thunkMiddleware)
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? makeStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store){
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    if(typeof window === 'undefined') return _store
    if(!store) store = _store

    return _store
}
export function useStore(state){
    const store = useMemo(() => initializeStore(state), [initial])
    return store;
}

// persist前のもの
export function initStore(state=initial) {
    return createStore(persistedReducer, state, applyMiddleware(thunkMiddleware))
}