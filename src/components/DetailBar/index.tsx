import * as React from 'react'
import style from './style.scss'
import cn from 'classnames'

interface IProps {
  active: number
}
const details = (active: number) => {
  return active === 0 ? (
    <span className='iconfont icon-info'></span>
  ) : (
    <span className='iconfont icon-info-outline'></span>
  )
}
const participants = (active: number) => {
  return active === 1 ? (
    <span className='iconfont icon-people'></span>
  ) : (
    <span className='iconfont icon-people-outline'></span>
  )
}
const comments = (active: number) => {
  return active === 2 ? (
    <span className='iconfont icon-comment'></span>
  ) : (
    <span className='iconfont icon-comment-outline'></span>
  )
}

const DetailBar = (props: IProps) => {
  return (
    <div className={style.tabs}>
      <div className={props.active === 0 ? cn(style.details, style.active) : style.details}>
        <a href='#detail'>
          {details(props.active)}
          <span>Details</span>
        </a>
      </div>
      <div
        className={props.active === 1 ? cn(style.participants, style.active) : style.participants}
      >
        <a href='#participant'>
          {participants(props.active)}
          <span>Participants</span>
        </a>
      </div>
      <div className={props.active === 2 ? cn(style.comments, style.active) : style.comments}>
        <a href='#comment'>
          {comments(props.active)}
          <span>Comments</span>
        </a>
      </div>
    </div>
  )
}

export default DetailBar
