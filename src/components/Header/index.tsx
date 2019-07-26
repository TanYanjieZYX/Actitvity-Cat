import * as React from 'react'
import { Link } from 'react-router-dom'
import style from './style.scss'

interface IProps {
  avatar: string
  ifHome: boolean
  toggleSearch?: () => void
}
const leftIcon = (ifHome: boolean, toggleSearch?: () => void) => {
  if (ifHome) {
    return (
      <Link to='/main'>
        <span className='iconfont icon-home'></span>
      </Link>
    )
  } else {
    return <span className='iconfont icon-search' onClick={toggleSearch}></span>
  }
}

const rightIcon = (ifHome: boolean, avatar: string) => {
  return (
    <Link to='/me'>
      <div className={style.right}>
        <img src={avatar} alt='user avatar' />
      </div>
    </Link>
  )
}

const Header = (props: IProps) => {
  return (
    <div className={style.main}>
      <div className={style.left}>
        {!!props.toggleSearch ? leftIcon(props.ifHome, props.toggleSearch) : leftIcon(props.ifHome)}
      </div>
      <div className={style.center}>
        <span className='iconfont icon-logo-cat'></span>
      </div>
      {rightIcon(props.ifHome, props.avatar)}
    </div>
  )
}

export default Header
