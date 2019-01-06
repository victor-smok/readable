import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from 'src/store'
import Homepage from 'src/pages/homepage'
import Post from 'src/pages/post'
import CreateEdit from 'src/pages/create-edit'

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/new' component={CreateEdit} />
          <Route exact path='/:category' component={Homepage} />
          <Route exact path='/:category/:postId' component={Post} />
          <Route exact path='/:category/:postId/edit' component={CreateEdit} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
