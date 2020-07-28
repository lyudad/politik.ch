import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getCouncillorsAction } from 'Redux/actions/councillors'
import { getCouncillors } from 'Redux/selectors/councillors'


class App extends PureComponent {
  componentDidMount() {
    const { councillors, onGetCouncillors } = this.props
    !councillors && onGetCouncillors()
  }
  render() {
    const { councillors } = this.props
    if(!councillors) return (<div>Loading ...</div>)
    return (
      <div>
        {
          councillors.map(el => <div>{el.firstName}</div>)
        }
      </div>
    )
  }
}

const actions = {
  onGetCouncillors: getCouncillorsAction,
}

const selector = createStructuredSelector({
  councillors: getCouncillors,
})

export default connect(
  selector,
  actions
)(App)
