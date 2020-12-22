import React from 'react';
import { Link } from 'react-router-dom';
import { getConversations } from '../api/api';

class ConversationList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    }
  }

  async componentDidMount() {
    const conversations = await getConversations(1); // Add userId
    this.setState({
      conversations
    })
  }

  render() {
    const conversationList = this.state.conversations.map((conversation) => (
      <Link to={`/chat/${conversation.id}`} key={conversation.id}>
        <li className="inline-flex items-center w-full px-2 py-4 border-b hover:bg-blue-100">
          <i className="material-icons px-2 text-gray-600">person</i>
          {conversation.name}
        </li>
      </Link>
    ))

    return (
      <div>
        <h4 className="font-semibold tracking-wide uppercase py-4 px-2 lg:px-4 shadow">
          Conversations
          <i onClick={this.props.toggleMenu} className="material-icons float-right cursor-pointer">close</i>
        </h4>
        <ul>
          {conversationList}
        </ul>
      </div>
    )
  }
}

export default ConversationList;