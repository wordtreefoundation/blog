import React from 'react';
import get from 'lodash/get';
import Link from 'gatsby-link';
import wordtreeLogo from './wordtree.png';
import './style.scss';

class Title extends React.Component {
  render() {
    return (
      <div className="title">
        <img src={wordtreeLogo} />
        <div className="title__name">
          WordTree Foundation
        </div>
      </div>
    );
  }
}

export default Title;
