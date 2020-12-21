import React from 'react';

class ChatBubbleOther extends React.Component {

  render() {
    const sizeLookup = {
      0: 'text-base',
      1: 'text-lg',
      2: 'text-xl',
      3: 'text-2xl',
      4: 'text-3xl',
      5: 'text-4xl',
      6: 'text-5xl'
    }
    return (
      <div className="flex flex-row">
        <div className={`shadow rounded-tl rounded-tr rounded-br px-2 py-4 m-2 bg-indigo-500 w-2/3 md:w-3/5 xl:w-1/2 ${sizeLookup[this.props.size]}`}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default ChatBubbleOther;