import * as React from 'react'
import { connect } from 'react-redux'
import { getEventByType } from '../../api/index.ts'
import EventCell from '../../components/EventCell/index.tsx'
import style from '../UserTabs/style.scss'

interface IProps {
  type: number
  token: string
}
interface IState {
  events: object[]
}
const mapStateToProps = (state: React.ComponentState) => ({
  token: state.user.token
})

const transformType = (type: number) => {
  switch (type) {
    case 0:
      return 'liked'
    case 1:
      return 'going'
    case 2:
      return 'past'
    default:
      return ''
  }
}

class UserEventList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      events: []
    }
  }

  public async componentDidMount() {
    const data = await getEventByType(this.props.token, transformType(this.props.type))
    this.setState({
      events: data.events
    })
  }
  public async componentWillReceiveProps(props: any) {
    const data = await getEventByType(this.props.token, transformType(props.type))
    this.setState({
      events: data.events
    })
  }
  public render() {
    if (this.state.events.length > 0) {
      return this.state.events.map((event, index) => (
        <EventCell {...this.state.events[index]} key={`${this.props.type}-${index}`} />
      ))
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

export default connect(mapStateToProps)(UserEventList)
