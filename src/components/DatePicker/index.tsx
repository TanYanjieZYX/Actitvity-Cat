import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { icon-date-from, icon-date-to} from './style.scss'
class DatePicker extends PureComponent {
  static propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    triggerNode: PropTypes.object,
    onPicker: PropTypes.func
  }

  changeDate = (type, e) => {
    const { onPicker } = this.props

    if (typeof onPicker === 'function') {
      onPicker(type, e.target.value)
    }
  }

  render() {
    const { triggerNode, start, end } = this.props
    const rect = triggerNode ? triggerNode.getBoundingClientRect() : { left: 0, width: 10 }
    const pointerPoistion = rect.left - 12

    return (
      <div className={style.container}>
        <div className={style.triangle} style={{ marginLeft: pointerPoistion }} />
        <div className={style.content}>
          <span className='iconfont icon-date-from' />
          <span className={style.time}>
            <input type='date' value={start} onChange={e => this.changeDate('start', e)} />
          </span>

          <span className={style.line}>-</span>
          <span className='iconfont icon-date-to' />
          <span className={style.time}>
            <input type='date' value={end} onChange={e => this.changeDate('end', e)} />
          </span>
        </div>
      </div>
    )
  }
}

export default DatePicker
