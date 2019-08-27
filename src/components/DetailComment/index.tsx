import * as React from 'react'
import style from './style.scss'

interface IProps {
  comments: any[]
  setPlaceholder: (name: string) => void
}

const DetailComment = (props: IProps) => {
  const { comments, setPlaceholder } = props
  return (
    <div className={style.main}>
      {comments.map(comment => {
        return (
          <div
            className={style.comment}
            key={comment.id}
            onClick={setPlaceholder.bind(null, comment.user.username)}
          >
            <div className={style.avatar}>
              <img src={comment.user.avatar} alt='user avatar' />
            </div>
            <div className={style.content}>
              <span className={style.username}>{comment.user.username}</span>
              <span className={style.time}>
                {Math.ceil(
                  (new Date().getTime() - new Date(comment.create_time).getTime()) / 86400000
                )}{' '}
                days ago
              </span>
              <div className={style.text}>{comment.comment}</div>
            </div>
            <div className={style.reply}>
              <span className='iconfont icon-reply'></span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DetailComment
