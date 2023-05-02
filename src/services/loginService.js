import axios from "axios";
let url = 'http://localhost:8080'
/*
Mocking responses, must be removed:
*/
import users from "@/mockDatabases/users.json";


//const apiClient = axios.create();
//const mock = new MockAdapter(apiClient);


/**
export default class LoginService {
    static async login(email, password) {
        try {
            console.log("LoginService: email =", email);
            console.log("LoginService: password =", password);
            console.log("LoginService: users =", users);

            const user = Object.values(users.users).find((user) => user.email === email && user.password === password);
            console.log("LoginService: user =", user);
            if (!user) {
                throw new Error("Invalid email or password");
            }
            const jwtToken = "thisisanexampletokenhaha";
            return {
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                jwtToken: jwtToken,
                status: 200
            };
        } catch (error) {
            return (`Failed to login: ${error.message}`);
        }
    }
}
*/

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