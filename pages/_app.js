import App, {Container} from 'next/app';
import React from 'react';
import withReduxStore from '../lib/redux-store';
import { Provider } from 'react-redux';
import '../styles/globals.css'
import '../styles/EventCard.css'
import '../styles/Recommendation.css'
import '../styles/Favorite.css'
import '../src/tailwind.css'

class _App extends App {
  render () {
    const {Component, pageProps, reduxStore} = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}


export default withReduxStore(_App)
