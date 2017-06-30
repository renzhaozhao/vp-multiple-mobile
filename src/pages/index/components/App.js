import React, { Component } from 'react'
import axios from 'axios'
import { Button, NavBar, Icon, Card, WingBlank, WhiteSpace, List, SearchBar } from 'antd-mobile'

import './style.less'
import Tab from './tab'

const Item = List.Item

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
          mode="dark"
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon
              key="0"
              type="search"
              style={{ marginRight: '0.32rem' }}
            />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >NavBar</NavBar>
        <div className="content">
          <SearchBar
            placeholder="手动获取获取光标"
          />

          <Tab />
          <Card full={false}>
            <Card.Header
              title="This is title"
              thumb={require('../../../assets/avatar.png')}
              thumbStyle={{ width: 200 }}
              extra={<span>{this.state.number}</span>}
            />
            <Card.Body>
              <div>This is content of `Card`</div>
            </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
          <WingBlank>
            <Button className="btn" type="primary" onClick={this.handleAdd}>add</Button>
          </WingBlank>
          <WhiteSpace size="lg" />
          <List>
            {this.state.data.map((v, i) => {
              return (
                <Item key={i}>
                  <div>{v.name}</div>
                </Item>
              )
            })}
          </List>

        </div>
      </div>
    )
  }
}

export default App
