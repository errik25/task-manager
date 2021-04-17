import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/UserActions';

const initialState = {
  login: 'Аноним',
  isLogged: false,
  error: null,
  isFetching: false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        error: null,
        isLogged: true,
        isFetching: false,
        id: action.payload.data.id,
        login: action.payload.data.login,
        name: action.payload.data.name,
        surname: action.payload.data.surname,
        middlename: action.payload.data.middlename,
        manager: action.payload.data.manager,
        executors: action.payload.data.executors,
      };

    case LOGIN_FAILURE:
      console.log('action.payload', action.payload);
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case LOGOUT_REQUEST:
      return { ...state, isFetching: true };

    case LOGOUT_SUCCESS:
      localStorage.setItem('token', action.payload.data);
      return {
        ...state,
        isLogged: false,
        id: null,
        login: 'Аноним',
        name: null,
        surname: null,
        middlename: null,
        manager: null,
        executors: null,
        isFetching: false,
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLogged: false,
      };

    default:
      return state;
  }
}
