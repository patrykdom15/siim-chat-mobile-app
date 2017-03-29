import { AsyncStorage } from 'react-native'

import { API_URL } from './constants'

export default class UserService {
    static async getAllUsers() {
        try {
            let response = await fetch(`${API_URL}/users/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + await AsyncStorage.getItem('token'),
                }
            })

            let responseJson = await response.json()
            return responseJson 
        } catch(err) {
            console.log(err)
        }
    }
}