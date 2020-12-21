import React from 'react';

class BaseButton extends React.Component {

  ripple = (e) => {
    const button = e.currentTarget;

    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.style.transform = 'scale(0)';

    circle.classList.add('btn-ripple', 'absolute', 'rounded-full', 'bg-white', 'opacity-70', 'animate-ripple');

    const ripple = button.getElementsByClassName('btn-ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  render() {
    return (
      <button
        disabled={this.props.disabled}
        type={this.props.type}
        onClick={this.ripple}
        className={`overflow-hidden relative transition text-xl tracking-wider shadow duration-200 w-full p-4 mb-6 rounded ${this.props.className}`}
      >
        {this.props.buttonText}
      </button>
    )
  }
}

export default BaseButton;