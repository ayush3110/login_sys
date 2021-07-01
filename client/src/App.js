import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router';
import Home from './page/Home';
import Login from './page/Login';
import Navbar from './other/Navbar';
import SignIn from './page/SignIn';
import Footer from './other/Footer';
import Forgotpass from './page/Forgotpass';
import Changepass from './page/Changepass';
import Dashbord from './page/Deshbord';
import Todo from './page/Todo';

const App = () => {
  return (
    <>
      <Navbar />
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/user/login' component={Login} />
          <Route exact path='/user/signin' component={SignIn} />
          <Route exact path='/user/forgotpass' component={Forgotpass} />
          <Route exact path='/user/changepass' component={Changepass} />
          <Route exact path='/user/dashbord' component={Dashbord} />
          <Route exact path='/user/todo' component={Todo} />
          <Route exact path='/user/logout' />
          <Redirect to='/home' />
        </Switch>
      <Footer />
    </>
  )
}

export default App;