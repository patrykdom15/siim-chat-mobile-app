/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  BackAndroid,
  AppRegistry,
  StyleSheet,
  Navigator,
  View
} from 'react-native';

import AuthService from './services/auth'

import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView'
import ChatView from './components/ChatView'

export default class siimChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }
  
  async componentDidMount() {
    try {
      let isLoggedIn =  await AuthService.verifyUser()
      this.setState({
        isLoggedIn: isLoggedIn,
      })
    } catch(err) {
      console.log(err)
    }

    BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
            this.navigator.pop();
            return true;
        }
        return false;
    });
  }

  render() {
    return (
      <Navigator
          ref={(nav) => { this.navigator = nav }}
          style={styles.container}
          initialRoute={{ name: 'Login', index: 0 }}
          renderScene={(route, navigator) => {
              switch (route.name) {
                  case 'Login':
                      return (
                          <LoginView 
                            login={() => { navigator.push({name: 'List'}) }}
                          />
                      )
                      break;
                  case 'List':
                      return <DashboardView {...this.props} navigator={navigator} />
                      break;
                  case 'Chat':
                      return <ChatView {...this.props} navigator id={route.id} />   
                  default:
                      break;
              }
          }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});

AppRegistry.registerComponent('siimChat', () => siimChat);
