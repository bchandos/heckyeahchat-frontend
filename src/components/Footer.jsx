import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="w-full shadow-inner text-center p-4 bg-gray-300 absolute bottom-0 text-gray-600">
        &copy; <a className="hover:text-gray-900" href="https://billchandos.dev">billchandos.dev</a>
      </footer>
    )
  }
}

export default Footer;