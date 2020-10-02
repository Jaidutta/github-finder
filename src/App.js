import React, {Component} from 'react';
import './App.css';
import Users from './components/users/Users'
import Navbar from './components/layout/Navbar'
import Search from './components/users/Search'
import axios from 'axios'
import PropTypes from 'prop-types'

class App extends Component {

  state = {
    users: [],
    loading: false
  }

  // async componentDidMount() {
  //   this.setState({loading: true})

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`)

  //   this.setState({users: res.data, loading: false})
  // }

  // search github users
  searchUsers = async (text) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`)
    
    this.setState({users: res.data.items, loading: false})
  }
  render() {
    return (
      <div className="App">
       <Navbar/>
       <div className="container">
        <Search searchUsers={this.searchUsers}/>
        <Users loading={this.state.loading} users={this.state.users}/>
       </div>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default App;
