import React from 'react';
import axios from 'axios';
import './App.css';

import Header from './components/Header';

function requestCourses() {
  axios.get(`http://localhost:5000/api/courses200`)
        .then(response => {
          console.log(response.data[0].title);
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
} 

function App() {
  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
