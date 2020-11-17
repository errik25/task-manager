import axios from "axios";

export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILURE = "GET_USER_DATA_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export function getUserData() {
  return (dispatch) => {
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });
    axios({
      method: "GET",
      url: `http://127.0.0.1:8081/profile`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: response,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_DATA_FAILURE,
          payload: err,
        });
        console.log(err);
      });
  };
}

export function login(loginData) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    axios({
      method: "POST",
      url: `http://127.0.0.1:8081/login`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      data: loginData,
    })
      .then((response) => {
        if (response.data.error) {
          dispatch({
            type: LOGIN_FAILURE,
            payload: response.data.message,
          });
        } else {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response,
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: LOGIN_FAILURE,
          payload: err,
        })
      );
  };
}

export function register(userData) {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    axios({
      method: "POST",
      url: `http://127.0.0.1:8081/register`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      data: userData,
    })
      .then((response) => {
        if (response.data.error) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data.message,
          });
        } else {
          dispatch({
            type: REGISTER_FAILURE,
            payload: response,
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: REG,
          payload: err,
        })
      );
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    axios({
      method: "POST",
      url: `http://127.0.0.1:8081/logout`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: response,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: err,
        });
        console.log(err);
      });
  };
}
