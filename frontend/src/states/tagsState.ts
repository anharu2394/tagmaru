import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tagActions } from '../actions/tagActions';

export interface Tag {
  id: number;
  name: string;
}

export type TagsState = Tag[];
const initialState: TagsState = [];

export const tagsReducer = reducerWithInitialState(initialState);
