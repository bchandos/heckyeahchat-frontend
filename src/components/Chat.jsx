import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ChatView from './ChatView';
import ConversationList from './ConversationList';
import jwt_decode from 'jwt-decode';
import { checkToken } from '../api/api';
import EmptyChatView from './EmptyChatView';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuHidden: !!(window.innerWidth <= 768),
      menuType: window.innerWidth > 768 ? 'fixed' : 'float',
      user: null,
      loadingToken: true,
    }
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resizeEvent);
    await this.verifyToken();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  verifyToken = async () => {
    this.setState({
      loadingToken: true,
    })
    let user;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const checked = await checkToken(jwt);
      if (checked) {
        user = jwt_decode(jwt).user;
      } else {
        localStorage.setItem('jwt', '');
        user = null;
      }
    } else {
      user = null;
    }
    this.setState({
      user,
      loadingToken: false,
    })
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

    let mainContent;
    if (!this.state.loadingToken) {
      if (this.state.user) {
        mainContent = (
          <div className="relative xl:w-full h-full max-w-screen-xl mx-4 mb-4 xl:mx-auto bg-gray-400 rounded flex overflow-hidden">
            <div className={`h-full bg-blue-200 overflow-auto ${conversationListClasses}`}>
              <ConversationList user={this.state.user} toggleMenu={this.toggleMenu} menuType={this.state.menuType} />
            </div>
            <div className="h-full bg-blue-300 flex-grow shadow-inner">
              <Switch>
                <Route path={`${this.props.match.path}/:chatId`}>
                  <ChatView user={this.state.user} toggleMenu={this.toggleMenu} menuHidden={this.state.menuHidden} />
                </Route>
                <Route path={this.props.match.path}>
                  <EmptyChatView toggleMenu={this.toggleMenu} menuHidden={this.state.menuHidden} />
                </Route>
              </Switch>
            </div>
          </div>
        )
      } else {
        this.props.history.push('/');
      }
    } else {
      mainContent = <div>LOADING...</div>
    }
    return (
      <React.Fragment>
        { mainContent}
      </React.Fragment>
    )
  }
}

export default withRouter(Chat);