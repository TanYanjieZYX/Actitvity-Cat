import React from 'react'
import './style.scss'

class ShowToast extends React.Component {
  render() {
    const { toast, show } = this.props
    return (
      <div className={`wp-toast ${show ? 'active' : ''}`}>
        <p>{toast}</p>
      </div>
    )
  }
}

export default ShowToast
