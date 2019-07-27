import * as React from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../api/index.ts'
import UserEventList from '../UserEventList/index.tsx'
import style from './style.scss'
import cn from 'classnames'

interface IProps {
  token: string
}
interface IState {
  active: number
  counts: number[]
}

const mapStateToProps = (state: React.ComponentState) => ({
  token: state.user.token
})

class UserTabs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      active: 0,
      counts: [0, 0, 0]
    }
  }
  public async componentDidMount() {
    const data = await getUser(this.props.token)
    const { likes_count, goings_count, past_count } = data
    this.setState({
      counts: [likes_count, goings_count, past_count]
    })
  }
  public render() {
    return (
      <div>
        <div className={style.tabs}>
          <div
            className={this.state.active === 0 ? cn(style.likes, style.active) : style.likes}
            onClick={this.changeTab.bind(this, 0)}
          >
            {this.likes()}
            <span>{this.state.counts[0]} Likes</span>
          </div>
          <div
            className={this.state.active === 1 ? cn(style.going, style.active) : style.going}
            onClick={this.changeTab.bind(this, 1)}
          >
            {this.going()}
            <span>{this.state.counts[1]} Going</span>
          </div>
          <div
            className={this.state.active === 2 ? cn(style.past, style.active) : style.past}
            onClick={this.changeTab.bind(this, 2)}
          >
            {this.past()}
            <span>{this.state.counts[2]} Past</span>
          </div>
        </div>
        <UserEventList type={this.state.active} />
      </div>
    )
  }
  public changeTab(id: number) {
    this.setState({
      active: id
    })
  }
  public likes() {
    return this.state.active === 0 ? (
      <span className='iconfont icon-check'></span>
    ) : (
      <span className='iconfont icon-check-outline'></span>
    )
  }
  public going() {
    return this.state.active === 1 ? (
      <span className='iconfont icon-like'></span>
    ) : (
      <span className='iconfont icon-like-outline'></span>
    )
  }
  public past() {
    return this.state.active === 2 ? (
      <span className='iconfont icon-past'></span>
    ) : (
      <span className='iconfont icon-past-outline'></span>
    )
  }
}

export default connect(mapStateToProps)(UserTabs)
