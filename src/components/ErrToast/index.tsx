import * as React from 'react'
import * as s from './style.scss'

interface IProps {
  msg: string
  show: boolean
}

const ErrToast = (props: IProps) => {
  const { msg, show } = props
  if (show) {
    return <div className={s.show}>{msg}</div>
  } else {
    return <div className={s.hide} />
  }
}
export default ErrToast
