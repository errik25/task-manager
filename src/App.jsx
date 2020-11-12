import React from 'react';
import MyHeader from './components/MyHeader/MyHeader';
import MyContent from './components/MyContent/MyContent';
import MyFooter from './components/MyFooter/MyFooter';
import About from './components/About/About';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login'
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import {connect} from 'react-redux'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Router>
                <div className="App">
                    <MyHeader userLogged={this.userLogged}/>
                    <Switch>
                        <Route path="/home" component={MyContent}/>
                        <Route path='/about' component={About}/>
                        <Route exact path='/login' component={Login}/>
                        <Route path={'/profile'} component={Profile}/>
                        <Route path={'/'} exact>
                            <Redirect to={'/about'}/>
                        </Route>
                    </Switch>
                    <MyFooter/>
                </div>
            </Router>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const mapStateToProps = store => {
    return {
        user: store.user,
        page: store.page
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
