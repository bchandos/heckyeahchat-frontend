import React from 'react';
import { Link } from 'react-router-dom';

class BaseNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuShowing: false
    }
  }

  showMenu = (e) => {
    // add key listener to body
    this.setState({
      menuShowing: true
    });
  }

  hideMenu = (e) => {
    // destroy key listener on body
    this.setState({
      menuShowing: false
    });
  }

  render() {
    return (
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
        {this.state.menuShowing ? (
          <div className="w-screen h-screen absolute top-0 left-0 z-10" onClick={this.hideMenu}></div>
        ) : ''}
        <div className="w-full max-w-screen-xl px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="relative flex justify-between w-auto  px-4">
            <Link to='/'>
              <span className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
                Heck Yeah Chat
              </span>
            </Link>
          </div>
          <div className="flex flex-grow items-center" id="example-navbar-warning">
            <ul className="flex flex-row list-none ml-auto">
              <li className="">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  <i className="material-icons">account_circle</i>
                </a>
              </li>
              <li className="relative">
                <a onClick={this.showMenu} className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  <i className="material-icons">more_vert</i>
                </a>
                {this.state.menuShowing ? (
                  <div className="absolute right-1 top-1 rounded bg-gray-300 py-4 z-20">
                    <ul className="flex flex-col list-none">
                      <Link to='/'>
                        <li className="py-1 pl-2 pr-8 hover:bg-gray-400">Login</li>
                      </Link>
                      <Link to='/register'>
                        <li className="py-1 pl-2 pr-8 hover:bg-gray-400">Register</li>
                      </Link>
                      <li className="py-1 pl-2 pr-8 hover:bg-gray-400">About</li>
                    </ul>
                  </div>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default BaseNav;