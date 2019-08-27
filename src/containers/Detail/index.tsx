import * as React from 'react'
import { connect } from 'react-redux'
import {
  deleteGoing,
  deleteLikes,
  getComments,
  getEvent,
  getLikes,
  getParticipants,
  postComment,
  postGoing,
  postLikes
} from '@api/index.ts'
import DetailBar from '@comp/DetailBar/index.tsx'
import DetailComment from '@comp/DetailComment/index.tsx'
import DetailDescription from '@comp/DetailDescription/index.tsx'
import DetailInfo from '@comp/DetailInfo/index.tsx'
import DetailParticipants from '@comp/DetailParticipants/index.tsx'
import Header from '@comp/Header/index.tsx'
import style from './style.scss'
import cn from 'classnames'

interface IUser {
  avatar: string
  username: string
  email: string
}
interface IProps {
  token: string
  user: IUser
  match: any
}
interface IState {
  event: any
  participant: any[]
  likes: any[]
  comments: any[]
  active: number
  comment_show: boolean
  toast_show: boolean
  placeholder: string
}

const mapStateToProps = (state: React.ComponentState) => ({
  token: state.user.token,
  user: state.user.user
})

class Detail extends React.Component<IProps, IState> {
  private DetailsRef: React.RefObject<HTMLDivElement>
  private ParticipantsRef: React.RefObject<HTMLDivElement>
  private CommentsRef: React.RefObject<HTMLDivElement>
  private inputRef: React.RefObject<HTMLInputElement>
  private id: number

  constructor(props: IProps) {
    super(props)
    this.state = {
      event: null,
      participant: [],
      likes: [],
      comments: [],
      active: 0,
      comment_show: false,
      placeholder: 'Leave your comment here',
      toast_show: false
    }
    this.DetailsRef = React.createRef()
    this.ParticipantsRef = React.createRef()
    this.CommentsRef = React.createRef()
    this.inputRef = React.createRef()
  }
  public async componentDidMount() {
    this.id = this.props.match.params.id
    const datas = await Promise.all([
      getEvent(this.props.token, this.id),
      getParticipants(this.props.token, this.id),
      getLikes(this.props.token, this.id),
      getComments(this.props.token, this.id)
    ])
    this.setState({
      event: datas[0].event,
      participant: datas[1].users,
      likes: datas[2].users,
      comments: datas[3].comments
    })
    this.setScroll()
  }

