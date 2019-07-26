import * as React from 'react'
import style from './style.scss'
interface IProps {
  msg: string
  show: boolean
}

const ErrToast = (props: IProps) => {
  const { msg, show } = props
  if (show) {
    return <div className={style.show}>{msg}</div>
  } else {
    return <div className={style.hide} />
  }
}
export default ErrToast
