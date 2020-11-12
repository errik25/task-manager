import { combineReducers } from 'redux'
import { pageReducer } from './page'
import { userReducer } from './user'
import { todoListReducer } from './toDoList'

export const rootReducer = combineReducers({
    page: pageReducer,
    user: userReducer,
    todoList: todoListReducer
})