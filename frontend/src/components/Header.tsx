import * as React from 'react';
import styled from 'styled-components';
import * as Logo from '../assets/images/logo.png';
import Button from '../shared/Button'
import Image from '../shared/Image'
import Container from '../shared/Container'
import Flex from '../shared/Flex'
import FlexChild from '../shared/FlexChild'
import { Link } from 'react-router-dom';

interface HeaderProps {
	openWindow: (any) => void;
  loggedIn: boolean;
}

const Header: React.SFC<HeaderProps> = (props) => {
  const LoginOrMypageButton :any = props.loggedIn ?  <Link to="/mypage"><Button marginTop="13" blue >マイページ</Button></Link> : <Button marginTop="13" blue onClick={props.openWindow}>ログイン</Button>
  return (
    <Wrapper>
      <Container>
        <Flex>
          <FlexChild>
            <Link to="/">
              <Image src={Logo} />
            </Link>
          </FlexChild>
          <FlexChild>
            {LoginOrMypageButton}
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
