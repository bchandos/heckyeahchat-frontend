import React from 'react';
import BaseButton from './BaseButton';

class SubmitButton extends React.Component {
  render() {
    return (
      <BaseButton className="bg-gray-700 hover:bg-gray-600 text-white font-bold" buttonText={this.props.buttonText} />
    )
  }
}

export default SubmitButton;