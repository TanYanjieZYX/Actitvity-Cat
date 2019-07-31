import * as React from 'react'
import { connect } from 'react-redux'
import * as Redux from 'redux'
import EventCell from '@comp/EventCell/index.tsx'
import style from './style.scss'

interface IProps {
  token: string
  getAllEventsAsync: (token: string, offset: number) => void
  addResultEventsAsync: (token: string, params: string) => void
  events: any[]
  hasMore: boolean
  search_params: string
}

const mapStateToProps = (state: React.ComponentState) => ({
  token: state.user.token,
  events: state.event.result_list,
  hasMore: state.event.result_hasMore,
  search_params: state.search.params
})

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
  getAllEventsAsync: (token: string, offset: number) =>
    dispatch({ type: 'GET_ALL_EVENTS_ASYNC', token, offset }),
  addResultEventsAsync: (token: string, params: string) =>
    dispatch({ type: 'ADD_RESULT_EVENTS_ASYNC', token, params })
})
class MainEventList extends React.Component<IProps, { loading: boolean }> {
  private footRef: React.RefObject<HTMLInputElement>
  private intersectionObserver: IntersectionObserver
  constructor(props: IProps) {
    super(props)
    this.state = {
      loading: true
    }
    this.footRef = React.createRef()
    this.intersectionObserver = new IntersectionObserver(entries => {
      // 如果不可见，就返回
      if (entries[0].intersectionRatio <= 0) {
        return
      } else {
        if (!this.props.hasMore) {
          return
        }
        // 增加新的活动
        let params = 'offset=' + this.props.events.length
        if (!!this.props.search_params) {
          params += '&' + this.props.search_params
        }
        this.props.addResultEventsAsync(this.props.token, params)
      }
    })
  }

  public componentDidMount() {
    this.props.getAllEventsAsync(this.props.token, 0)
  }

  public componentWillReceiveProps(nextProps: any) {
    this.setState({ loading: false })
  }
  public componentDidUpdate() {
    if (!!this.footRef.current) {
      this.intersectionObserver.observe(this.footRef.current)
    }
  }
  public render() {
    if (this.state.loading) {
      return <div />
    }
    if (this.props.events.length > 0) {
      return (
        <div className={style.main}>
          {this.props.events.map((event, index) => (
            <EventCell {...this.props.events[index]} key={index} />
          ))}
          <div ref={this.footRef} className={style.footer} />
        </div>
      )
    } else {
      return (
        <div className={style.emptyPanel}>
          <div>
            <span className='iconfont icon-no-activity'></span>
          </div>
          <div>No activity found</div>
        </div>
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainEventList)
