import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'reactstrap'
import AppNavbar from './components/AppNavbar'
import CommentPage from './components/CommentPage'
import ItemModal from './components/ItemModal'
import Footer from './components/Footer'

function App () {
  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <ItemModal />
          <CommentPage />
        </Container>
        <Footer />
      </div>
    </Provider>
  )
}

export default App
