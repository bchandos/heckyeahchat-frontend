import React from 'react';

class SizingSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: null,
      iconPlane: null,
      iconMarker: null,
      size: 0,
      planeBottom: 0,
      timeout: null,
    }
  }

  componentDidMount() {
    this.setState({
      icon: document.getElementById('send-icon'),
      iconPlane: document.getElementById('send-icon-plane'),
      iconMarker: document.getElementById('send-icon-marker'),
    })
  }

  mouseDrag = (e) => {
    const planeOffset = Math.max(14, Math.min(this.state.planeBottom - e.clientY, 120)) - 14;
    const iconElem = this.state.icon;
    iconElem.classList.remove('bottom-1');
    iconElem.style.bottom = `${planeOffset}px`;
    this.props.updateSize(Math.ceil(planeOffset / 20));
  }

  handleMouseDown = (e) => {
    const timeout = window.setTimeout(() => {
      this.state.iconMarker.classList.remove('hidden');
      this.setState((state) => ({
        planeBottom: state.iconPlane.getBoundingClientRect().bottom,
      }));
      document.addEventListener('mousemove', this.mouseDrag);
    }, 350);
    this.setState({
      timeout
    });
  }

  clearMouse = (e) => {
    const iconElem = this.state.icon;
    if (e.type === 'mouseup' && e.target === e.currentTarget) {
      this.props.sendMessage();
      this.props.updateSize(0);
    }
    iconElem.style.bottom = '';
    iconElem.classList.add('bottom-1');
    this.state.iconMarker.classList.add('hidden');
    window.clearTimeout(this.state.timeout);
    document.removeEventListener('mousemove', this.mouseDrag);
  }


  render() {
    return (
      <React.Fragment>
        <div id="send-icon-plane" className="absolute h-32 w-10 left-0 bottom-0" onMouseLeave={this.clearMouse}>
          <div id="send-icon-marker" className="hidden absolute h-32 w-2 bg-gray-500 bottom-0 left-2"></div>
          <i id="send-icon" className="material-icons absolute bottom-1 left-1" onMouseDown={this.handleMouseDown} onMouseUp={this.clearMouse}>send</i>
        </div>
      </React.Fragment>
    )
  }
}

export default SizingSlider;