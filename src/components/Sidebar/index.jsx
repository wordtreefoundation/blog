import React from 'react';
import get from 'lodash/get';
import Link from 'gatsby-link';
import Menu from '../Menu';
import Links from '../Links';
import profilePic from './old-books.jpg';
import wordtreeLogo from './wordtree.png';
import './style.scss';

class Sidebar extends React.Component {
  render() {
    const { location } = this.props;
    const { author, subtitle, copyright, menu } = this.props.data.site.siteMetadata;
    const isHomePage = get(location, 'pathname', '/') === '/';


    /* eslint-disable jsx-a11y/img-redundant-alt */
    const authorBlock = (
      <div className="sidebar__author-block">
        <Link to="/">
          <img
            src={profilePic}
            className="sidebar__author-photo"
            width="200"
            height="200"
            alt={author.name}
          />
        </Link>
        <div className="sidebar__author-title">
          <img src={wordtreeLogo} className="sidebar__author-title-image" width="32" height="32" />
          <Link className="sidebar__author-title-link" to="/">{author.name}</Link>
        </div>
        <p className="sidebar__author-subtitle">{subtitle}</p>
      </div>
    );
    /* eslint-enable jsx-a11y/img-redundant-alt */

    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar__author">
            {authorBlock}
          </div>
          <div>
            <Menu data={menu} />
            <Links data={author} />
            <p className="sidebar__copyright">
              {copyright}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
