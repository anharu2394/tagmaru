import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Tag from './components/tag';

class App extends React.Component {
  render() {
    return (
        <Tag />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
