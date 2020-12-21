import React from 'react';

class ConversationList extends React.Component {

  render() {
    return (
      <div>
        <h4 className="font-semibold tracking-wide uppercase py-4 px-2 lg:px-4 shadow">
          Conversations
          <i onClick={this.props.toggleMenu} className="material-icons float-right cursor-pointer">close</i>
        </h4>
        <ul>
          <a href="/chat/1">
            <li className="inline-flex items-center w-full px-2 py-4 border-b hover:bg-blue-100">
              <i className="material-icons px-2 text-gray-600">person</i>
              Danny, You
            </li>
          </a>
          <a href="/chat/1">
            <li className="inline-flex items-center w-full px-2 py-4 border-b hover:bg-blue-100">
              <i className="material-icons px-2 text-gray-600">people</i>
              Danny, Brandon, You
            </li>
          </a>
        </ul>
      </div>
    )
  }
}

export default ConversationList;