import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tagActions } from '../actions/tagAction';

export interface Tag {
  id: number;
  name: string;
}

export interface TagsState { 
  tags: Tag[];
}

const initialState: TagsState = {tags: []};

export const tagsReducer = reducerWithInitialState(initialState);
