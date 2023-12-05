import type { ErrorInfo } from 'react';
import React, { Component } from 'react';

interface IProps {
  children: JSX.Element;
}
interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`error: ${JSON.stringify(error, null, 2)}`);
    console.warn(`info: ${JSON.stringify(info, null, 2)}`);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что то пошло не так.........</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
