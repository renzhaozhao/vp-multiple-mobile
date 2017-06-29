import React, { Component } from 'react'
import axios from 'axios'
import { Button, NavBar, Icon } from 'antd-mobile'

import './style.less'
import Tab from './tab'

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
        <NavBar leftContent="back"
          mode="light"
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >NavBar</NavBar>
        {this.state.number}
        <Button className="btn" type="primary" onClick={this.handleAdd}>add</Button>
        <img className="my-img" src={require('../../../assets/avatar.png')} alt="" />
        {this.state.data.map((v, i) => {
          return <div key={i}>{v.name}</div>
        })}

        <Tab />
      </div>
    )
  }
}

export default App
