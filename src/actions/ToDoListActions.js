import axios from "axios";

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE'

export function addItem(newItem) {
    return dispatch  => {
        dispatch({
            type: ADD_ITEM_REQUEST
        })
        axios({
            method: 'POST',
            url: `http://127.0.0.1:8081/tasks`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: newItem,
        }).then((response) => {
            dispatch({
                type: ADD_ITEM_SUCCESS,
                payload: {item: newItem, response},
            })
        }).catch((err) => {
            dispatch({
                type: ADD_ITEM_FAILURE,
                payload: err,
            })
            console.log(err)
        })
    }
}

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST'
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS'
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE'

export function removeItem(id) {
    return dispatch => {
        dispatch({
            type: REMOVE_ITEM_REQUEST,
            payload: id,
        })
        axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8081/tasks/${id}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            dispatch({
                type: REMOVE_ITEM_SUCCESS,
                payload: id,
            })
        }).catch((err) => {
            dispatch({
                type: REMOVE_ITEM_FAILURE,
                payload: err,
            })
            console.log(err)
        })
    }
}

export const CHECK_ITEM_REQUEST = 'CHECK_ITEM_REQUEST'
export const CHECK_ITEM_SUCCESS = 'CHECK_ITEM_SUCCESS'
export const CHECK_ITEM_FAILURE = 'CHECK_ITEM_FAILURE'

export function checkItem(pressedItem) {
    return dispatch => {
        let updatedItem = {...pressedItem}
        dispatch({
            type: CHECK_ITEM_REQUEST,
            payload: updatedItem,
        })
        axios({
            method: 'PUT',
            url: `http://127.0.0.1:8081/tasks/${pressedItem.id}`,
            data: updatedItem,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            dispatch({
                type: CHECK_ITEM_SUCCESS,
                payload: updatedItem,
            })
        }).catch((err) => {
            dispatch({
                type: CHECK_ITEM_FAILURE,
                payload: err,
            })
            console.log(err)
        })
    }
}

export const GET_TODO_DATA_REQUEST = 'GET_TODO_DATA_REQUEST'
export const GET_TODO_DATA_SUCCESS = 'GET_TODO_DATA_SUCCESS'
export const GET_TODO_DATA_FAILURE = 'GET_TODO_DATA_FAILURE'

export function getTodoData() {
    return dispatch => {
        dispatch({
            type: GET_TODO_DATA_REQUEST
        })
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8081/tasks`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((data) => {
            dispatch({
                type: GET_TODO_DATA_SUCCESS,
                payload: data.data,
            })
        }).catch((err) => {
            dispatch({
                type: GET_TODO_DATA_FAILURE,
                payload: err,
            })
            console.log(err)
        })
    }
}

