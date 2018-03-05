import React from 'react';
import Link from 'gatsby-link';
import Menu from '../Menu';
import Links from '../Links';
import './style.scss';

class SidebarHome extends React.Component {
  render() {
    const { location } = this.props;
    const { author, subtitle, copyright, menu } = this.props.data.site.siteMetadata;

    /* eslint-disable jsx-a11y/img-redundant-alt */
    const authorBlock = (
      <div className="sidebar_home__author-block">
        <p className="sidebar_home__author-subtitle">{subtitle}</p>
      </div>
    );
    /* eslint-enable jsx-a11y/img-redundant-alt */

    return (
      <div className="sidebar_home">
        <div className="sidebar_home__inner">
          <div className="sidebar_home__author">
            {authorBlock}
          </div>
          <div>
            <Menu data={menu} />
            <Links data={author} />
            <p className="sidebar_home__copyright">
              {copyright}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarHome;
