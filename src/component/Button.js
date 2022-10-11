import React, { Component } from "react";

class Button extends Component {
  render() {
    return (
      // the className was used in css to properly align the buttons
      <div className={`column-${this.props.cols}`}>
        <button
          className="calc-button"
          // loops through the list of buttons in appJs and picks the current one tapped
          onClick={() => this.props.action(this.props.symbol)}
        >
          {this.props.symbol}
        </button>
      </div>
    );
  }
}

export default Button;
