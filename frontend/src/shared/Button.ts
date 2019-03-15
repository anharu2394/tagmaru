import styled from 'styled-components';

interface ButtonProps {
  marginTop?: number;
  blue?: boolean;
}

const Button = styled.button`
  margin: ${(props: ButtonProps) => props.marginTop}px 0 0 0;
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  color: ${(props: ButtonProps) => props.blue ? "#fff":"#555"};
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: .1rem;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 4px;
  border: ${(props: ButtonProps) => props.blue ? "1px solid #33C3F0":"1px solid #bbb"};
  cursor: pointer;
  box-sizing: border-box;
  background: ${(props: ButtonProps) => props.blue ? "#33C3F0":"#fff"};
  &:hover {
    color: ${(props: ButtonProps) => props.blue ? "#fff":"#333"};
    border-color: ${(props: ButtonProps) => props.blue ? "#1EAEDB":"#888"};
    background: ${(props: ButtonProps) => props.blue ? "#1EAEDB":"#fff"};
    outline: 0;
  }
`;

export default Button;
