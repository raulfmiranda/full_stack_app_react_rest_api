import React, { Component } from 'react';
import axios from 'axios';
import './styles/global.css';

import Header from './components/Header';
import Courses from './components/Courses';

class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: [],
      loading: false
    };
  }

  requestCourses = () => {

    this.setState({
      loading: true
    });

    axios.get(`http://localhost:5000/api/courses200`)
      .then(response => {
        this.setState({
          courses: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  componentDidMount() {
    this.requestCourses();
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <hr/>
        <Courses courses={this.state.courses}/>
      </div>
    );
  }
  
}

export default App;
