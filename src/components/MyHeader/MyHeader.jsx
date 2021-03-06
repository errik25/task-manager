import React from 'react';
import './MyHeader.css'
import {Link} from "react-router-dom";
import UserImage from '../../images/user';
import {connect} from "react-redux";

function MyHeader(props) {
    return (
        <div className={'MyHeader'}>
            <div className="MyHeader__navigation">
                <Link className={'MyHeader__navigation-link'} to="/home">Home</Link>
                <Link className={'MyHeader__navigation-link'} to="/about">About</Link>
            </div>
            <Link className={'MyHeader__profile'} to="/profile">
                <UserImage className={'MyHeader__profile-icon'} />
                <div className="MyHeader__profile-text">
                    {props.user.name}
                    {props.user.isLogged}

                </div>
            </Link>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
    }
}

const mapStateToProps = store => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyHeader);
