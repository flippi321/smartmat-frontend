import axios from "axios";
let url = 'http://localhost:8080'


export default {
    login(email, password) {
        const options = {
            method: 'POST',
            url: `${url}/api/v1/auth/authenticate`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: email,
                password: password
            }
        };
        return axios.request(options);
    }
}