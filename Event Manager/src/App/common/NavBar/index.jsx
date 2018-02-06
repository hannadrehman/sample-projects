/*
* @component NavBar
* @type Pure Component
* @props {datatype} name
* @children MobileMenu
* @requires React,Link,
* @reduxActions false
* @actions none
* @description
* this is a simple navigation component which will be used to render
* navigational links on the screen, this component is avaiable on all routes.
* this component will not be places inside the route component. it has to be above the
* Route or Router component so that the navigation can happen and this component is not
* rendered again and again.
*/
import React from 'react';
import { Link } from 'react-router-dom';


import siteLogo from '../../../assets//images/logos/Git-Logo-White.png';
import './styles.scss';

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // currentMode: 'desktop',
      links: [
        { id: 0, name: 'home', link: '/' },
        { id: 1, name: 'Events', link: '/events' },
      ],
    };
    this.renderLinks = this.renderLinks.bind(this);
  }

  renderLinks() {
    return this.state.links.map(current =>
      (
        <Link
          className="links"
          key={current.id}
          to={current.link}
          href={current.link}
        >
          {current.name}
        </Link>
      ));
  }
  render() {
    return (
      <header className="NavBar_wrapper">
        <section className="head">
          {/* logo */}
          <section className="margin-top-4 logo-wrap">
            <Link className="go-home" to="/" href="/">
              <img className="logo-img" alt="Logo" src={siteLogo} />
            </Link> {' '}
          </section>
          <section className="menu">
            <nav >
              {/* render all links */}
              {this.renderLinks()}
            </nav>
          </section>
        </section>
      </header>
    );
  }
}
export default NavBar;
