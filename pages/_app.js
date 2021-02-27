import App, {Container} from 'next/app';
// import React from 'react';
import withReduxStore from '../lib/redux-store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react/'
import '../src/tailwind.css'
import '../styles/globals.css'
import '../styles/EventCard.css'
import '../styles/Recommendation.css'
import '../styles/Favorite.css'
import '../styles/Search.css'

// export default function App({ Component, pageProps }) {
//   const store = useStore(pageProps.initialReduxState)
//   const persistor = persistStore(store, {}, function(){
//     persistor.persist()
//   })

//   return(
//     <Container>
//       <Provider store={store}>
//         <PersistGate loading={<div>loading</div>} persistor={persistor}>
//           <Component {...pageProps} />
//         </PersistGate>
//       </Provider>
//     </Container>
//   )
// }

class _App extends App {
  render () {
    const {Component, pageProps, reduxStore} = this.props
    const persistedStore = persistStore(reduxStore)

    return (
      <Container>
        <Provider store={reduxStore}>
          <PersistGate loading={<p>now loading...</p>} persistor={persistedStore}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </Container>
    )
  }
}


export default withReduxStore(_App)
