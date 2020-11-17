import axios from "axios";

export const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";

export function createTask(newItem) {
  return (dispatch) => {
    dispatch({
      type: ADD_ITEM_REQUEST,
    });
    axios({
      method: "POST",
      url: `http://127.0.0.1:8081/tasks`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: newItem,
    })
      .then((response) => {
        dispatch({
          type: ADD_ITEM_SUCCESS,
          payload: { item: newItem, response },
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_ITEM_FAILURE,
          payload: err,
        });
        console.log(err);
      });
  };
}

export const EDIT_TASK_REQUEST = "EDIT_TASK_REQUEST";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const EDIT_TASK_FAILURE = "EDIT_TASK_FAILURE";

export function editTask(task) {
  return (dispatch) => {
    dispatch({
      type: EDIT_TASK_REQUEST,
    });
    console.log('task in action cerator')
    console.log(task)
    axios({
      method: "PUT",
      url: `http://127.0.0.1:8081/tasks/${task.id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: task,
    })
      .then((response) => {
        dispatch({
          type: EDIT_TASK_SUCCESS,
          payload: { item: task, response },
        });
      })
      .catch((err) => {
        dispatch({
          type: EDIT_TASK_FAILURE,
          payload: err,
        });
        console.log(err);
      });
  };
}

export const REMOVE_ITEM_REQUEST = "REMOVE_ITEM_REQUEST";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const REMOVE_ITEM_FAILURE = "REMOVE_ITEM_FAILURE";

export function removeItem(id) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ITEM_REQUEST,
      payload: id,
    });
    axios({
      method: "DELETE",
      url: `http://127.0.0.1:8081/tasks/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(() => {
        dispatch({
          type: REMOVE_ITEM_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: REMOVE_ITEM_FAILURE,
          payload: err,
        });
        console.log(err);
      });
  };
}

export const GET_TODO_DATA_REQUEST = "GET_TODO_DATA_REQUEST";
export const GET_TODO_DATA_SUCCESS = "GET_TODO_DATA_SUCCESS";
export const GET_TODO_DATA_FAILURE = "GET_TODO_DATA_FAILURE";

export function getTodoData() {
  return (dispatch) => {
    dispatch({
      type: GET_TODO_DATA_REQUEST,
    });
    axios({
      method: "GET",
      url: `http://127.0.0.1:8081/tasks`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        dispatch({
          type: GET_TODO_DATA_SUCCESS,
          payload: data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_TODO_DATA_FAILURE,
          payload: err,
        });
        console.log(err);
      });
  };
}

export const OPEN_TASK_POPUP = "OPEN_TASK_POPUP";

export function openTask(selectedTask) {
  return {
    type: OPEN_TASK_POPUP,
    payload: selectedTask
  };
}

export const CLOSE_TASK_POPUP = "CLOSE_TASK_POPUP";

export function closeTask(selectedTask) {
  return {
    type: CLOSE_TASK_POPUP
  };
}
