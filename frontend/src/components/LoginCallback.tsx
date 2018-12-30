import * as React from 'react';
import { parse } from 'query-string';
import { Token } from '../states/userState';
import { Redirect } from 'react-router-dom';

interface LoginCallbackProps {
  match: any,
  login?: (token: Token) => void,
}

export default class LoginCallback extends React.Component<LoginCallbackProps,{}> {
  componentDidMount() {
    const query = parse(this.props.match.location.search);
    if (this.props.login) {
      this.props.login(query);
    }
  }
  render() {
    return (
      <Redirect to={'/'}/>
    );
  }
};