  public setScroll = () => {
    let headHeight: number
    let active: number = 0
    const height: number[] = [0, 0, 0]

    if (!!this.DetailsRef.current) {
      height[0] = this.DetailsRef.current.offsetTop
    }
    if (!!this.ParticipantsRef.current) {
      height[1] = this.ParticipantsRef.current.offsetTop
    }
    if (!!this.CommentsRef.current) {
      height[2] = this.CommentsRef.current.offsetTop
    }
    const htmlEle = document.getElementsByTagName('html')[0]
    if (!!htmlEle.style.fontSize) {
      headHeight = Number(htmlEle.style.fontSize.substr(0, htmlEle.style.fontSize.length - 2)) * 6.1
    }
    const ele = document.getElementById('detail_main')
    if (!!ele) {
      ele.onscroll = () => {
        if (ele.scrollTop < height[1] - headHeight) {
          if (active !== 0) {
            this.setActive(0)
            active = 0
          }
        } else {
          if (ele.scrollTop > height[2] - headHeight) {
            if (active !== 2) {
              this.setActive(2)
              active = 2
            }
          } else {
            if (active !== 1) {
              this.setActive(1)
              active = 1
            }
          }
        }
      }
    }
  }
  public setActive = (id: number) => {
    this.setState({
      active: id
    })
  }
  public toggleLikes = async () => {
    if (this.state.event.me_likes) {
      await deleteLikes(this.props.token, this.id)
    } else {
      await postLikes(this.props.token, this.id)
    }
    const info = await getEvent(this.props.token, this.id)
    const likes = await getLikes(this.props.token, this.id)
    this.setState({
      event: info.event,
      likes: likes.users
    })
  }
  public toggleGoing = async () => {
    if (this.state.event.me_going) {
      await deleteGoing(this.props.token, this.id)
    } else {
      await postGoing(this.props.token, this.id)
    }
    const info = await getEvent(this.props.token, this.id)
    const participants = await getParticipants(this.props.token, this.id)
    this.setState({
      event: info.event,
      participant: participants.users
    })
  }
  public toggleComment = () => {
    this.setState({
      comment_show: !this.state.comment_show
    })
  }
  public setPlaceholder = (name: string) =>
    this.setState({ placeholder: '@' + name, comment_show: true })
  public sendComment = async () => {
    if (!!this.inputRef.current) {
      const value = this.inputRef.current.value
      if (!!value) {
        await postComment(this.props.token, this.id, value)
        const comments = await getComments(this.props.token, this.id)
        this.setState({
          comments: comments.comments
        })
        this.inputRef.current.value = ''
        const bottom = document.getElementById('bottom')
        if (bottom !== null) {
          bottom.scrollIntoView({ behavior: 'smooth' })
        }
        setTimeout(() => {
          this.setState({
            toast_show: true
          })
        }, 500)
        setTimeout(() => {
          this.setState({
            toast_show: false
          })
        }, 2500)
      }
    }
  }
  public Footer = () => {
    if (this.state.comment_show) {
      return (
        <div className={style.bottom_comment}>
          <div className={style.comment}>
            <span className='iconfont icon-cross' onClick={this.toggleComment}></span>
            <input
              type='text'
              className={style.input}
              placeholder={this.state.placeholder}
              ref={this.inputRef}
            />
          </div>
          <div className={style.send} onClick={this.sendComment}>
            <span className='iconfont icon-send'></span>
          </div>
        </div>
      )
    } else {
      return (
        <div className={style.bottom_normal}>
          <div className={style.purple}>
            <span className='iconfont icon-comment-single' onClick={this.toggleComment}></span>
            {this.state.event.me_likes ? (
              <span
                className={cn('iconfont icon-like', style.likes_active)}
                onClick={this.toggleLikes}
              ></span>
            ) : (
              <span className='iconfont icon-like-outline' onClick={this.toggleLikes}></span>
            )}
          </div>
          {this.state.event.me_going ? (
            <div className={cn(style.join, style.join_active)} onClick={this.toggleGoing}>
              <span className='iconfont icon-check'></span>
              <span>I am going</span>
            </div>
          ) : (
            <div className={style.join} onClick={this.toggleGoing}>
              <span className='iconfont icon-check-outline'></span>
              <span>Join</span>
            </div>
          )}
        </div>
      )
    }
  }
  public render() {
    if (!this.state.event) {
      return <Header ifHome={true} avatar={this.props.user.avatar} />
    } else {
      return (
        <div>
          <Header ifHome={true} avatar={this.props.user.avatar} />
          <div className={style.main} id='detail_main'>
            <DetailInfo event={this.state.event} />
            <DetailBar active={this.state.active} />
            <div
              className={style.toast}
              style={this.state.toast_show ? { height: '2.3rem' } : { height: 0 }}
            >
              Comment Successful!
            </div>
            <div id='detail' style={{ position: 'relative', top: '-3.2rem' }} />
            <div ref={this.DetailsRef}>
              <DetailDescription event={this.state.event} />
            </div>
            <div id='participant' style={{ position: 'relative', top: '-3.2rem' }} />
            <div ref={this.ParticipantsRef}>
              <DetailParticipants participant={this.state.participant} likes={this.state.likes} />
            </div>
            <div id='comment' style={{ position: 'relative', top: '-3.2rem' }} />
            <div ref={this.CommentsRef}>
              <DetailComment comments={this.state.comments} setPlaceholder={this.setPlaceholder} />
            </div>
            {this.Footer()}
            <div id='bottom' />
          </div>
        </div>
      )
    }
  }
}
export default connect(
  mapStateToProps,
  undefined
)(Detail)
