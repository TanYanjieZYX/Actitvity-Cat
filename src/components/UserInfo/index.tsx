import * as React from 'react'
import style from './style.scss'

interface IProps {
  avatar: string
  name: string
  email: string
}

const UserInfo = (props: IProps) => {
  return (
    <div className={style.main}>
      <div className={style.avatar}>
        <img src={props.avatar} alt='use avatar' />
      </div>
      <div className={style.name}>{props.name}</div>
      <div className={style.email}>
        <span className='iconfont icon-email'></span>
        <span>{props.email}</span>
      </div>
    </div>
  )
}

export default UserInfo
