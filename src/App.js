import React, { Fragment, useEffect, useState } from 'react';

import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import './App.css';

import GithubState from './context/github/GithubState';

import axios from 'axios';


const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect( async () => {
      setLoading(true);
    
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      setUsers(res.data);
      setLoading(false);
  }, []);

  //Searh Github Users
  const searchUsers = async text => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get a single github user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUser(res.data);
    setLoading(false);
  };

  // Get User Repositories
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setRepos(res.data);
    setLoading(false);
  };


  // Clear Users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set Alert
  const showAlert = (msg, alertType) =>{
    setAlert({ msg, type: alertType });

   // setTimeout(() => this.setState({ alert: null }), 4000);
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <GithubState>
      <Router>
      <div className="App">
        <Navbar iconName="fab fa-github"/> 
        <div className="container">
        <Alert alert={alert}/>

        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={ users.length > 0 ? true : false } setAlert={showAlert}/> 
              <Users loading={loading} users={users}/> 
            </Fragment>
          )} />
          <Route exact path='/about' component={About}/>
          <Route exact path='/user/:login' render={props => (
              <User { ...props } getUser={getUser} user={user} getUserRepos={getUserRepos} repos={repos} loading={loading}/>
          )}/>
        </Switch>

        </div>        
      </div>
    </Router>
    </GithubState>
  );
}

export default App;
