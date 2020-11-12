import React from "react";
import "./Login.css";
import { login } from "../../actions/UserActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Input, Button, Card, CardContent, TextField } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
    };
  }

  handleInputChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value || "";
    this.setState(newState);
  };

  handleOkButton = () => {
    this.props.login({
      login: this.state.userName,
      password: this.state.password,
    });
  };

  handleInputKeys = (event) => {
    if (event.key === "Enter") {
      this.handleOkButton();
    }
  };

  render() {
    return (
      <Card>
        <CardContent className={"Login"}>
          {this.props.user.isLogged && <Redirect to="/profile" />}
          {this.props.isFetching && <div>loading</div>}
          <div className="Login__user-name">
            <TextField
              label="login"
              className={"Login__user-name-input"}
              name={"userName"}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="Login__password">
            <TextField
              label="password"
              className={"Login__password-input"}
              type="password"
              name={"password"}
              onChange={this.handleInputChange}
              onKeyPress={this.handleInputKeys}
            />
          </div>
          <Button
            className="Login__ok-button"
            onClick={this.handleOkButton}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          {this.props.user.error &&
            <Alert severity="error">{this.props.user.error}</Alert>
            // <div className="Login__error-message">error: {this.props.user.error}</div>
          }
        </CardContent>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginData) => dispatch(login(loginData)),
  };
};

const mapStateToProps = (store) => {
  return {
    isFetching: store.isFetching,
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
