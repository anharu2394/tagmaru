import * as React from 'react';
import styled from 'styled-components';
import Image from '../shared/Image';
import * as Logo from '../assets/images/logo.jpg';
import Section from '../shared/Section';
import { Flex, Box } from '@rebass/grid';

const pc = require('../assets/images/tagmaru-pc.svg') as string;

const About: React.SFC = () => {
  return (
    <div>
      <h1>たぐまるはエンジニアのための情報収集を快適にするサービス</h1>
      <Section>
        <Flex flexWrap='wrap'>
          <Box width={[1,1/2]}>   
            <img width="100%" src={pc} />
          </Box>
          <Box width={[1,1/2]}>
            <h2>タグで検索、だから効率的</h2>
            <p>タグで検索するので、関連記事をまとめて
              読むことができます。トレンド(急上昇)記事、最新記事、人気記事を読むことができます。
            </p>
          </Box>
        </Flex>
      </Section>
    </div>
  );
};


const MoveImage = styled(Image)`
  vertical-align: middle;
`
export default About;
