import * as React from 'react';
import { Post as PostProps } from '../states/postsState'
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';

const Post: React.SFC<PostProps> = (props: PostProps) => {
  switch (props.provider) {
    case 'devto':
      return (
          <Wrapper>
          <Flex>
            <Box width={[2/3, 1/2, 1/2]} px={2}>
              <a href={'https://dev.to/' + props.url} target='_blank' >{props.title}</a>
              <p>👍{props.fab_count}</p>
              <p>{props.provider}から</p>
            </Box>
            <Box width={[1/3, 1/2, 1/2]} px={2}>
              <Image src={props.image} />
            </Box>
          </Flex>
          </Wrapper>
      )
    case 'qiita':
      return (
          <Wrapper>
            <Flex>
              <Box width={[2/3, 1/2, 1/2]} px={2}>
                <a href={'https://qiita.com/' + props.url} target='_blank' >{props.title}</a>
                <p>👍{props.fab_count}</p>
                <p>{props.provider}から</p>
              </Box>
              <Box width={[1/3, 1/2, 1/2]} px={2}>
                <Image src={props.image} />
              </Box>
            </Flex>
          </Wrapper>
      )
    default:
      return (
          <Wrapper>
            <Flex>
              <Box width={[2/3, 1/2, 1/2]} px={2}>
                <a href={props.url} target='_blank' >{props.title}</a>
                <p>👍{props.fab_count}</p>
                <p>{props.provider}から</p>
              </Box>
              <Box width={[1/3, 1/2, 1/2]} px={2}>
                <Image src={props.image} />
              </Box>
            </Flex>
          </Wrapper>
      )
  }
}

const Wrapper = styled.div`
  border-radius: 6px;
  -webkit-box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
  box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
  margin: 30px 0;
  padding: 20px 5px;
`

const Image = styled.img`
  width: 100%;
`
export default Post;
