import React, { useEffect } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import { getUserData, logout } from "../../actions/UserActions";
import WithAuth from "../WithAuth";

function Profile(props) {

  return (
    <div className={"Profile"}>
      <div>
        <div>login - {props.user.login}</div>
        <div>firstName - {props.user.name}</div>
        <div>lastName - {props.user.surname}</div>
        <div>middlename - {props.user.middlename}</div>
        <div>manager - {props.user.manager}</div>
      </div>
      {props.user.isLogged && (
        <div className="Profile__logout" onClick={props.logout}>
          log out
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Profile));
