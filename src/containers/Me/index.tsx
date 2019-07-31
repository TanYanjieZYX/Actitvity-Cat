import * as React from 'react'
import { connect } from 'react-redux'
import Header from '@comp/Header/index.tsx'
import UserInfo from '@comp/UserInfo/index.tsx'
import UserTabs from '@comp/UserTabs/index.tsx'

interface IUser {
  avatar: string
  username: string
  email: string
}
interface IProps {
  user: IUser
}

const mapStateToProps = (state: React.ComponentState) => ({
  user: state.user.user
})

class Me extends React.Component<IProps> {
  public render() {
    return (
      <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
        <Header ifHome={true} avatar={this.props.user.avatar} />
        <UserInfo
          avatar={this.props.user.avatar}
          name={this.props.user.username}
          email={this.props.user.email}
        />
        <UserTabs />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Me)
