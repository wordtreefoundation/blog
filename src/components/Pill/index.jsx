import React from 'react';
import './style.scss';

class Pill extends React.Component {
  render() {
    return (
      <div className="pill">
        {this.props.children}
      </div>
    );
  }
}

export default Pill;
