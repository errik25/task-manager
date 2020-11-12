import {
    GET_TODO_DATA_REQUEST,
    GET_TODO_DATA_SUCCESS,
    GET_TODO_DATA_FAILURE,
    CHECK_ITEM_REQUEST,
    CHECK_ITEM_SUCCESS,
    CHECK_ITEM_FAILURE,
    REMOVE_ITEM_REQUEST,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAILURE,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE

} from "../actions/ToDoListActions";

const initialState = {
    list: [],
    maxKey: 1,
    isFetching: false
}

export function todoListReducer(state = initialState, action) {
    let newList;
    switch (action.type) {
        case GET_TODO_DATA_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case GET_TODO_DATA_SUCCESS:
            let maxKey = 0;
            const todoData = action.payload.map((item) => {
                return {...item, key: ++maxKey};
            });
            return {
                ...state,
                list: todoData,
                maxKey: maxKey,
                isFetching: false
            }

        case GET_TODO_DATA_FAILURE:
            return {
                ...state,
                isFetching: false
            }

        case ADD_ITEM_REQUEST:
            return {...state};

        case ADD_ITEM_SUCCESS:
            let list = [...state.list];
            let newItem = {...action.payload.item, key: state.maxKey + 1, id: action.payload.response.data.id};
            list.push(newItem);
            return {...state, list, maxKey: state.maxKey + 1};

        case ADD_ITEM_FAILURE:
            return {...state};

        case REMOVE_ITEM_REQUEST:
            return {...state}

        case REMOVE_ITEM_SUCCESS:
            newList = state.list.filter(item => item.id !== action.payload)
            return {...state, list: newList}

        case REMOVE_ITEM_FAILURE:
            return {...state}

        case CHECK_ITEM_REQUEST:
            return {...state}

        case CHECK_ITEM_SUCCESS:
            let updatedItem = action.payload;
            newList = state.list.map((item) => {
                if (item.key === updatedItem.key) {
                    item = updatedItem
                }
                return item;
            })
            return {...state, list: newList};

        case CHECK_ITEM_FAILURE:
            return {...state};


        default:
            return {...state};
    }
}
