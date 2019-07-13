import React, { PureComponent } from 'react'

class ChannelCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      id: null
    }
  }
  tap = () => {
    let that = this
    console.log(that.props.channel.id)
  }

  render() {
    const { name } = this.props.channel
    return (
      <div className='channelcard' onClick={this.tap}>
        {name}
      </div>
    )
  }
}

export default ChannelCard
