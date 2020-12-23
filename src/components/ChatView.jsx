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
      sizePopupVisible: false,
      messages: [],
      ws: null,
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
    this.state.ws.addEventListener('message', (e) => {
      const message = JSON.parse(e.data);
      this.addMessage(message);
    });
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
    this.state.ws.removeEventListener('message', (e) => {
      const message = JSON.parse(e.data);
      this.addMessage(message);
    })
  }

  addMessage = (message) => {
    this.setState(state => ({
      messages: [...state.messages, message],
    }));
  }

  handleInput = (e) => {
    this.setState({ messageInput: e.currentTarget.value });
  }

  handleKeyUp = (e) => {
    if (e.code === 'Enter' && !!this.state.messageInput) {
      const input = e.currentTarget;
      this.sendMessage(0, () => input.focus())
    }
  }

  handleClick = (e) => {
    const btnTop = e.currentTarget.getBoundingClientRect().bottom;
    const clickY = e.clientY;
    const clickOffset = Math.max(0, Math.floor((btnTop - clickY) / 20));
    const input = e.currentTarget.previousSibling;
    if (!!this.state.messageInput) {
      this.sendMessage(clickOffset, () => input.focus());
    }
  }

  sendMessage = async (size, cb) => {
    const jwt = localStorage.getItem('jwt');
    const message = {
      text: this.state.messageInput,
      UserId: this.props.user.id,
      size: size,
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
    // Run the focus callback
    cb();
  }

  waitForSizePopup = (e) => {
    const popupTimeout = setTimeout(() => {
      this.setState({ sizePopupVisible: true });
    }, 350);
    this.setState({
      popupTimeout
    })
  }

  clearTimeout = (e) => {
    clearTimeout(this.state.popupTimeout);
    this.setState({ sizePopupVisible: false });
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
            onMouseDown={this.waitForSizePopup}
            onMouseUp={this.clearTimeout}
            onMouseLeave={this.clearTimeout}
            onClick={this.handleClick}
            className="px-2 relative">
            {this.state.sizePopupVisible ? <SizingSlider /> : <i className="material-icons cursor-pointer align-middle z-10">send</i>}
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(ChatView);