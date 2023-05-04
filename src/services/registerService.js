import axios from "axios";
let url = 'http://localhost:8080'

export default {
    registerUser(user) {
        const options = {
            method: 'POST',
            url: `${url}/api/v1/auth/register`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
                password: user.password
            }
        };
        return axios.request(options);
    }
}