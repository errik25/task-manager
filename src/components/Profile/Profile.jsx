import React, {useEffect} from 'react';
import './Profile.css';
import {connect} from "react-redux";
import {getUserData, logout} from "../../actions/UserActions";
import WithAuth from "../WithAuth";

function Profile(props) {

    useEffect(() => {
        props.getUserData();
    }, [])

    return (
        <div className={'Profile'}>
            <div>
                <div>
                    login - {props.user.login}
                </div>
                <div>
                    firstName - {props.user.firstName}
                </div>
                <div>
                    lastName - {props.user.secondName}
                </div>
            </div>
            {props.user.isLogged &&
            <div className="MyHeader__logout" onClick={ props.logout }>
                log out
            </div>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getUserData: () => dispatch(getUserData()),
        logout: () => dispatch(logout())
    }
}

const mapStateToProps = store => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Profile));
