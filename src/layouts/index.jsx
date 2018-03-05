import React from 'react';
import Helmet from 'react-helmet';
import '../assets/scss/init.scss';

class Layout extends React.Component {
  render() {
    if (this.props.location.pathname !== "/") {
      return (
        <div className="layout">
          <Helmet defaultTitle="WordTree Foundation" />
          {this.props.children()}
        </div>
      );
    } else {
      return this.props.children();
    }

  }
}

export default Layout;
