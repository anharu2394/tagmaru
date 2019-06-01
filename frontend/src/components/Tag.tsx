import * as React from 'react';
import { Tag as TagProps } from '../states/tagsState'
import { FollowParams } from '../actions/tagAction'
import styled from 'styled-components';
import { Token } from '../states/userState'
import { Link } from 'react-router-dom';

interface PassedProps {
  followTag: (params: FollowParams) => Promise<any>;
  unFollowTag: (params: FollowParams) => Promise<any>;
  token?: Token;
}

let nextId = 0
const Tag: React.SFC<TagProps & PassedProps> = (props: TagProps & PassedProps) => {
  if ('following' in props) {
    const isCheck = props.following ? {'defaultChecked': true} : null
    const handler = (e) => {
      return e.target.checked ? props.followTag(Object.assign({targetId: e.target.dataset.id},props.token)) 
              : props.unFollowTag(Object.assign({targetId: e.target.dataset.id},props.token))
    
    }
    return (
        <Wrapper>
          <p><Link to={'/tags/' + props.id }>{props.name}</Link></p>
          <div className="checkWrap">
            <input type="checkbox" id={props.name + nextId} data-id={props.id} {...isCheck} onChange={handler} />      
            <label htmlFor={props.name + nextId++} ></label>
          </div>
        </Wrapper>
    )
  }
  else {
    return (
      <Wrapper>
        <p><Link to={'/tags/' + props.id }>{props.name}</Link></p>
      </Wrapper>
    )
  }  
}

const Wrapper = styled.div`
  padding: 0.6em  1em;
  margin: 0 0 0.5em 0;
  background: rgba(0, 0, 0, 0.05);
  border-left: solid 6px rgb(182,208,232);
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.33);
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
    color: rgb(130,65,82);
    font-size: 1.3rem;
  }
  a {
    text-decoration:none;
  }
  input {
    display: none;
  }
  label {
    padding-left: 20px;
    position:relative;
    margin-right: 20px;
  }
  label::before {
    content: "";
    display: block;
    position: absolute;
    top: -4px;
    left: 0;
    width: 27px;
    height: 27px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }
  input:checked + label {
    color: #009a9a;
  }
  input:checked + label::after {
    content: "";
    display: block;
    position: absolute;
    top: -12px;
    left: 10px;
    width: 13.5px;
    height: 27px;
    transform: rotate(40deg);
    border-bottom: 3px solid #009a9a;
    border-right: 3px solid #009a9a;
  }
  .checkWrap {
    margin-left: 10px;
    height:100%;
  }
`
export default Tag;
