import { Component } from 'react';

interface State {
  shouldCrash: boolean;
}

class ErrorButton extends Component<object, State> {
  state: State = { shouldCrash: false };

  handleClick = () => {
    this.setState({ shouldCrash: true });
  };

  render() {
    if (this.state.shouldCrash) {
      throw new Error('Crash по клику');
    }
    return (
      <button
        className="border border-blue-200 rounded-sm w-40 h-10 cursor-pointer m-20 block mx-auto"
        onClick={this.handleClick}
      >
        Error Button
      </button>
    );
  }
}

export default ErrorButton;
