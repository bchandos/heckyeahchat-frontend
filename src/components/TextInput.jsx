import React from 'react';

class TextInput extends React.Component {

  animateLabel = (e) => {
    const label = e.currentTarget.previousElementSibling;
    if (e.type === 'focus') {
      label.classList.add('text-xs', 'top-0', 'text-gray-500');
      label.classList.remove('text-base', 'top-2', 'text-gray-300');
    } else if (e.type === 'blur') {
      label.classList.add('text-base', 'top-2', 'text-gray-300');
      label.classList.remove('text-xs', 'top-0', 'text-gray-500');
    }
  }

  render() {
    return (
      <div className="relative bg-white pt-3 mb-8">
        <label className="absolute left-1 top-2 block text-gray-300 transition-label" htmlfor={this.props.name}>{this.props.labelText}</label>
        <input
          className="w-full p-1 text-gray-700 border-b-2 border-gray-500 outline-none"
          type="text"
          name={this.props.name}
          onFocus={this.animateLabel}
          onBlur={this.animateLabel}
        />
      </div>
    )
  }
}

export default TextInput;