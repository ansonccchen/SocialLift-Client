import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'
// Components
import Navbar from "./components/layout/Navbar"
import AuthRoute from "./util/AuthRoute"
// pages
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import User from './pages/user'

axios.defaults.baseURL = "https://us-central1-social-media-app-5f207.cloudfunctions.net/api"


const theme = createMuiTheme(themeFile)
const token = localStorage.FBIdToken 
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={ store }>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/signup" component={Signup}/>
              <AuthRoute exact path="/login" component={Login} />
              <Route exact path="/user/:handle" component={User} />
              <Route exact path="/user/:handle/post/:postId" component={User} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App;
