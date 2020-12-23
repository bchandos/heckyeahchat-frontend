import React from 'react';
import { withRouter } from 'react-router-dom';
import { getMessages } from '../api/api';
import ChatBubbleOther from './ChatBubbleOther';
import ChatBubbleYou from './ChatBubbleYou';
import SizingSlider from './SizingSlider';

class ChatView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageInput: '',
      messages: [],
      ws: null,
      size: 0,
    }
  }

  async componentDidMount() {
    // Get messages
    const messages = await getMessages(this.props.match.params.chatId);
    this.setState({
      messages
    });
    // Connect to websocket and setup message handler
    this.setState({
      ws: new WebSocket('ws://localhost:3333')
    });
    this.state.ws.addEventListener('message', this.addMessage);
    const bottomMarker = document.getElementById('bottom-marker');
    bottomMarker.scrollIntoView({ behavior: 'smooth' });
  }

  async componentDidUpdate(prevProps) {
    // Only requery the messages if the chatId has changed
    if (prevProps.match.params.chatId !== this.props.match.params.chatId) {
      const messages = await getMessages(this.props.match.params.chatId);
      this.setState({
        messages
      })
    }
    const bottomMarker = document.getElementById('bottom-marker');
    bottomMarker.scrollIntoView({ behavior: 'smooth' });
  }

  componentWillUnmount() {
    this.state.ws.removeEventListener('message', this.addMessage);
  }

  addMessage = (e) => {
    this.setState(state => ({
      messages: [...state.messages, JSON.parse(e.data)],
    }));
  }

  handleInput = (e) => {
    this.setState({ messageInput: e.currentTarget.value });
  }

  handleKeyUp = (e) => {
    if (e.code === 'Enter') {
      this.sendMessage()
    }
  }

  handleClick = (e) => {
    this.sendMessage();
  }

  sendMessage = async () => {
    if (!!this.state.messageInput) {
      const jwt = localStorage.getItem('jwt');
      const message = {
        text: this.state.messageInput,
        UserId: this.props.user.id,
        size: this.state.size,
        ConversationId: this.props.match.params.chatId,
        sentAt: new Date(),
      };
      // Send the message over the websocket...
      this.state.ws.send(JSON.stringify({
        token: jwt,
        type: 'new-message',
        contents: message,
      }));
      // Reset the input
      this.setState({
        messageInput: '',
      })
    }
  }

  updateSize = (size) => {
    if (size) {
      this.setState({
        size
      })
    }
  }

  render() {
    const messages = this.state.messages.map(msg => (
      msg.UserId === this.props.user.id ? (
        <ChatBubbleYou key={msg.id} size={msg.size}>
          <div className="pb-2">
            {msg.text}
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs italic">{msg.User.nickname || msg.User.email}</div>
            <div className="text-xs italic">{new Date(msg.sentAt).toLocaleString()}</div>
          </div>
        </ChatBubbleYou>
      ) : (
          <ChatBubbleOther key={msg.id} size={msg.size}>
            <div className="pb-2">
              {msg.text}
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-xs italic">{msg.User.nickname || msg.User.email}</div>
              <div className="text-xs italic">{new Date(msg.sentAt).toLocaleString()}</div>
            </div>
          </ChatBubbleOther>
        )
    ));

    return (
      <div className="h-full flex flex-col">
        <h4 className="inline-flex items-center w-full font-semibold tracking-wide uppercase py-4 px-6 shadow">
          {this.props.menuHidden ? (
            <i onClick={this.props.toggleMenu} className="material-icons pr-2 cursor-pointer">menu</i>
          ) : null}
          Chat
        </h4>
        <div className="overflow-auto w-full flex-grow px-4">
          {messages}
          <div id="bottom-marker"></div>
        </div>
        <div className="w-full bg-purple-300 flex p-2 items-center shadow">
          <textarea
            onChange={this.handleInput}
            onKeyUp={this.handleKeyUp}
            value={this.state.messageInput}
            type="text"
            className="flex-grow p-2 mr-2 bg-gray-200 rounded focus:ring-2 focus:ring-blue-400 focus:bg-white" />
          <button
            onClick={this.handleClick}
            className="px-2 relative h-10 w-10">
            <SizingSlider sendMessage={this.sendMessage} updateSize={this.updateSize} />
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(ChatView);