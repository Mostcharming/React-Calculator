import React, { Component } from "react";
import Button from "./component/Button";
import "./css/styles.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // inital value before any calculation is zero
      // previous is an array
      current: "0",
      previous: [],
      nextIsReset: false,
    };
  }

  // clears the input field and sets everything back to the default mode
  reset = () => {
    this.setState({ current: "0", previous: [], nextIsReset: false });
  };

  addToCurrent = (symbol) => {
    //console.log(symbol);
    // when any of this symbol is clicked(giving it an index of 0), let previous(which is an array)be the
    // the current state and push with a space between
    if (["/", "*", "-", "+"].indexOf(symbol) > -1) {
      let { previous } = this.state;
      previous.push(this.state.current + " " + symbol);
      this.setState({ previous, nextIsReset: true });
    } else {
      if (
        (this.state.current === "0" && symbol !== ".") ||
        this.state.nextIsReset
      ) {
        this.setState({ current: symbol, nextIsReset: false });
      } else {
        this.setState({ current: this.state.current + symbol });
      }
    }
  };

  calculate = (symbol) => {
    let { current, previous } = this.state;
    if (previous.length > 0) {
      // eslint-disable-next-line no-eval
      //- 1 is getting the last item in the previous array
      //which means the previous number and previous symbol and current number
      current = eval(String(previous[previous.length - 1] + current));

      this.setState({ current, previous: [], nextIsReset: true });
    }
  };

  backSpace = () => {
    let { current } = this.state;
    if (current.length >= 2) {
      this.setState({ current: current.slice(0, -1) });
    } else {
      this.setState({ current: "0" });
    }
  };

  render() {
    //buttons here is an array, and being looped through by ButtonJs
    const buttons = [
      { symbol: "C", cols: 2, action: this.reset },
      { symbol: "DEL", cols: 1, action: this.backSpace },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "7", cols: 1, action: this.addToCurrent },
      { symbol: "8", cols: 1, action: this.addToCurrent },
      { symbol: "9", cols: 1, action: this.addToCurrent },
      { symbol: "*", cols: 1, action: this.addToCurrent },
      { symbol: "4", cols: 1, action: this.addToCurrent },
      { symbol: "5", cols: 1, action: this.addToCurrent },
      { symbol: "6", cols: 1, action: this.addToCurrent },
      { symbol: "-", cols: 1, action: this.addToCurrent },
      { symbol: "1", cols: 1, action: this.addToCurrent },
      { symbol: "2", cols: 1, action: this.addToCurrent },
      { symbol: "3", cols: 1, action: this.addToCurrent },
      { symbol: "+", cols: 1, action: this.addToCurrent },
      { symbol: "0", cols: 2, action: this.addToCurrent },
      { symbol: ".", cols: 1, action: this.addToCurrent },
      { symbol: "=", cols: 1, action: this.calculate },
    ];

    return (
      <div className="App">
        {/* this creates a floaty atop the input using the value of previous from add current */}
        {this.state.previous.length > 0 ? (
          <div className="prev-display">
            {this.state.previous[this.state.previous.length - 1]}
          </div>
        ) : null}

        {/* this is for the input field atop the buttons */}
        <input
          className="result"
          type="text"
          value={this.state.current}
        ></input>

        <br />

        {/* this map(loop through) the button list array and create a ButtonJs for each button */}
        {buttons.map((btn, i) => {
          return (
            <Button
            //within a mapping function, the rendered component needs to have a unique key
            //which is the index in this case
              key={i}
              symbol={btn.symbol}
              cols={btn.cols}
              action={(symbol) => btn.action(symbol)}
            ></Button>
          );
        })}
      </div>
    );
  }
}

export default App;
