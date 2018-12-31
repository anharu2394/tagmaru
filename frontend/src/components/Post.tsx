import * as React from 'react';
import { Post as PostProps } from '../states/postsState'
import styled from 'styled-components';

const Post: React.SFC<PostProps> = (props: PostProps) => {
  switch (props.provider) {
    case 'devto':
      return (
          <Wrapper>
            <a href={props.url} target='_blank' >{props.title}</a>
            <p>👍{props.fab_count}</p>
            <p>{props.provider}から</p>
          </Wrapper>
      )
    default:
      return (
          <Wrapper>
            <a href={props.url} target='_blank' >{props.title}</a>
            <p>👍{props.fab_count}</p>
            <p>{props.provider}から</p>
          </Wrapper>
      )
  }
}

const Wrapper = styled.div`
  border-radius: 6px;
  -webkit-box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
  box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
  margin: 30px 0;
  padding: 20px;
`
export default Post;
