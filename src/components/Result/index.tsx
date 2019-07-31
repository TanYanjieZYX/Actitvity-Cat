import * as React from 'react'
import { connect } from 'react-redux'
import * as Redux from 'redux'
import { clearSearch, showAllEvents } from '@act/index.ts'
import style from './style.scss'

interface IProps {
  token: string
  num: number
  show: boolean
  hasMore: boolean
  text: string
  clear: () => void
}

const mapStateToProps = (state: React.ComponentState) => ({
  token: state.user.token,
  num: state.event.result_list.length,
  show: state.search.result_show,
  hasMore: state.event.result_hasMore,
  text: state.search.text
})
const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
  clear: () => {
    dispatch(clearSearch())
    dispatch(showAllEvents())
  }
})

class Result extends React.Component<IProps> {
  public render() {
    if (this.props.show) {
      return (
        <div className={style.container}>
          <div className={style.main}>
            <span>{this.props.hasMore ? '25+' : this.props.num} Results</span>
            <div className={style.clear} onClick={this.props.clear}>
              CLEAR SEARCH
            </div>
          </div>
          <div className={style.clear}>Search for {this.props.text}</div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result)
