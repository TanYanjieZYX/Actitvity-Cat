import * as React from 'react'
import style from './style.scss'

interface IEvent {
  begin_time: string
  end_time: string
  description: string
  images: string[]
  location: string
  location_detail: string
}
interface IProps {
  event: IEvent
}

class DetailDescription extends React.Component<IProps, { isExpanded: boolean }> {
  private event = this.props.event
  private dateFrom = new Date(this.event.begin_time)
  private dateTo = new Date(this.event.end_time)
  constructor(props: IProps) {
    super(props)
    this.state = {
      isExpanded: this.event.description.length > 300
    }
  }
  public render() {
    return (
      <div className={style.container}>
        {this.event.images.length > 0 ? (
          <div className={style.gallery}>
            {this.event.images.map((img: string, index: number) => (
              <img src={img} key={index} alt='Load False' />
            ))}
          </div>
        ) : null}
        <div className={style.description}>
          {this.state.isExpanded
            ? this.event.description.substr(0, 300) + ' ...'
            : this.event.description}
          {this.event.description.length > 300 && this.state.isExpanded ? (
            <div className={style.expend_cover}>
              <a onClick={this.expand} className={style.expend_button}>
                VIEW ALL
              </a>
            </div>
          ) : null}
        </div>
        <div className={style.when}>
          <p className={style.when_title}>When</p>
          <div className={style.when_detail}>
            <div className={style.date}>
              <span className='iconfont icon-date-from'></span>
              <span>{this.dateFrom.toDateString().substring(4)}</span>
              <div className={style.time}>
                <span>
                  {
                    this.dateFrom
                      .toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })
                      .split(' ')[0]
                  }
                </span>
                <span>
                  {this.dateFrom
                    .toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })
                    .split(' ')[1]
                    .toLowerCase()}
                </span>
              </div>
            </div>
            <div className={style.date}>
              <span className='iconfont icon-date-to'></span>
              <span>{this.dateTo.toDateString().substring(4)}</span>
              <div className={style.time}>
                <span>
                  {
                    this.dateTo
                      .toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })
                      .split(' ')[0]
                  }
                </span>
                <span>
                  {this.dateTo
                    .toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })
                    .split(' ')[1]
                    .toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.where}>
          <p className={style.where_title}>Where</p>
          <p className={style.where_location}>{this.event.location}</p>
          <p className={style.where_detail}>{this.event.location_detail}</p>
          <img src={require('../../assets/imgs/gmap.png')} alt='gmap' />
        </div>
      </div>
    )
  }
  private expand = () => {
    this.setState({
      isExpanded: false
    })
  }
}

export default DetailDescription
