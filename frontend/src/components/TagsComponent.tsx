import * as React from 'react';
import { TagsState } from '../states/tagsState';
import { TagActions } from '../containers/tagContainer';
import Tag from './Tag'
interface OwnProps {}

type TagsProps = OwnProps & TagsState & TagActions;

export const TagsComponent:  React.SFC<TagsProps> = (props: TagsProps) => {
  return (
    <div>
      {
        props.tags.map((tag) => (<Tag {...tag}/>))
      }
    </div>
  );
};
