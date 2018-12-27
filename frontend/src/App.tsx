import * as React from 'react';
import TagContainer from './containers/tagContainer'
import Header from './components/Header'
import About from './components/About'
import Container from './shared/Container'
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Container>
          <About />
        </Container>
        <TagContainer />
      </div>
    );
  }
}
