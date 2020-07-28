import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getCouncillorsAction } from 'Redux/actions/councillors'
import { getCouncillors } from 'Redux/selectors/councillors'

import { getAffairsAction } from 'Redux/actions/affairs'
import { getAffairs } from 'Redux/selectors/affairs'

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
      <div>
        <div>
          <div>Councillors</div>
          <div>
            {
              councillors.map(el => <div>{el.firstName}</div>)
            }
          </div>
        </div>
        <div>
          <div>Affairs</div>
          <div>
            {
              affairs.map(el => <div>{el.shortId}</div>)
            }
          </div>
        </div>
      </div>
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
