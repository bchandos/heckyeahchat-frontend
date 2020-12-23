import React from 'react';

class EmptyChatView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="h-full flex flex-col">
        <h4 className="inline-flex items-center w-full font-semibold tracking-wide uppercase py-4 px-6 shadow">
          {this.props.menuHidden ? (
            <i onClick={this.props.toggleMenu} className="material-icons pr-2 cursor-pointer">menu</i>
          ) : null}
          Chat
        </h4>
        <div className="overflow-auto w-full flex-grow px-4">
          <div className="w-full h-full flex justify-center items-center">
            <div className="font-semibold text-lg">Please select a conversation, or create a new one.</div>
          </div>
        </div>
      </div>
    )
  }
}

export default EmptyChatView;