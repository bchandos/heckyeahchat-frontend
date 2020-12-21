import React from 'react';
import ChatView from './ChatView';
import ConversationList from './ConversationList';

class Chat extends React.Component {
  /*
    Possible states:
      - md or higher:
        - Menu displayed, flex basis 25%
        
  */

  constructor(props) {
    super(props);
    this.state = {
      menuHidden: !!(window.innerWidth <= 768),
      menuType: window.innerWidth > 768 ? 'fixed' : 'float',
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.resizeEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  resizeEvent = (e) => {
    this.setState({
      menuHidden: !!(window.innerWidth <= 768),
      menuType: window.innerWidth > 768 ? 'fixed' : 'float',
    });
  }

  toggleMenu = (e) => {
    this.setState((state) => ({
      menuHidden: !state.menuHidden
    }));
  }

  render() {
    let conversationListClasses;
    if (this.state.menuType === 'fixed') {
      conversationListClasses = 'flex-basis-25';
    } else {
      conversationListClasses = 'absolute top-0 left-0 z-10'
    }

    if (this.state.menuHidden) {
      conversationListClasses += ' hidden';
    }

    return (
      <div className="relative xl:w-full h-full max-w-screen-xl mx-4 mb-4 xl:mx-auto bg-gray-400 rounded flex overflow-hidden">
        <div className={`h-full bg-blue-200 overflow-auto ${conversationListClasses}`}>
          <ConversationList toggleMenu={this.toggleMenu} menuHidden={this.state.menuHidden} />
        </div>
        <div className="h-full bg-blue-300 flex-grow shadow-inner">
          <ChatView toggleMenu={this.toggleMenu} menuHidden={this.state.menuHidden} />
        </div>

      </div>
    )
  }
}

export default Chat;