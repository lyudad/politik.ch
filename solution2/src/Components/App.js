import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Layout, Menu, Breadcrumb, Table, Typography } from 'antd';

import { getCouncillorsAction } from 'Redux/actions/councillors'
import { getCouncillors } from 'Redux/selectors/councillors'

import { getAffairsAction } from 'Redux/actions/affairs'
import { getAffairs } from 'Redux/selectors/affairs'

import { columnsCouncillors, columnsAffairs } from './tableTitles'

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

class App extends PureComponent {
  componentDidMount() {
    const { councillors, onGetCouncillors, onGetAffairsAction, affairs } = this.props
    !councillors && onGetCouncillors()
    !affairs && onGetAffairsAction()
  }
  render() {
    const { councillors, affairs } = this.props
    if (!councillors || !affairs) return (<div>Loading ...</div>)
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Title>Councillors</Title>
            <Table columns={columnsCouncillors} dataSource={councillors} />
            <Title>Affairs</Title>
            <Table columns={columnsAffairs} dataSource={affairs} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
  }
}

const actions = {
  onGetCouncillors: getCouncillorsAction,
  onGetAffairsAction: getAffairsAction
}

const selector = createStructuredSelector({
  councillors: getCouncillors,
  affairs: getAffairs
})

export default connect(
  selector,
  actions
)(App)
