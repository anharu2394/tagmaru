import * as React from 'react';
import { Tag as TagProps } from '../states/tagsState'

const Tag: React.SFC<TagProps> = (props: TagProps) => {
  return (
    <div key={props.id}>
      <p>{props.name}</p>
    </div>
  )
}

export default Tag;
