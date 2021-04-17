import {
  GET_TODO_DATA_REQUEST,
  GET_TODO_DATA_SUCCESS,
  GET_TODO_DATA_FAILURE,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILURE,
  EDIT_TASK_REQUEST,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  OPEN_TASK_POPUP,
  CLOSE_TASK_POPUP,
} from '../actions/TasksActions';

const initialState = {
  list: [],
  isFetching: false,
  openedTask: null,
};

export function tasksReducer(state = initialState, action) {
  let newList;
  switch (action.type) {
    case GET_TODO_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_TODO_DATA_SUCCESS:
      const todoData = action.payload.data.map(item => ({
        ...item,
        completionDate: new Date(item.completionDate).toISOString().slice(0, 10),
      }));
      return {
        ...state,
        list: todoData,
        isFetching: false,
      };

    case GET_TODO_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case ADD_ITEM_REQUEST:
      return { ...state };

    case ADD_ITEM_SUCCESS:
      const list = [...state.list];
      const newItem = {
        ...action.payload.response.data,
        id: action.payload.response.data.id,
      };
      list.push(newItem);
      return { ...state, list };

    case ADD_ITEM_FAILURE:
      return { ...state };

    case EDIT_TASK_REQUEST:
      return { ...state };

    case EDIT_TASK_SUCCESS: {
      const newItem = {
        ...action.payload.response.data,
      };
      const newList = state.list.map(item => {
        if (item.id === newItem.id) {
          item = newItem;
        }
        return item;
      });
      return { ...state, list: newList };
    }

    case EDIT_TASK_FAILURE:
      return { ...state };

    case REMOVE_ITEM_REQUEST:
      return { ...state };

    case REMOVE_ITEM_SUCCESS:
      newList = state.list.filter(item => item.id !== action.payload);
      return { ...state, list: newList };

    case REMOVE_ITEM_FAILURE:
      return { ...state };

    case OPEN_TASK_POPUP:
      let isNewTask = false;
      if (action.payload === {}) {
        isNewTask = true;
      }
      return {
        ...state,
        openedTask: action.payload,
        isNewTask,
      };

    case CLOSE_TASK_POPUP:
      return { ...state, openedTask: null };

    default:
      return { ...state };
  }
}
