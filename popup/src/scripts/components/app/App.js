import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchUser } from '../../actions';
import { Store } from 'react-chrome-redux';
import axios from 'axios';

const proxyStore = new Store({
  portName: 'errordock'
});
const LOGIN_ENPOINT = "http://localhost:5000/auth/google";
const LOGOUT_ENDPOINT = "http://localhost:5000/api/logout";
const CURRENT_USER = "http://localhost:5000/api/current_user";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get(CURRENT_USER)
        .then(res => this.props.fetchUser(res.data));
    
  }

  handleOnClick(message) {

    switch(message){
      case 'login': window.open(LOGIN_ENPOINT);
      case 'logout': window.open(LOGOUT_ENDPOINT);
      case 'current_user': window.open(CURRENT_USER);
    }
    
  }

  renderLoginButton() {
    return(   
              <div>
                <button 
                  onClick={this.handleOnClick.bind(this, 'login')}
                >
                  Login
                </button>
                <button 
                  onClick={this.handleOnClick.bind(this, 'current_user')}
                >
                  current_user
                </button>
              </div>
            )
            }

  renderHomePage() {
  return (
            <div>
              <h1>Welcome!!!! Login Success</h1>
              {this.props.auth.googleId}
              <button 
                onClick={this.handleOnClick.bind(this, 'logout')}
              >
                logout
              </button>
            </div>
         );
  }

  render() {
  
    return (
      <div>
        { this.props.auth ? this.renderHomePage() : this.renderLoginButton()  }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { fetchUser })(App);
