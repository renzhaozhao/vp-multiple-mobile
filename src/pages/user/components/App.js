import React, { Component } from 'react'

class App extends Component {

  state = {
    number: 1
  }

  handleAdd = () => {
    const number = this.state.number + 1
    this.setState({ number })
  }

  componentWillMount() {
    console.log('111')
  }

  render() {
    return (
      <div>
        <h2>user</h2>
        {this.state.number}
        <button onClick={this.handleAdd}>add</button>
      </div>
    )
  }
}

export default App
