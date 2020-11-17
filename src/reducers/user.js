import axios from "axios";
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../actions/UserActions";

const initialState = {
  login: "Аноним",
  isLogged: false,
  error: null,
  isFetching: false
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data);
      return {
        ...state,
        error: null,
        isLogged: true,
        isFetching: false
      };

    case LOGIN_FAILURE:
      console.log('action.payload', action.payload);
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case LOGOUT_REQUEST:
      return { ...state, isFetching: true };

    case LOGOUT_SUCCESS:
      localStorage.setItem("token", action.payload.data);
      return {
        ...state,
        isLogged: false,
        login: "",
        firstName: "",
        secondName: "",
        isFetching: false
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false
      };

    case GET_USER_DATA_REQUEST:
      return { ...state, isFetching: true };

    case GET_USER_DATA_SUCCESS:
      if (action.payload.data) {
        return {
          ...state,
          id: action.payload.data.id,
          login: action.payload.data.login,
          name: action.payload.data.firstName,
          surname: action.payload.data.secondName,
          middlename: action.payload.data.middlename,
          manager: action.payload.data.manager,
          isLogged: true
        };
      }
      return {
        ...state,
      };

    case GET_USER_DATA_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
}
