import React, { PureComponent } from 'react';
import './SearchPage.css';

class NoResult extends PureComponent{
  render(){  
    return (
        <div className="no-result">    
          <span className="iconfont icon-no-activity"></span>               
           No activity found
        </div>
  
    );
  }
}

export default NoResult;