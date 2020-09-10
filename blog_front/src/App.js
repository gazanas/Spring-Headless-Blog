import React from 'react'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginComponent from './Access/LoginComponent'
import RegisterComponent from './Access/RegisterComponent'
import PostsComponent from './Posts/PostsComponent'
import CategoriesComponent from './Posts/CategoriesComponent'
import CreateComponent from './Posts/CreateComponent'
import PostComponent from './Posts/PostComponent'
import ProfileComponent from './Users/ProfileComponent'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LoginComponent />
        </Route>
        <Route exact path='/register'>
          <RegisterComponent />
        </Route>
        <Route exact path='/posts'>
          <PostsComponent />
        </Route>
        <Route exact path='/posts/create' component={CreateComponent} />
        <Route exact path='/posts/:title' component={PostComponent} />
        <Route exact path='/category/:category' component={CategoriesComponent} />
        <Route exact path='/profile/:uid' component={ProfileComponent} />
      </Switch>
    </Router>
  )
}

export default App
