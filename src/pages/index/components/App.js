import React, { Component } from 'react'
import axios from 'axios'

import './style.scss'

class App extends Component {

  state = {
    number: 1,
    data: []
  }

  handleAdd = () => {
    const number = this.state.number + 1
    this.setState({ number })
  }

  componentWillMount() {
    console.log('111')
    axios('https://api.github.com/orgs/octokit/repos').then(data => {
      this.setState({
        data: data.data
      })
    })
  }

  render() {
    return (
      <div>
        <h2>index</h2>
        {this.state.number}
        <button onClick={this.handleAdd}>add</button>
        <img src={require('../../../assets/avatar.png')} alt="" />
        {this.state.data.map((v, i) => {
          return <div key={i}>{v.name}</div>
        })}
      </div>
    )
  }
}

export default App
