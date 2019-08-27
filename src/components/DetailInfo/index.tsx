import * as React from 'react'
import style from './style.scss'

interface IEvent {
  channel: any
  name: string
  creator: any
  create_time: string
}
interface IProps {
  event: IEvent
}

const DetailInfo = (props: IProps) => {
  const { event } = props
  return (
    <div>
      <div className={style.info}>
        <div className={style.channel}>
          <span>{event.channel.name}</span>
        </div>
        <div className={style.title}>{event.name}</div>
        <div className={style.creator}>
          <img src={event.creator.avatar} alt='creator avatar' />
          <div>
            <p className={style.name}>{event.creator.username}</p>
            <p className={style.date}>
              Published{' '}
              {Math.ceil((new Date().getTime() - new Date(event.create_time).getTime()) / 86400000)}{' '}
              days ago
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailInfo
