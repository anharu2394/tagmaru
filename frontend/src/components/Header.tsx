import * as React from 'react';
import styled from 'styled-components';
import * as Logo from '../assets/images/logo.jpg';
import Button from '../shared/Button'
import Image from '../shared/Image'
import Container from '../shared/Container'
import Flex from '../shared/Flex'
import FlexChild from '../shared/FlexChild'

const Header: React.SFC = () => {
  return (
    <Wrapper>
      <Container>
        <Flex>
          <FlexChild>
            <Image src={Logo} />
          </FlexChild>
          <FlexChild>
            <Button marginTop="13" blue>ログイン</Button>
          </FlexChild>
        </Flex>
      </Container>
    </Wrapper> 
  );
};

const Wrapper = styled.header`
    -webkit-box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.26);
    box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.26);
    padding: 5px 0;
    max-height: 80px;
`;

export default Header;
