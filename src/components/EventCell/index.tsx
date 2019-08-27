import * as React from 'react'
import { Link } from 'react-router-dom'
import style from './style.scss'

interface IProps {
  key: string
  id?: number
  name?: string
  description?: string
  creator?: any
  channel?: any
  create_time?: any
  end_time?: any
  me_going?: boolean
  me_likes?: boolean
  goings_count?: number
  likes_count?: number
}

const EventCell = (props: IProps) => {
  return (
    <div className={style.main}>
      <Link to={'/event/' + props.id}>
        <div className={style.top}>
          <img src={props.creator.avatar || ''} alt='user avatar' />
          <span>{props.creator.username}</span>
          <div className={style.channel}>{props.channel.name}</div>
        </div>
        <div className={style.title}>{props.name}</div>
        <div className={style.time}>
          <span className='iconfont icon-time'></span>
          <span>
            {new Date(props.create_time).toUTCString().slice(4, -7)} -{' '}
            {new Date(props.end_time).toUTCString().slice(4, -7)}
          </span>
        </div>
        <div className={style.description}>{props.description}</div>
        <div className={style.bottom}>
          <span className={props.me_going ? style.activeGoing : ''}>
            {props.me_going ? (
              <span className='iconfont icon-check'></span>
            ) : (
              <span className='iconfont icon-check-outline'></span>
            )}
            <span>{props.me_going ? 'I am going!' : props.goings_count + ' Going'}</span>
          </span>
          <span className={props.me_likes ? style.activeLike : ''}>
            {props.me_likes ? (
              <span className='iconfont icon-like'></span>
            ) : (
              <span className='iconfont icon-like-outline'></span>
            )}
            <span>{props.me_likes ? 'I like it' : props.likes_count + ' Likes'}</span>
          </span>
        </div>
      </Link>
    </div>
  )
}

export default EventCell
