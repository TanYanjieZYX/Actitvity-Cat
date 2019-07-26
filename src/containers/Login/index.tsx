import * as React from 'react'
import { connect } from 'react-redux'
import * as Redux from 'redux'
import ErrToast from '../../components/ErrToast/index.tsx'
import style from './style.scss'

interface IProps {
  login: (username: string, password: string, history: History) => void
  errShow: boolean
  errMsg: string
  history: History
}

interface IState {
  langNum: number
  lang: any
  lang_show: boolean
}

const mapStateToProps = (state: React.ComponentState) => ({
  errShow: state.error.show,
  errMsg: state.error.msg
})
const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
  login: (username: string, password: string, history: History) =>
    dispatch({ type: 'LOGIN_ASYNC', username, password, history })
})

class Login extends React.Component<IProps, IState> {
  private readonly langArray: any[]
  private usr: any
  private password: any
  constructor(props: IProps) {
    super(props)
    this.langArray = [
      { text: 'English', abbr: 'en' },
      { text: '简体中文', abbr: 'zh' },
      { text: '日本語', abbr: 'ja' }
    ]
    if (!!localStorage.getItem('lang')) {
      let num: number = 0
      for (const lang of this.langArray) {
        if (localStorage.getItem('lang') === lang.abbr) {
          num = this.langArray.indexOf(lang)
          break
        }
      }
      this.state = {
        langNum: num,
        lang: require('../../lang/' + localStorage.getItem('lang') + '.json'),
        lang_show: false
      }
    } else {
      this.state = {
        langNum: 0,
        lang: require('../../lang/' + this.langArray[0].abbr + '.json'),
        lang_show: false
      }
    }
  }
  public toggleLang = () => {
    this.setState({
      lang_show: !this.state.lang_show
    })
  }
  public changeLang = (id: number) => {
    this.setState({
      langNum: id,
      lang: require('../../lang/' + this.langArray[id].abbr + '.json'),
      lang_show: false
    })
    localStorage.setItem('lang', this.langArray[id].abbr)
  }
  public submit = () => {
    this.props.login(this.usr.value, this.password.value, this.props.history)
  }
  public render() {
    return (
      <div>
        <ErrToast msg={this.props.errMsg} show={this.props.errShow} />
        <div className={style.bg} />
        <div className={style.main}>
          <p className={style.smallTitle}>{this.state.lang.small_title}</p>
          <p className={style.bigTitle}>{this.state.lang.title}</p>
          <div className={style.logoContainer}>
            <span className='iconfont icon-logo-cat'></span>
          </div>
          <div className={style.input}>
            <div className={style.user}>
              <label>
                <span className='iconfont icon-user'></span>
              </label>
              <input type='text' ref={node => (this.usr = node)} />
            </div>
            <div className={style.password}>
              <label>
                <span className='iconfont icon-password'></span>
              </label>
              <input type='password' ref={node => (this.password = node)} />
            </div>
            <div className={style.lang}>
              <div>
                <span onClick={this.toggleLang}>{this.langArray[this.state.langNum].text}</span>
              </div>
              <div
                style={this.state.lang_show ? { visibility: 'visible' } : { visibility: 'hidden' }}
              >
                {this.langArray.map((lang, index) => {
                  if (index === this.state.langNum) {
                    // eslint-disable-next-line
                    return
                  } else {
                    return (
                      <span key={index} onClick={this.changeLang.bind(this, index)}>
                        {lang.text}
                      </span>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={style.bottom} onClick={this.submit}>
          {this.state.lang.sign_in}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
