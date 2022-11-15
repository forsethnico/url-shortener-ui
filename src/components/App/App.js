import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: ''
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => this.setState({urls: data.urls}))
    .catch(error => this.setState({error: 'Something went wrong'}))
  }

  addUrl = (newUrl) => {
    postUrl(newUrl)
    .then(result => {
      if(result.id) {
        this.setState({urls: [...this.state.urls, result], error: ''})
      } else {
        this.setState({error: 'Please fill out all fields'})
      }
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm />
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
