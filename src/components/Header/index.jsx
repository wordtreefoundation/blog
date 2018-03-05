import React from 'react';
import get from 'lodash/get';
import Link from 'gatsby-link';
import booksToDigitalPic from './books-to-digital.jpg';
import './style.scss';

class Header extends React.Component {
  render() {
    const { location } = this.props;
    const { author, subtitle, copyright, menu } = this.props.data.site.siteMetadata;

    return (
      <div className="header">
        <img src={booksToDigitalPic} width="100%" />
        <div className="header__inner">
        </div>
      </div>
    );
  }
}

export default Header;
