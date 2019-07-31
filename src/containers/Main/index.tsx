import * as React from 'react'
import { connect } from 'react-redux'
import * as Redux from 'redux'
import { toggleSearch } from '@act/index.ts'
import Header from '@comp/Header/index.tsx'
import MainEventList from '@comp/MainEventList/index.tsx'
import Result from '@comp/Result/index.tsx'
import Search from '@comp/Search/index.tsx'
import style from './style.scss'

interface IUser {
  avatar: string
  username: string
  email: string
}
interface IProps {
  user: IUser
  token: string
  toggleSearch: () => void
  search_show: boolean
}

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
  toggleSearch: () => dispatch(toggleSearch())
})
const mapStateToProps = (state: React.ComponentState) => ({
  user: state.user.user,
  token: state.user.token,
  search_show: state.search.show
})

class Main extends React.Component<IProps> {
  public render() {
    return (
      <div className={style.container}>
        {this.props.search_show ? (
          <div className={style.cover} onClick={this.props.toggleSearch} />
        ) : null}
        <Search />
        <div className={style.main} style={this.props.search_show ? { left: '80vw' } : { left: 0 }}>
          <Header
            ifHome={false}
            avatar={this.props.user.avatar}
            toggleSearch={this.props.toggleSearch}
          />
          <Result />
          <MainEventList />
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
