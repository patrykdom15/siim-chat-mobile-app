/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
    Alert,
    AsyncStorage,
    StyleSheet,
    Text,
    View
} from 'react-native'

import TextField from 'react-native-md-textinput'
import Button from 'react-native-button'

import AuthService from '../../services/auth'

export default class LoginView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    async logInAction() {
        try{
            let token = await AuthService.authenticate({
                username: this.state.username,
                password: this.state.password
            })

            if (token) {
                try {
                    await AsyncStorage.setItem('token', token)
                } catch (error) {
                    Alert.alert('Error with authentication!')
                }
            } else {
                Alert.alert('Wrong credentials!')
            }
        }
        catch(err){
             console.log(err)
             Alert.alert('Error!')
        }
    }

    async getToken() {
        try {
            let token = await AsyncStorage.getItem('token')
            return token
        } catch (err) {
            return false
            console.log(err)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextField 
                        label={'Username'} 
                        highlightColor={'#BD632F'}
                        value={this.state.username}
                        onChangeText={
                            (text) => { 
                                this.setState({username: text})
                            }
                        }
                        dense
                    />
                    <TextField
                        label={'Password'}
                        value={this.state.password}
                        highlightColor={'#BD632F'}
                        onChangeText={
                            (text) => { 
                                this.setState({password: text})
                            }
                        }
                        dense
                        secureTextEntry
                    />
                </View>
                <Button
                    containerStyle={styles.buttonContainer}
                    style={styles.label}
                    onPress={() => { this.logInAction() }}
                >
                    Login
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    buttonContainer: {
        padding: 12,
        overflow:'hidden',
        borderRadius:4,
        backgroundColor: '#BD632F',
        minWidth: 120,
    },
    label: {
        color: 'white',
        fontSize: 18,
        fontWeight: '300',
        fontFamily: 'sans-serif',
    },
    inputContainer: {
        width: '75%',
        marginBottom: 40,
    }
});
