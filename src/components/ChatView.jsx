import React from 'react';
import ChatBubbleOther from './ChatBubbleOther';
import ChatBubbleYou from './ChatBubbleYou';
import SizingSlider from './SizingSlider';

class ChatView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageInput: '',
      sizePopupVisible: false,
      messages: [
        {
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          size: 0,
          id: 1,
          sender: 1,
        },
        {
          message: 'Curabitur at justo a risus mattis placerat.',
          size: 2,
          id: 2,
          sender: 5,
        },
        {
          message: 'Mauris eu est sodales, consectetur diam sit amet, suscipit lorem.',
          size: 0,
          id: 3,
          sender: 1,
        },
        {
          message: 'Donec ut dui gravida, malesuada massa at, interdum arcu.',
          size: 0,
          id: 4,
          sender: 5,
        },
        {
          message: 'Proin interdum massa at dolor fermentum euismod.',
          size: 0,
          id: 5,
          sender: 1,
        },
        {
          message: 'Donec eu tortor dictum, iaculis mi in, posuere elit.',
          size: 0,
          id: 6,
          sender: 5,
        },
        {
          message: 'Ut sed tortor ut enim convallis vestibulum eu at purus.',
          size: 0,
          id: 7,
          sender: 1,
        },
        {
          message: 'Aliquam id mi semper, tristique mauris sodales, eleifend odio.',
          size: 0,
          id: 8,
          sender: 5,
        },
        {
          message: 'Curabitur aliquet elit non finibus blandit.',
          size: 0,
          id: 9,
          sender: 1,
        },
        {
          message: 'Morbi in lorem venenatis, volutpat est non, porttitor lacus.',
          size: 0,
          id: 99,
          sender: 5,
        },
        {
          message: 'Praesent quis ligula interdum, ultricies mi sit amet, placerat purus.',
          size: 0,
          id: 10,
          sender: 1,
        },
        {
          message: 'Duis tempus nisi sed dolor convallis, nec congue lectus dignissim.',
          size: 0,
          id: 11,
          sender: 5,
        },
        {
          message: 'Nam quis ligula condimentum, tempus risus at, vulputate sapien.',
          size: 0,
          id: 12,
          sender: 1,
        },
        {
          message: 'Cras a libero porta, facilisis nunc quis, ultrices nisi.',
          size: 0,
          id: 13,
          sender: 5,
        },
        {
          message: 'Ut euismod urna a odio consequat consequat.',
          size: 0,
          id: 14,
          sender: 1,
        },
        {
          message: 'Nullam non libero non ligula elementum viverra.',
          size: 4,
          id: 15,
          sender: 5,
        },
        {
          message: 'Duis non ligula id magna accumsan fringilla.',
          size: 0,
          id: 16,
          sender: 1,
        },
        {
          message: 'Donec ultrices mi non volutpat vulputate.',
          size: 0,
          id: 17,
          sender: 1,
        },
        {
          message: 'Nulla ac ex tincidunt, tempus justo nec, ultricies mauris.',
          size: 2,
          id: 18,
          sender: 5,
        },
      ]
    }
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
    console.log(clickOffset);
    const input = e.currentTarget.previousSibling;
    if (!!this.state.messageInput) {
      this.sendMessage(clickOffset, () => input.focus());
    }
  }

  sendMessage = (size, cb) => {
    this.setState(state => ({
      messages: [...state.messages, {
        message: state.messageInput,
        id: Math.floor(Math.random() * 100) + 500,
        sender: 1,
        size: size,
      }],
      messageInput: ''
    }), cb);
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

  componentDidMount() {
    const bottomMarker = document.getElementById('bottom-marker');
    bottomMarker.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidUpdate() {
    const bottomMarker = document.getElementById('bottom-marker');
    bottomMarker.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const messages = this.state.messages.map(msg => (
      msg.sender === 1 ? (
        <ChatBubbleYou key={msg.id} size={msg.size}>{msg.message}</ChatBubbleYou>
      ) : (
          <ChatBubbleOther key={msg.id} size={msg.size}>{msg.message}</ChatBubbleOther>
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
        <div className="overflow-auto w-full flex-grow">
          {messages}
          <div id="bottom-marker"></div>
        </div>
        <div className="w-full bg-purple-300 flex p-2 items-center shadow">
          <input
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
            <i className="material-icons cursor-pointer align-middle z-10">send</i>
            {this.state.sizePopupVisible ? <SizingSlider /> : null}
          </button>
        </div>
      </div>
    )
  }
}

export default ChatView;