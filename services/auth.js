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
}