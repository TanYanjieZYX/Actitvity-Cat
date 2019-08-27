import * as React from 'react'
import style from './style.scss'

interface IProps {
  participant: any[]
  likes: any[]
}

const DetailDescription = (props: IProps) => {
  const { participant, likes } = props
  return (
    <div className={style.main}>
      <div className={style.going}>
        <div className={style.left}>
          <span className='iconfont icon-check-outline'></span>
          <span> {participant.length} going</span>
        </div>
        <div className={style.right}>
          {participant.map(user => (
            <img src={user.avatar} key={user.id} alt='user avatar' />
          ))}
        </div>
      </div>
      <div className={style.likes}>
        <div className={style.left}>
          <span className='iconfont icon-like-outline'></span>
          <span> {likes.length} likes</span>
        </div>
        <div className={style.right}>
          {likes.map(user => (
            <img src={user.avatar} key={user.id} alt='user avatar' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailDescription
