import React from 'react';
import BaseButton from './BaseButton';

class SubmitButton extends React.Component {
  render() {
    return (
      <BaseButton
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold disabled:bg-gray-500 disabled:text-gray-300"
        buttonText={this.props.buttonText}
        disabled={this.props.disabled}
        type="submit"
      />
    )
  }
}

export default SubmitButton;