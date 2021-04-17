import { combineReducers } from 'redux';
import { userReducer } from './user';
import { tasksReducer } from './tasks';

export const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
});
