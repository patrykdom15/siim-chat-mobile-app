import {
    AsyncStorage
} from 'react-native'

import { API_URL } from './constants'


export default class AuthService {
    static async authenticate(userData) {
        try {
            let response = await fetch(`${API_URL}/api-token-auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userData.username,
                    password: userData.password,
                })
            })
            let responseJson = await response.json()
            return responseJson.token   
        } catch(err) {
            console.log(err)
        }
    }

    static async verifyUser() {
        try {
            let token = await AsyncStorage.getItem('token')

            if (!token) {
                return false
            }

            let response = await fetch(`${API_URL}/api-token-verify/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                })
            })
            
            let responseJson = await response.json()
            
            await AsyncStorage.setItem('token', responseJson.token)

            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async logout() {
        try {
            await AsyncStorage.removeItem('token')
        } catch(err) {
            console.log(err)
        }
    }
}